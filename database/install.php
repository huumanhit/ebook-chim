<?php
/**
 * TRÌNH KHỞI TẠO CƠ SỞ DỮ LIỆU TỰ ĐỘNG (DATABASE INSTALLER)
 * Sổ Tay Chọn Chim Cu Gáy & Thư Viện Quan Điểm Cộng Đồng
 * Hỗ trợ chạy trên trình duyệt (XAMPP Web UI) hoặc Command Line (CLI)
 */

$isCli = (php_sapi_name() === 'cli');

$dbHost = $_POST['db_host'] ?? '127.0.0.1';
$dbPort = $_POST['db_port'] ?? '3306';
$dbUser = $_POST['db_user'] ?? 'root';
$dbPass = $_POST['db_pass'] ?? '';
$dbName = 'cugay_guide';

$message = '';
$status = '';
$details = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST' || $isCli) {
    if ($isCli) {
        $options = getopt('', ['host::', 'port::', 'user::', 'pass::']);
        $dbHost = $options['host'] ?? $dbHost;
        $dbPort = $options['port'] ?? $dbPort;
        $dbUser = $options['user'] ?? $dbUser;
        $dbPass = $options['pass'] ?? $dbPass;
    }

    try {
        // 1. Kết nối MySQL server
        $dsn = "mysql:host={$dbHost};port={$dbPort};charset=utf8mb4";
        $pdo = new PDO($dsn, $dbUser, $dbPass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);
        $details[] = "Đã kết nối thành công tới MySQL Server ({$dbHost}:{$dbPort})";

        // 2. Tạo Database
        $pdo->exec("CREATE DATABASE IF NOT EXISTS `{$dbName}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;");
        $pdo->exec("USE `{$dbName}`;");
        $details[] = "Đã chọn cơ sở dữ liệu `{$dbName}`";

        // 3. Đọc và thực thi schema.sql
        $schemaFile = __DIR__ . '/schema.sql';
        if (!file_exists($schemaFile)) {
            throw new Exception("Không tìm thấy tệp schema.sql tại: {$schemaFile}");
        }
        $schemaSql = file_get_contents($schemaFile);
        $pdo->exec($schemaSql);
        $details[] = "Đã khởi tạo thành công 10 bảng trong schema.sql (users, articles, birds, comments, timelines...)";

        // 4. Đọc và thực thi seed.sql
        $seedFile = __DIR__ . '/seed.sql';
        if (file_exists($seedFile)) {
            $seedSql = file_get_contents($seedFile);
            $pdo->exec($seedSql);
            $details[] = "Đã nạp toàn bộ dữ liệu mẫu thực chiến từ seed.sql";
        }

        // 5. Tự động ghi file api/config.php
        $apiDir = dirname(__DIR__) . '/api';
        if (!is_dir($apiDir)) {
            mkdir($apiDir, 0755, true);
        }
        $configContent = "<?php\n// Cấu hình kết nối MySQL tự động sinh ra bởi database/install.php\n"
            . "define('DB_HOST', " . var_export($dbHost, true) . ");\n"
            . "define('DB_PORT', " . var_export($dbPort, true) . ");\n"
            . "define('DB_NAME', " . var_export($dbName, true) . ");\n"
            . "define('DB_USER', " . var_export($dbUser, true) . ");\n"
            . "define('DB_PASS', " . var_export($dbPass, true) . ");\n";
        file_put_contents($apiDir . '/config.php', $configContent);
        $details[] = "Đã lưu thông tin cấu hình vào `api/config.php`";

        $status = 'success';
        $message = "Khởi tạo cơ sở dữ liệu `{$dbName}` thành công mỹ mãn!";

        if ($isCli) {
            echo "\n[SUCCESS] " . $message . "\n";
            foreach ($details as $d) echo "  - " . $d . "\n";
            exit(0);
        }
    } catch (Exception $e) {
        $status = 'error';
        $message = "Lỗi khởi tạo: " . $e->getMessage();
        if ($isCli) {
            echo "\n[ERROR] " . $message . "\n";
            exit(1);
        }
    }
}
?>
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Khởi Tạo CSDL | Sổ Tay Chọn Chim Cu Gáy</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    :root {
      --bg: #14120e;
      --card-bg: #1f1a14;
      --border: #3d3326;
      --text: #e8ded2;
      --text-muted: #a69888;
      --accent: #c48c46;
      --accent-hover: #db9f52;
      --success: #4ade80;
      --error: #f87171;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'Plus Jakarta Sans', sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }
    .install-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 16px;
      width: 100%;
      max-width: 580px;
      padding: 36px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.5);
    }
    .header-logo {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 24px;
    }
    .header-logo i {
      font-size: 28px;
      color: var(--accent);
    }
    h1 {
      font-family: 'Playfair Display', serif;
      font-size: 24px;
      color: #f7ede2;
      margin-bottom: 8px;
    }
    p.sub {
      color: var(--text-muted);
      font-size: 14px;
      line-height: 1.5;
      margin-bottom: 24px;
    }
    .alert {
      padding: 14px 18px;
      border-radius: 8px;
      margin-bottom: 24px;
      font-size: 14px;
      line-height: 1.5;
    }
    .alert-success {
      background: rgba(74, 222, 128, 0.1);
      border: 1px solid rgba(74, 222, 128, 0.3);
      color: var(--success);
    }
    .alert-error {
      background: rgba(248, 113, 113, 0.1);
      border: 1px solid rgba(248, 113, 113, 0.3);
      color: var(--error);
    }
    .detail-list {
      margin-top: 10px;
      padding-left: 20px;
      font-size: 13px;
    }
    .form-group {
      margin-bottom: 18px;
    }
    label {
      display: block;
      font-size: 13px;
      font-weight: 600;
      color: #ded1c1;
      margin-bottom: 6px;
    }
    input[type="text"], input[type="password"] {
      width: 100%;
      padding: 12px 14px;
      background: #14120e;
      border: 1px solid var(--border);
      border-radius: 8px;
      color: #fff;
      font-size: 14px;
      font-family: inherit;
    }
    input:focus {
      outline: none;
      border-color: var(--accent);
      box-shadow: 0 0 0 3px rgba(196, 140, 70, 0.2);
    }
    .row {
      display: flex;
      gap: 16px;
    }
    .row .form-group {
      flex: 1;
    }
    .btn-submit {
      width: 100%;
      padding: 14px;
      background: var(--accent);
      color: #14120e;
      font-weight: 700;
      font-size: 15px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-top: 8px;
      transition: background 0.2s;
    }
    .btn-submit:hover {
      background: var(--accent-hover);
    }
    .btn-back {
      display: inline-block;
      margin-top: 20px;
      color: var(--text-muted);
      text-decoration: none;
      font-size: 13px;
    }
    .btn-back:hover {
      color: var(--accent);
    }
  </style>
</head>
<body>

<div class="install-card">
  <div class="header-logo">
    <i class="fa-solid fa-database"></i>
    <div>
      <h1>Khởi Tạo Cơ Sở Dữ Liệu</h1>
      <div style="font-size: 13px; color: var(--accent);">cugay_guide (MySQL 8.0+ / MariaDB)</div>
    </div>
  </div>

  <p class="sub">
    Nhập thông tin kết nối MySQL trong máy tính của bạn (XAMPP). Trình cài đặt sẽ tự động tạo database <code>cugay_guide</code>, nạp 10 bảng quan hệ chuẩn và khởi tạo toàn bộ dữ liệu mẫu thực chiến.
  </p>

  <?php if ($status === 'success'): ?>
    <div class="alert alert-success">
      <strong><i class="fa-solid fa-circle-check"></i> <?php echo htmlspecialchars($message); ?></strong>
      <ul class="detail-list">
        <?php foreach ($details as $d): ?>
          <li><?php echo htmlspecialchars($d); ?></li>
        <?php endforeach; ?>
      </ul>
    </div>
    <div style="text-align: center; margin-top: 20px;">
      <a href="../#/" style="padding: 12px 24px; background: var(--accent); color: #14120e; font-weight: 700; border-radius: 8px; text-decoration: none; display: inline-flex; align-items: center; gap: 8px;">
        <i class="fa-solid fa-house"></i> Truy Cập Sổ Tay Cu Gáy
      </a>
    </div>
  <?php elseif ($status === 'error'): ?>
    <div class="alert alert-error">
      <strong><i class="fa-solid fa-triangle-exclamation"></i> <?php echo htmlspecialchars($message); ?></strong>
    </div>
  <?php endif; ?>

  <?php if ($status !== 'success'): ?>
  <form method="POST" action="">
    <div class="row">
      <div class="form-group">
        <label><i class="fa-solid fa-server"></i> Máy chủ (Host)</label>
        <input type="text" name="db_host" value="<?php echo htmlspecialchars($dbHost); ?>" required>
      </div>
      <div class="form-group" style="max-width: 120px;">
        <label><i class="fa-solid fa-network-wired"></i> Cổng (Port)</label>
        <input type="text" name="db_port" value="<?php echo htmlspecialchars($dbPort); ?>" required>
      </div>
    </div>

    <div class="form-group">
      <label><i class="fa-solid fa-user"></i> Tài khoản MySQL (User)</label>
      <input type="text" name="db_user" value="<?php echo htmlspecialchars($dbUser); ?>" required>
    </div>

    <div class="form-group">
      <label><i class="fa-solid fa-key"></i> Mật khẩu MySQL (Password)</label>
      <input type="password" name="db_pass" value="<?php echo htmlspecialchars($dbPass); ?>" placeholder="Nhập mật khẩu MySQL của bạn...">
    </div>

    <button type="submit" class="btn-submit">
      <i class="fa-solid fa-bolt"></i> Bắt Đầu Khởi Tạo CSDL
    </button>
  </form>
  <?php endif; ?>

  <div style="text-align: center;">
    <a href="../#/" class="btn-back"><i class="fa-solid fa-arrow-left"></i> Quay lại trang chủ Sổ tay</a>
  </div>
</div>

</body>
</html>
