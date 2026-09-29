<?php
/**
 * RESTFUL API ROUTER: CU-GAY-GUIDE BACKEND
 * Cung cấp API trực tiếp tương tác với MySQL Database cugay_guide
 */

require_once __DIR__ . '/db.php';

$action = $_GET['action'] ?? 'status';
$method = $_SERVER['REQUEST_METHOD'];

try {
    $db = getDbConnection();

    switch ($action) {
        // 1. Kiểm tra trạng thái Database
        case 'status':
            $tables = ['users', 'articles', 'birds', 'bird_timelines', 'user_criteria', 'comments', 'reactions', 'follows', 'bookmarks', 'reports'];
            $counts = [];
            foreach ($tables as $t) {
                try {
                    $stmt = $db->query("SELECT COUNT(*) AS total FROM `{$t}`");
                    $counts[$t] = (int)$stmt->fetch()['total'];
                } catch (Exception $e) {
                    $counts[$t] = 'chưa tạo';
                }
            }
            jsonResponse([
                'success' => true,
                'message' => 'Hệ thống CSDL cugay_guide hoạt động bình thường',
                'database' => DB_NAME,
                'table_counts' => $counts,
                'timestamp' => date('c')
            ]);
            break;

        // 2. Lấy danh sách người dùng hoặc hồ sơ chi tiết theo username
        case 'users':
            if (!empty($_GET['username'])) {
                $username = trim($_GET['username']);
                $stmt = $db->prepare("SELECT id, username, display_name, avatar, bio, quote, experience_years, location, role, status, created_at FROM users WHERE username = ?");
                $stmt->execute([$username]);
                $user = $stmt->fetch();
                if (!$user) {
                    jsonResponse(['success' => false, 'message' => 'Không tìm thấy người dùng'], 404);
                }
                // Lấy bộ tiêu chí riêng của user (Mục 20.5)
                $critStmt = $db->prepare("SELECT criterion_name, importance_level, sort_order, notes FROM user_criteria WHERE user_id = ? ORDER BY sort_order ASC");
                $critStmt->execute([$user['id']]);
                $user['criteria'] = $critStmt->fetchAll();

                // Lấy danh sách chim của user
                $birdStmt = $db->prepare("SELECT * FROM birds WHERE owner_id = ? AND status = 'active'");
                $birdStmt->execute([$user['id']]);
                $user['birds'] = $birdStmt->fetchAll();

                // Lấy số lượng bài viết & followers
                $artCountStmt = $db->prepare("SELECT COUNT(*) AS total FROM articles WHERE author_id = ? AND status = 'published'");
                $artCountStmt->execute([$user['id']]);
                $user['article_count'] = (int)$artCountStmt->fetch()['total'];

                $folCountStmt = $db->prepare("SELECT COUNT(*) AS total FROM follows WHERE following_id = ?");
                $folCountStmt->execute([$user['id']]);
                $user['followers_count'] = (int)$folCountStmt->fetch()['total'];

                jsonResponse(['success' => true, 'user' => $user]);
            } else {
                $stmt = $db->query("SELECT id, username, display_name, avatar, quote, experience_years, location, role, created_at FROM users WHERE status = 'active' ORDER BY experience_years DESC");
                jsonResponse(['success' => true, 'users' => $stmt->fetchAll()]);
            }
            break;

        // 3. Lấy danh sách bài viết (Hỗ trợ lọc theo category, author, status, is_author_perspective)
        case 'articles':
            $where = ["a.status = 'published'"];
            $params = [];

            if (isset($_GET['all']) && $_GET['all'] === 'true') {
                $where = ["1=1"]; // Quản trị viên xem tất cả kể cả pending
            }
            if (!empty($_GET['category'])) {
                $where[] = "a.category = ?";
                $params[] = $_GET['category'];
            }
            if (!empty($_GET['author_id'])) {
                $where[] = "a.author_id = ?";
                $params[] = $_GET['author_id'];
            }
            if (isset($_GET['is_author_perspective'])) {
                $where[] = "a.is_author_perspective = ?";
                $params[] = (int)$_GET['is_author_perspective'];
            }

            $sql = "SELECT a.*, u.display_name AS author_name, u.username AS author_username, u.avatar AS author_avatar, b.name AS bird_name 
                    FROM articles a
                    JOIN users u ON a.author_id = u.id
                    LEFT JOIN birds b ON a.bird_id = b.id
                    WHERE " . implode(' AND ', $where) . "
                    ORDER BY a.created_at DESC";
            $stmt = $db->prepare($sql);
            $stmt->execute($params);
            jsonResponse(['success' => true, 'articles' => $stmt->fetchAll()]);
            break;

        // 4. Lấy chi tiết một bài viết theo Slug
        case 'article':
            $slug = trim($_GET['slug'] ?? '');
            $stmt = $db->prepare("SELECT a.*, u.display_name AS author_name, u.username AS author_username, u.avatar AS author_avatar, u.quote AS author_quote, b.name AS bird_name 
                                  FROM articles a
                                  JOIN users u ON a.author_id = u.id
                                  LEFT JOIN birds b ON a.bird_id = b.id
                                  WHERE a.slug = ?");
            $stmt->execute([$slug]);
            $article = $stmt->fetch();
            if (!$article) {
                jsonResponse(['success' => false, 'message' => 'Không tìm thấy bài viết'], 404);
            }
            // Tăng view
            $db->prepare("UPDATE articles SET views_count = views_count + 1 WHERE id = ?")->execute([$article['id']]);

            jsonResponse(['success' => true, 'article' => $article]);
            break;

        // 5. Lấy danh sách chim và timeline chi tiết
        case 'birds':
            $stmt = $db->query("SELECT b.*, u.display_name AS owner_name, u.username AS owner_username, u.avatar AS owner_avatar 
                                FROM birds b 
                                JOIN users u ON b.owner_id = u.id 
                                WHERE b.status = 'active' 
                                ORDER BY b.created_at DESC");
            $birds = $stmt->fetchAll();
            jsonResponse(['success' => true, 'birds' => $birds]);
            break;

        case 'bird':
            $id = trim($_GET['id'] ?? '');
            $stmt = $db->prepare("SELECT b.*, u.display_name AS owner_name, u.username AS owner_username, u.avatar AS owner_avatar 
                                  FROM birds b 
                                  JOIN users u ON b.owner_id = u.id 
                                  WHERE b.id = ?");
            $stmt->execute([$id]);
            $bird = $stmt->fetch();
            if (!$bird) {
                jsonResponse(['success' => false, 'message' => 'Không tìm thấy hồ sơ con chim'], 404);
            }

            // Lấy dòng thời gian tiến hóa (Mục 20.4)
            $timeStmt = $db->prepare("SELECT * FROM bird_timelines WHERE bird_id = ? ORDER BY id ASC");
            $timeStmt->execute([$id]);
            $bird['timeline'] = $timeStmt->fetchAll();

            jsonResponse(['success' => true, 'bird' => $bird]);
            break;

        // 6. Lấy bình luận của một bài viết
        case 'comments':
            $articleId = trim($_GET['article_id'] ?? '');
            $stmt = $db->prepare("SELECT c.*, u.display_name AS author_name, u.username AS author_username, u.avatar AS author_avatar 
                                  FROM comments c 
                                  JOIN users u ON c.user_id = u.id 
                                  WHERE c.article_id = ? AND c.status = 'approved' 
                                  ORDER BY c.created_at ASC");
            $stmt->execute([$articleId]);
            $comments = $stmt->fetchAll();
            jsonResponse(['success' => true, 'comments' => $comments]);
            break;

        // 7. Thêm bình luận mới (POST)
        case 'add_comment':
            if ($method !== 'POST') jsonResponse(['success' => false, 'message' => 'Method not allowed'], 405);
            $data = getJsonInput();
            $stmt = $db->prepare("INSERT INTO comments (id, article_id, user_id, parent_id, content, status, created_at) VALUES (?, ?, ?, ?, ?, 'approved', NOW())");
            $newId = 'cmt_' . time() . '_' . rand(100, 999);
            $stmt->execute([
                $newId,
                $data['article_id'],
                $data['user_id'],
                $data['parent_id'] ?: null,
                $data['content']
            ]);
            jsonResponse(['success' => true, 'comment_id' => $newId, 'message' => 'Đã gửi trao đổi thành công']);
            break;

        // 8. Tương tác Cảm xúc Reaction (Mục 20.8)
        case 'toggle_reaction':
            if ($method !== 'POST') jsonResponse(['success' => false, 'message' => 'Method not allowed'], 405);
            $data = getJsonInput();
            $userId = $data['user_id'];
            $targetType = $data['target_type'];
            $targetId = $data['target_id'];
            $reactType = $data['reaction_type']; // thich, huu_ich, dong_dieu

            $check = $db->prepare("SELECT id FROM reactions WHERE user_id = ? AND target_type = ? AND target_id = ? AND reaction_type = ?");
            $check->execute([$userId, $targetType, $targetId, $reactType]);
            if ($row = $check->fetch()) {
                // Xóa reaction (Toggle off)
                $db->prepare("DELETE FROM reactions WHERE id = ?")->execute([$row['id']]);
                jsonResponse(['success' => true, 'action' => 'removed']);
            } else {
                // Thêm reaction (Toggle on)
                $db->prepare("INSERT INTO reactions (user_id, target_type, target_id, reaction_type, created_at) VALUES (?, ?, ?, ?, NOW())")
                   ->execute([$userId, $targetType, $targetId, $reactType]);
                jsonResponse(['success' => true, 'action' => 'added']);
            }
            break;

        // 9. Quản trị duyệt bài (Mục 20.11)
        case 'moderate_article':
            if ($method !== 'POST') jsonResponse(['success' => false, 'message' => 'Method not allowed'], 405);
            $data = getJsonInput();
            $stmt = $db->prepare("UPDATE articles SET status = ? WHERE id = ?");
            $stmt->execute([$data['status'], $data['article_id']]);
            jsonResponse(['success' => true, 'message' => 'Cập nhật trạng thái duyệt bài thành công']);
            break;

        default:
            jsonResponse(['success' => false, 'message' => 'Yêu cầu API không hợp lệ: ' . htmlspecialchars($action)], 400);
            break;
    }
} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
