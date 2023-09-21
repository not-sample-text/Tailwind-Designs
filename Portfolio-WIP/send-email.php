<?php

// Settings
$from_name = 'Server';
$from_email = 'server@hello.xab3.ro';

// Validate user request
$errors = [];
$input_was_validated = false;
if (
    $_SERVER['REQUEST_METHOD'] === 'POST'
    && isset($_SERVER['HTTP_X_REQUESTED_WITH'])
    && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest'
) {
    // Validate user input
    if (!isset($_POST['name']) || !is_string($_POST['name']) || strlen($_POST['name']) == 0) {
        $errors['name'] = 'Your name is required';
    } else if (strlen($_POST['name']) < 5) {
        $errors['name'] = 'Your name is too short. Minimum 5 chars.';
    }
    if (!isset($_POST['email']) || !is_string($_POST['email']) || strlen($_POST['email']) == 0) {
        $errors['email'] = 'Your email is required';
    } else if (strlen($_POST['email']) < 8 || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Your email is invalid.';
    }
    if (!isset($_POST['subject']) || !is_string($_POST['subject']) || strlen($_POST['subject']) == 0) {
        $errors['subject'] = 'The subject is required';
    } else if (strlen($_POST['subject']) < 2) {
        $errors['subject'] = 'Your name is too short. Minimum 2 chars.';
    }
    if (!isset($_POST['message']) || !is_string($_POST['message']) || strlen($_POST['message']) == 0) {
        $errors['message'] = 'The message is required';
    } else if (strlen($_POST['message']) < 2) {
        $errors['message'] = 'Your name is too short. Minimum 2 chars.';
    }

    if (count($errors) > 0) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($errors);
        exit;
    }

    $input_was_validated = true;
}

// Send email
if ($input_was_validated) {
    $to = $_POST['email'];
    $subject = $_POST['subject'];
    $user_message = htmlspecialchars($_POST['message'], ENT_COMPAT | ENT_HTML5, 'UTF-8');
    $message = <<<END
    <p>You have received the following message:</p>
    <br>
    $user_message
END;

    $headers = [];
    $headers[] = "MIME-Version: 1.0";
    $headers[] = "Content-type: text/html; charset=UTF-8";
    $headers[] = "From: $from_name <$from_email>";
    $headers[] = "Reply-To: $to";

    header('Content-Type: application/json; charset=utf-8');

    if (mail($to, $subject, $message, $headers)) {
        echo json_encode([
            'message' => 'Your email was sent. I will contact you as soon as possible.'
        ]);
    } else {
        echo json_encode([
            'message' => 'Something went wrong. Please try again.'
        ]);
    }
    exit;
}

// Info
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo 'Hello!';
    exit;
}
