<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $userEmail = $_POST['userEmail']; // Email entered in form
    
    $mail = new PHPMailer(true);

    try {
        // SMTP settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.hostinger.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'mailing@ksquaremediahub.in'; // your Hostinger email
        $mail->Password   = 'Klevant@2025'; // password for that email
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;  // use 'tls' if 587
        $mail->Port       = 465;   // 587 if TLS

        // Sender & recipient
        $mail->setFrom('mailing@ksquaremediahub.in', 'ksquaremediahub.in');
        $mail->addAddress('ksquaremediahub@gmail.com'); // where you want to receive emails
        $mail->addReplyTo($userEmail); // so you can reply directly to the user

        // Email content
        $mail->isHTML(true);
        $mail->Subject = 'New Request from Website';
        $mail->Body    = "New request from: <b>$userEmail</b>";

        $mail->send();
        echo "Email has been sent successfully!";
    } catch (Exception $e) {
        echo "Email could not be sent. Error: {$mail->ErrorInfo}";
    }
}
?>
