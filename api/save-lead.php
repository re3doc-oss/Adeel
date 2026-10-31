<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    // Also check standard POST request
    $data = $_POST;
}

$clientName = $data['clientName'] ?? '';
$companyName = $data['companyName'] ?? '';
$phone = $data['phone'] ?? '';
$email = $data['email'] ?? '';
$service = $data['service'] ?? '';
$product = $data['product'] ?? '';
$quantity = $data['quantity'] ?? 1;
$emirate = $data['emirate'] ?? 'Dubai';
$totalAed = $data['totalAed'] ?? '0.00';
$notes = $data['notes'] ?? '';

if (empty($clientName) || empty($phone)) {
    echo json_encode(['success' => false, 'error' => 'Client name and phone number are required.']);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO leads (client_name, company_name, phone, email, service, product, quantity, emirate, total_aed, notes, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'New', NOW())");
    
    $stmt->execute([
        $clientName,
        $companyName,
        $phone,
        $email,
        $service,
        $product,
        $quantity,
        $emirate,
        $totalAed,
        $notes
    ]);

    echo json_encode(['success' => true, 'message' => 'Quotation lead saved successfully in cPanel database.']);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>
