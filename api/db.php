<?php
/**
 * Database Connection Configuration for cPanel MySQL
 * Update these credentials with your cPanel database details:
 * - DB_HOST: Usually 'localhost'
 * - DB_NAME: Your cPanel MySQL database name (e.g., username_aladeel_db)
 * - DB_USER: Your cPanel MySQL database username
 * - DB_PASS: Your cPanel MySQL database password
 */
define('DB_HOST', 'localhost');
define('DB_NAME', 'aladeel_db');
define('DB_USER', 'aladeel_user');
define('DB_PASS', 'YOUR_CPANEL_DB_PASSWORD');

try {
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4", DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
} catch (PDOException $e) {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'error' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}
?>
