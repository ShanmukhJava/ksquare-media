
<?php
// Allow requests from your website
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Only POST method allowed']);
    exit;
}

// Get the JSON data from frontend
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Check if we got data
if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'No data received']);
    exit;
}

// Get form data
$name = isset($data['name']) ? trim($data['name']) : '';
$email = isset($data['email']) ? trim($data['email']) : '';
$phone = isset($data['phone']) ? trim($data['phone']) : '';
$service = isset($data['service']) ? trim($data['service']) : '';
$date = isset($data['date']) ? trim($data['date']) : '';
$message = isset($data['message']) ? trim($data['message']) : '';

// Basic validation
if (empty($name) || empty($email) || empty($phone)) {
    http_response_code(400);
    echo json_encode(['error' => 'Name, email, and phone are required']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email format']);
    exit;
}

// Email details
$to = "ksquaremediahub@gmail.com";
$subject = "New Appointment Booking";

// Create email message
$email_message = "You have received a new appointment booking:\n\n";
$email_message .= "Full Name: $name\n";
$email_message .= "Email: $email\n";
$email_message .= "Phone: $phone\n";
$email_message .= "Service: $service\n";
$email_message .= "Date: $date\n";
$email_message .= "Message: $message\n";

// Email headers
$headers = "From: $name <$email>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Send the email
if (mail($to, $subject, $email_message, $headers)) {
    echo json_encode(['message' => 'Email sent successfully!']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send email. Please try again.']);
}
?>