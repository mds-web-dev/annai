<?php
$recipient = 'tamilvendhantrm@gmail.com';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = htmlspecialchars(trim($_POST['name']));
    $mobileNo = htmlspecialchars(trim($_POST['mobileNo']));
    $message = htmlspecialchars(trim($_POST['message']));
    $chosenProduct = htmlspecialchars(trim($_POST['chooseProducts']));
    $subject = "Product Enquiry: " . $chosenProduct;

    $errors = [];
    if (empty($name)) {
        $errors[] = 'Name is required.';
    }
    if (empty($mobileNo) || !preg_match('/^\d{10}$/', $mobileNo)) {
        $errors[] = 'A valid 10-digit mobile number is required.';
    }
    if (empty($message)) {
        $errors[] = 'Message is required.';
    }
    if (empty($chosenProduct)) {
        $errors[] = 'Please select a product.';
    }

    if (!empty($errors)) {
        echo json_encode(['status' => 'error', 'messages' => $errors]);
        exit;
    }

    $body = "
    <div style='display: flex; justify-content: center; align-items: center;'>
        <div style='width: 550px; border: 3px solid #8e4524; border-radius: 15px; box-shadow: 0 8px 25px rgba(2,75,117,0.3); background: #fff; transform: rotateY(5deg); transition: transform 0.3s ease;'>
            <div style='background: linear-gradient(90deg, #8e4524, #a57f7f); color: #fff; font-size: 28px; text-align: center; padding: 15px; text-transform: uppercase; border-radius: 12px 12px 0 0; position: relative; overflow: hidden;'>
                Enquiry from $name
            </div>
            <div style='padding: 20px; background: #f9fbfd; border-radius: 0 0 12px 12px;'>
                <table style='width: 100%; border: 2px dashed #8e4524; border-collapse: separate; border-spacing: 5px; color: #000; background: linear-gradient(45deg, #fff, #f0f4f8);'>
                    <tr>
                        <td style='font-size: 22px; padding: 12px; border: 1px solid #8e4524; color: #8e4524; background: rgba(255,255,255,0.8); border-radius: 8px;'><strong>Name:</strong></td>
                        <td style='font-size: 22px; padding: 12px; border: 1px solid #8e4524; color: #3e3e3e; background: rgba(255,255,255,0.8); border-radius: 8px; font-style: italic;'>$name</td>
                    </tr>
                    <tr>
                        <td style='font-size: 22px; padding: 12px; border: 1px solid #8e4524; color: #8e4524; background: rgba(255,255,255,0.8); border-radius: 8px;'><strong>Mobile:</strong></td>
                        <td style='font-size: 22px; padding: 12px; border: 1px solid #8e4524; color: #3e3e3e; background: rgba(255,255,255,0.8); border-radius: 8px; font-style: italic;'>$mobileNo</td>
                    </tr>
                    <tr>
                        <td style='font-size: 22px; padding: 12px; border: 1px solid #8e4524; color: #8e4524; background: rgba(255,255,255,0.8); border-radius: 8px;'><strong>Message:</strong></td>
                        <td style='font-size: 22px; padding: 12px; border: 1px solid #8e4524; color: #3e3e3e; background: rgba(255,255,255,0.8); border-radius: 8px; line-height: 1.4;'>$message</td>
                    </tr>
                    <tr>
                        <td style='font-size: 22px; padding: 12px; border: 1px solid #8e4524; color: #8e4524; background: rgba(255,255,255,0.8); border-radius: 8px;'><strong>Chosen Product:</strong></td>
                        <td style='font-size: 22px; padding: 12px; border: 1px solid #8e4524; color: #000; background: rgba(255,255,255,0.8); border-radius: 8px; font-weight: bold; text-decoration: underline;'>$chosenProduct</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>";

    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";
    $headers .= "From: no-reply@mdsdigitalhub.com" . "\r\n";

    if (mail($recipient, $subject, $body, $headers)) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'messages' => ['Failed to send enquiry.']]);
    }
}
?>