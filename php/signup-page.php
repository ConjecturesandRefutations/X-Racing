<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Signup</title>
    <link rel="stylesheet" href="../styles.css">
    <script src="../js/login.js"></script>
</head>
<body>

    <div class="login-page">

    <a href="../index.php" class='back-home'>Play without Logging in </br><span class='note'>(your score won't be saved)</span></a>    
    
        <div class="login-card">
    
          <h1>X-Racing</h1>
          <h2>Signup</h2>
          <form class="login-form" action="signup.php" method="POST" id="signup" onsubmit="return validateForm()">
            
            <!-- Name Input -->
            <input type="text" id="name" name="name" placeholder="username"/>
            <span class="error" id="nameError"></span>
            
            <!-- Password Input -->
            <input type="password" id="password" name="password" placeholder="password"/>
            <span class="error" id="passwordError"></span>

            <!-- Confirm Password -->
            <input type="password" id="password-confirmation" name="password_confirmation" placeholder="confirm password">
            <span class="error" id="passwordConfirmationError"></span>
            
            <p class="loginSignup">Already Have an Account?</p>
            <a href="login.php">Login</a>
            <button class='loginBtn'>SIGNUP</button>
          </form>
    </div>
    </div>
</body>
</html>