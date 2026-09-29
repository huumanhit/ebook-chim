-- ==============================================================================
-- DATABASE SCHEMA: SỔ TAY CHỌN CHIM CU GÁY & THƯ VIỆN QUAN ĐIỂM CỘNG ĐỒNG
-- Chuẩn thiết kế: MySQL 8.0+ / MariaDB 10.4+ (XAMPP compatible)
-- Bảng mã: utf8mb4 / utf8mb4_unicode_ci (Hỗ trợ tiếng Việt đầy đủ dấu và ký tự)
-- Mục tiêu: Đáp ứng hoàn chỉnh Mục 20.13 & 20.14 (Blog -> Knowledge Base -> Community -> Digital Book)
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS `cugay_guide` 
  CHARACTER SET utf8mb4 
  COLLATE utf8mb4_unicode_ci;

USE `cugay_guide`;

-- Tắt kiểm tra khóa ngoại tạm thời để khởi tạo/reset an toàn
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `reports`;
DROP TABLE IF EXISTS `reactions`;
DROP TABLE IF EXISTS `bookmarks`;
DROP TABLE IF EXISTS `follows`;
DROP TABLE IF EXISTS `comments`;
DROP TABLE IF EXISTS `bird_timelines`;
DROP TABLE IF EXISTS `user_criteria`;
DROP TABLE IF EXISTS `articles`;
DROP TABLE IF EXISTS `birds`;
DROP TABLE IF EXISTS `users`;

SET FOREIGN_KEY_CHECKS = 1;

-- ==============================================================================
-- 1. USERS (Hồ sơ nghệ nhân & thành viên cộng đồng)
-- Mục 20.1, 20.2 & 20.13
-- ==============================================================================
CREATE TABLE `users` (
  `id` VARCHAR(50) NOT NULL COMMENT 'Mã định danh duy nhất (UUID hoặc slug)',
  `username` VARCHAR(50) NOT NULL COMMENT 'Tên đăng nhập / Handle (@username)',
  `password_hash` VARCHAR(255) NOT NULL COMMENT 'Mật khẩu đã băm (Bcrypt / Argon2)',
  `display_name` VARCHAR(100) NOT NULL COMMENT 'Tên hiển thị người chơi chim',
  `avatar` VARCHAR(255) DEFAULT NULL COMMENT 'Đường dẫn ảnh đại diện',
  `bio` TEXT DEFAULT NULL COMMENT 'Giới thiệu ngắn về bản thân và góc nhìn',
  `quote` VARCHAR(255) DEFAULT 'Tôi không tìm con chim đẹp nhất. Tôi tìm con chim hợp cách chơi của mình.' COMMENT 'Châm ngôn chơi chim cá nhân',
  `experience_years` INT UNSIGNED DEFAULT 0 COMMENT 'Số năm kinh nghiệm chơi chim cu gáy',
  `location` VARCHAR(100) DEFAULT NULL COMMENT 'Khu vực / Tỉnh thành chơi chim',
  `role` ENUM('admin', 'moderator', 'member') NOT NULL DEFAULT 'member' COMMENT 'Vai trò hệ thống: Quản trị, Kiểm duyệt, Thành viên',
  `status` ENUM('active', 'suspended', 'pending') NOT NULL DEFAULT 'active' COMMENT 'Trạng thái tài khoản',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Thời điểm đăng ký',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Thời điểm cập nhật hồ sơ',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_users_username` (`username`),
  KEY `idx_users_role` (`role`),
  KEY `idx_users_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Hồ sơ người chơi chim cu gáy';

-- ==============================================================================
-- 2. USER_CRITERIA (Bộ tiêu chí chọn chim riêng của từng nghệ nhân)
-- Mục 20.5: Tiêu chí cá nhân ("Người này nhìn chim theo cách nào?")
-- ==============================================================================
CREATE TABLE `user_criteria` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT NOT NULL,
  `user_id` VARCHAR(50) NOT NULL COMMENT 'Mã nghệ nhân',
  `criterion_name` VARCHAR(50) NOT NULL COMMENT 'Tên tiêu chí (Giọng, Tiền, Hậu, Thần thái, Bộ mã, Chân, Độ bền...)',
  `importance_level` ENUM('rat_cao', 'cao', 'trung_binh', 'thap') NOT NULL DEFAULT 'cao' COMMENT 'Mức độ quan tâm cá nhân',
  `sort_order` INT UNSIGNED DEFAULT 1 COMMENT 'Thứ tự ưu tiên hiển thị',
  `notes` VARCHAR(255) DEFAULT NULL COMMENT 'Ghi chú thêm về tiêu chí',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_user_criterion` (`user_id`, `criterion_name`),
  CONSTRAINT `fk_user_criteria_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bảng tiêu chí ưu tiên khi chọn chim của người chơi';

-- ==============================================================================
-- 3. BIRDS (Hồ sơ từng con chim cu gáy)
-- Mục 20.4 & 20.13: Quá trình theo dõi và thực chiến của chim
-- ==============================================================================
CREATE TABLE `birds` (
  `id` VARCHAR(50) NOT NULL COMMENT 'Mã định danh con chim (vd: dong-dream, tho-sam-01)',
  `owner_id` VARCHAR(50) NOT NULL COMMENT 'Chủ sở hữu con chim',
  `name` VARCHAR(100) NOT NULL COMMENT 'Tên chim (Đồng Dream, Thổ Sấm 01...)',
  `image` VARCHAR(255) DEFAULT NULL COMMENT 'Ảnh thực tế con chim',
  `voice` VARCHAR(50) NOT NULL DEFAULT 'Thổ' COMMENT 'Chất giọng: Thổ, Kim, Đồng, Son, Sấm...',
  `type` VARCHAR(50) NOT NULL DEFAULT 'Chim Mồi' COMMENT 'Loại chim: Chim Mồi, Mồi Đất, Mồi Cây, Bổi Lỡ, Giàn...',
  `age_years` VARCHAR(50) DEFAULT '3 năm lồng' COMMENT 'Độ tuổi / Số năm lồng',
  `origin` VARCHAR(100) DEFAULT NULL COMMENT 'Nguồn gốc / Xuất xứ (Đắk Lắk, Bình Phước, Tây Ninh...)',
  `notes` TEXT DEFAULT NULL COMMENT 'Ghi chú đặc điểm hình thái và nết chơi',
  `initial_assessment` TEXT NOT NULL COMMENT 'Đánh giá ban đầu khi mới nhận chim',
  `field_experience` TEXT NOT NULL COMMENT 'Kinh nghiệm thực chiến qua các trận rừng/đất',
  `current_assessment` TEXT NOT NULL COMMENT 'Đánh giá và nhìn nhận hiện tại',
  `status` ENUM('active', 'sold', 'archived') NOT NULL DEFAULT 'active' COMMENT 'Trạng thái chim',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_birds_owner` (`owner_id`),
  KEY `idx_birds_voice` (`voice`),
  KEY `idx_birds_status` (`status`),
  CONSTRAINT `fk_birds_owner` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Hồ sơ thực chiến từng con chim';

-- ==============================================================================
-- 4. BIRD_TIMELINES (Dòng thời gian tiến hóa của chim)
-- Mục 20.4: Ngày bắt đầu → Đánh giá ban đầu → Thực chiến → Cập nhật → Đánh giá hiện tại
-- ==============================================================================
CREATE TABLE `bird_timelines` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT NOT NULL,
  `bird_id` VARCHAR(50) NOT NULL COMMENT 'Mã con chim',
  `phase` ENUM('start', 'initial', 'field', 'update', 'current') NOT NULL DEFAULT 'field' COMMENT 'Giai đoạn tiến hóa',
  `title` VARCHAR(150) NOT NULL COMMENT 'Tiêu đề cột mốc (vd: Ra cội lần đầu, Trận rừng Bình Phước)',
  `content` TEXT NOT NULL COMMENT 'Chi tiết quan sát thực tế và nết chơi bộc lộ',
  `event_date` VARCHAR(50) DEFAULT NULL COMMENT 'Thời gian ghi nhận (vd: Tháng 03/2024, 05/2023)',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_timelines_bird` (`bird_id`),
  KEY `idx_timelines_phase` (`phase`),
  CONSTRAINT `fk_timelines_bird` FOREIGN KEY (`bird_id`) REFERENCES `birds` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Nhật ký tiến hóa theo thời gian của chim';

-- ==============================================================================
-- 5. ARTICLES (Bài viết chia sẻ quan điểm & kinh nghiệm)
-- Mục 20.3, 20.10 & 20.13
-- ==============================================================================
CREATE TABLE `articles` (
  `id` VARCHAR(50) NOT NULL COMMENT 'Mã định danh bài viết',
  `author_id` VARCHAR(50) NOT NULL COMMENT 'Tác giả bài viết',
  `title` VARCHAR(255) NOT NULL COMMENT 'Tiêu đề bài viết',
  `slug` VARCHAR(255) NOT NULL COMMENT 'Đường dẫn tĩnh thân thiện SEO',
  `excerpt` TEXT NOT NULL COMMENT 'Tóm tắt / Lời dẫn ngắn',
  `content` LONGTEXT NOT NULL COMMENT 'Nội dung chi tiết bài viết (Hỗ trợ Markdown/HTML)',
  `core_quote` VARCHAR(255) DEFAULT NULL COMMENT 'Câu nói đúc kết quan điểm trong bài',
  `cover_image` VARCHAR(255) DEFAULT NULL COMMENT 'Ảnh bìa bài viết',
  `category` VARCHAR(50) NOT NULL DEFAULT 'quan-diem' COMMENT 'Chuyên mục: quan-diem, thuc-chien, tien-va-hau, kinh-nghiem, sai-lam',
  `tags` VARCHAR(255) DEFAULT NULL COMMENT 'Danh sách từ khóa phân cách dấu phẩy',
  `bird_id` VARCHAR(50) DEFAULT NULL COMMENT 'Con chim liên quan (nếu bài viết phân tích chim cụ thể)',
  `is_author_perspective` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '1: Góc nhìn Tác giả sáng lập | 0: Góc nhìn Cộng đồng',
  `status` ENUM('draft', 'pending', 'published', 'rejected', 'archived') NOT NULL DEFAULT 'pending' COMMENT 'Trạng thái kiểm duyệt: pending cần duyệt, published đã công khai',
  `views_count` INT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Số lượt đọc bài',
  `published_at` DATETIME DEFAULT NULL COMMENT 'Thời điểm xuất bản',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_articles_slug` (`slug`),
  KEY `idx_articles_author` (`author_id`),
  KEY `idx_articles_status` (`status`),
  KEY `idx_articles_category` (`category`),
  KEY `idx_articles_bird` (`bird_id`),
  KEY `idx_articles_is_author` (`is_author_perspective`),
  FULLTEXT KEY `idx_articles_fulltext` (`title`, `excerpt`, `content`),
  CONSTRAINT `fk_articles_author` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_articles_bird` FOREIGN KEY (`bird_id`) REFERENCES `birds` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bài viết chia sẻ quan điểm và kinh nghiệm thực chiến';

-- ==============================================================================
-- 6. COMMENTS (Bình luận & thảo luận đa cấp)
-- Mục 20.7 & 20.13: Ưu tiên trao đổi kinh nghiệm, không tranh cãi hơn thua
-- ==============================================================================
CREATE TABLE `comments` (
  `id` VARCHAR(50) NOT NULL COMMENT 'Mã bình luận',
  `article_id` VARCHAR(50) NOT NULL COMMENT 'Bài viết được bình luận',
  `user_id` VARCHAR(50) NOT NULL COMMENT 'Người bình luận',
  `parent_id` VARCHAR(50) DEFAULT NULL COMMENT 'Mã bình luận cha (hỗ trợ câu trả lời lồng nhau)',
  `content` TEXT NOT NULL COMMENT 'Nội dung trao đổi kinh nghiệm',
  `status` ENUM('approved', 'flagged', 'hidden') NOT NULL DEFAULT 'approved' COMMENT 'Trạng thái kiểm duyệt nội dung',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_comments_article` (`article_id`),
  KEY `idx_comments_user` (`user_id`),
  KEY `idx_comments_parent` (`parent_id`),
  KEY `idx_comments_status` (`status`),
  CONSTRAINT `fk_comments_article` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_comments_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_comments_parent` FOREIGN KEY (`parent_id`) REFERENCES `comments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Trao đổi thảo luận kinh nghiệm dưới bài viết';

-- ==============================================================================
-- 7. REACTIONS (Phản hồi cảm xúc tinh gọn)
-- Mục 20.8: Thích (thich), Hữu ích (huu_ich), Có kinh nghiệm tương tự (dong_dieu)
-- Tuyệt đối không có hệ thống tính điểm xếp hạng người chơi
-- ==============================================================================
CREATE TABLE `reactions` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT NOT NULL,
  `user_id` VARCHAR(50) NOT NULL COMMENT 'Người thả cảm xúc',
  `target_type` ENUM('article', 'comment', 'bird') NOT NULL COMMENT 'Đối tượng phản hồi',
  `target_id` VARCHAR(50) NOT NULL COMMENT 'Mã bài viết, bình luận hoặc con chim',
  `reaction_type` ENUM('thich', 'huu_ich', 'dong_dieu') NOT NULL COMMENT 'Loại phản hồi',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_unique_user_reaction` (`user_id`, `target_type`, `target_id`, `reaction_type`),
  KEY `idx_reactions_target` (`target_type`, `target_id`),
  CONSTRAINT `fk_reactions_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Phản hồi đồng điệu và hữu ích';

-- ==============================================================================
-- 8. FOLLOWS (Theo dõi nghệ nhân có cùng gu chơi chim)
-- Mục 20.6 & 20.13
-- ==============================================================================
CREATE TABLE `follows` (
  `follower_id` VARCHAR(50) NOT NULL COMMENT 'Người nhấn theo dõi',
  `following_id` VARCHAR(50) NOT NULL COMMENT 'Nghệ nhân được theo dõi',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`follower_id`, `following_id`),
  KEY `idx_follows_following` (`following_id`),
  CONSTRAINT `fk_follows_follower` FOREIGN KEY (`follower_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_follows_following` FOREIGN KEY (`following_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Mối quan hệ theo dõi giữa những người chơi';

-- ==============================================================================
-- 9. BOOKMARKS (Lưu bài viết & lưu hồ sơ con chim yêu thích)
-- Mục 20.6 & 20.13
-- ==============================================================================
CREATE TABLE `bookmarks` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT NOT NULL,
  `user_id` VARCHAR(50) NOT NULL COMMENT 'Người lưu',
  `target_type` ENUM('article', 'bird') NOT NULL DEFAULT 'article' COMMENT 'Loại đối tượng lưu',
  `target_id` VARCHAR(50) NOT NULL COMMENT 'Mã bài viết hoặc mã con chim',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_user_bookmark` (`user_id`, `target_type`, `target_id`),
  KEY `idx_bookmarks_target` (`target_type`, `target_id`),
  CONSTRAINT `fk_bookmarks_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Dấu trang bài viết và con chim đã lưu';

-- ==============================================================================
-- 10. REPORTS (Kiểm duyệt & Báo cáo nội dung vi phạm nguyên tắc)
-- Mục 20.11 & 20.13
-- ==============================================================================
CREATE TABLE `reports` (
  `id` VARCHAR(50) NOT NULL COMMENT 'Mã báo cáo',
  `reporter_id` VARCHAR(50) NOT NULL COMMENT 'Người gửi báo cáo',
  `target_type` ENUM('article', 'comment', 'user', 'bird') NOT NULL COMMENT 'Loại đối tượng bị báo cáo',
  `target_id` VARCHAR(50) NOT NULL COMMENT 'Mã đối tượng vi phạm',
  `reason` VARCHAR(150) NOT NULL COMMENT 'Lý do báo cáo: Sai lệch tuyệt đối, Ngôn từ kích bác, Spam bán chim...',
  `details` TEXT DEFAULT NULL COMMENT 'Ghi chú mô tả thêm từ người báo cáo',
  `status` ENUM('pending', 'resolved', 'dismissed') NOT NULL DEFAULT 'pending' COMMENT 'Trạng thái xử lý của Admin',
  `resolution_note` VARCHAR(255) DEFAULT NULL COMMENT 'Ghi chú giải quyết của Quản trị viên',
  `resolved_by` VARCHAR(50) DEFAULT NULL COMMENT 'Admin đã duyệt xử lý',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_reports_status` (`status`),
  KEY `idx_reports_target` (`target_type`, `target_id`),
  KEY `idx_reports_reporter` (`reporter_id`),
  CONSTRAINT `fk_reports_reporter` FOREIGN KEY (`reporter_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_reports_resolver` FOREIGN KEY (`resolved_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Báo cáo vi phạm và quản trị kiểm duyệt';
