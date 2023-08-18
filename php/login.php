<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$is_invalid = false;

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $mysqli = require __DIR__ . "/database.php";

    $sql = sprintf("SELECT * FROM user
            WHERE name = '%s'",
            $mysqli->real_escape_string($_POST["name"]));
    
    $result = $mysqli->query($sql);

    $user = $result->fetch_assoc();
    print_r($user);

    if ($user) {
        if (password_verify($_POST["password"], $user["password_hash"])) {
            session_start();
            session_regenerate_id();
            $_SESSION["user_id"] = $user["user_id"]; // Change "id" to "user_id"
            header("Location:../index.php"); 
            exit;
        }
    }
    
    $is_invalid = true;
}

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="../styles.css">
</head>
<body>

    <div class="login-page">

    <a href="../index.php" class='back-home'>Play without Logging in </br><span class='note'>(your score won't be saved)</span></a>    
    
    
        <div class="login-card">
    
          <h1>X-Racing</h1>
          <h2>Login</h2>

            <?php if ($is_invalid): ?>
                <em class="error-message">Invalid Login</em>
            <?php endif; ?>

          <form class="login-form" method="POST">
            
            <!-- Name Input -->
            <input type="text" id="name" name="name" placeholder="username" value="<?= htmlspecialchars($_POST["name"] ?? "") ?>"/>
            
            <!-- Password Input -->
            <input type="password" id="password" name="password" placeholder="password"/>

            <p class="loginSignup">Don't have an account?</p>
            <a href="signup-page.php">Signup</a>
            <button class='loginBtn'>LOGIN</button>
          </form>
    </div>
    </div>
</body>
</html>