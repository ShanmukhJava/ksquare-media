<?php
header('Content-Type: application/json');

// Check if the request is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'error' => 'Invalid request method']);
    exit;
}
session_start();
if (!isset($_SESSION['last_submit'])) {
    $_SESSION['last_submit'] = time();
} else {
    if (time() - $_SESSION['last_submit'] < 60) { // 60 seconds between submissions
        echo json_encode(['success' => false, 'error' => 'Please wait before submitting again']);
        exit;
    }
    $_SESSION['last_submit'] = time();
}

// Add at the top of send_email.php
if (empty($_POST['name']) || isset($_POST['website'])) {
    // Basic honeypot - bots might fill this hidden field
    echo json_encode(['success' => false, 'error' => 'Invalid form submission']);
    exit;
}

// Get form data
$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING);
$service = filter_input(INPUT_POST, 'service', FILTER_SANITIZE_STRING);
$date = filter_input(INPUT_POST, 'date', FILTER_SANITIZE_STRING);
$message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);

// Validate required fields
if (empty($name) || empty($email) || empty($phone) || empty($service)) {
    echo json_encode(['success' => false, 'error' => 'Please fill all required fields']);
    exit;
}

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'error' => 'Invalid email address']);
    exit;
}

// Email configuration
$to = 'ksquaremedia@gmail.com'; // Your email address
$subject = 'New Appointment Request from ' . $name;
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

// Email content
$email_content = "
<html>
<head>
    <title>New Appointment Request</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #4a00e0; color: white; padding: 10px; text-align: center; }
        .content { padding: 20px; }
        .footer { margin-top: 20px; font-size: 0.8em; color: #666; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>New Appointment Request</h2>
        </div>
        <div class='content'>
            <p><strong>Name:</strong> $name</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Phone:</strong> $phone</p>
            <p><strong>Service:</strong> $service</p>
            <p><strong>Preferred Date:</strong> " . ($date ? $date : 'Not specified') . "</p>
            <p><strong>Message:</strong></p>
            <p>" . nl2br($message) . "</p>
        </div>
        <div class='footer'>
            <p>This email was sent from the contact form on KSquare Media website.</p>
        </div>
    </div>
</body>
</html>
";

// Send email
if (mail($to, $subject, $email_content, $headers)) {
    echo json_encode(['success' => true, 'message' => 'Your appointment request has been sent successfully!']);
} else {
    echo json_encode(['success' => false, 'error' => 'Failed to send email. Please try again later.']);
}
?>