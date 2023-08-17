<?php
session_start();

$user = null; // Initialize the $user variable

if (isset($_SESSION["user_id"])) {
    $mysqli = require __DIR__ . "/php/database.php";
    $sql = "SELECT * FROM user WHERE user_id = {$_SESSION["user_id"]}";
    $result = $mysqli->query($sql);
    $user = $result->fetch_assoc();
}
?>

<!DOCTYPE html>
<html>

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>X-Racing</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
        <link rel="stylesheet" href="styles.css" />
    </head>

    <body>

        <article class='welcome'>
            
            <?php if ($user): ?>
                <p>Hello <?= htmlspecialchars($user["name"]) ?>!</p>
            <?php endif; ?> 
            <?php ?>

        </article>

        <section class="opening-section">

        <a class="login" href="<?php echo $user ? './php/logout.php' : './php/login.php'; ?>">
             <?php echo $user ? 'LOGOUT' : 'LOGIN to save your score'; ?>
        </a>

            <div class="opening-text">

                <h1 id="title">X-Racing</h1>

                <p>Do you have what it takes to become the next Ayrton Senna?!</p>
                <p>Every <span id="fifty">20 seconds</span>, the game gets harder!</p>
                <div class="boxes"><p class="bonus"><img src="./images/bonus-box.png" id="bonus" alt="bonus box icon"> +50 points</p>   <p class="skull"><img src="./images/skull.png" id="skull" alt="skull icon"> -50 points</p></div>

                <p>Use the <img src="./images/computer arrows.png" alt="arrows" id="arrows" width="40" height="40"> buttons to move the car. How long before you crash?!</p>

                <article class="selectCar">
                    <h3 class="selectHeader">
                      <span id="yellow">&ensp;&ensp;Select&ensp;</span>
                      <span id="blue">Car&ensp;</span>
                      <span id="red">Colour</span>
                    </h3>
                    <div class="options">
                      <img src="images/yellow-car.png" alt="yellow car" width="40" height="70">
                      <input class="checkbox" type="checkbox" id="yellowCheckbox" name="color" value="yellow" onclick="handleColorChange(event)">
                  
                      <img src="images/blue-car.png" alt="blue car" width="40" height="70">
                      <input class="checkbox" type="checkbox" id="blueCheckbox" name="color" value="blue" checked onclick="handleColorChange(event)">
                  
                      <img src="images/red-car.png" alt="red car" width="40" height="70">
                      <input class="checkbox" type="checkbox" id="redCheckbox" name="color" value="hard" onclick="handleColorChange(event)">
                    </div>
                  </article>

                <button id="start-button">StartGame</button>

             </div>

             <article class="play-music">
                <p id="audio-button" class="audio"> CLICK <span id="sound">HERE</span> FOR OPENING MUSIC &ensp;</p><i class="fa fa-volume-up" aria-hidden="true"></i>
            </article>

             <article class="music-credit">
                <p> Opening Music from #Uppbeat (free for Creators!):<br/>
                    https://uppbeat.io/t/alex-besss/psycho<br/>
                    License code: WFG2A3BYXWQ1DJO8
                </p>
            </article>

        </section>

        <section class="info">
            <div class="score">Score: <span id="yourScore">0</span><span id="bonus-indicator" class="bonus-indicator hidden">+50</span><span id="skull-indicator" class="skull-indicator hidden">-50</span></div>
            <div class="level">Level: <span id="level">1</span></div>
        </section>
        <div class="timer">Next<br/>level:<span id="countdown">20</span></div>


        <section class="mobile-controls">
            <button id="left"><i class="fa fa-arrow-left" aria-hidden="true"></i></button>
            <button id="right"><i class="fa fa-arrow-right" aria-hidden="true"></i></button>
        </section>

  <canvas id="canvas" width="500" height="600"></canvas> 


    <section class="full-time">
        <div class="full-time-text">
            <p>You Crashed!</p>
            <div class="stats">
                <p id="finalScore">Final Score: <span id="scoreTwo">0</span>&ensp;&ensp;
                <p id="finalLevel">Level: <span id="levelTwo">1</span></p>
            </div>
            <div class="utilityButtons">
            <button id="restart-button" class="try-again-button">Restart</button>
            <button class="main-menu-button">Main Menu</button>  
        </div>
         </div>
        <article class="closing-credits"><p>Closing Music from #Uppbeat (free for Creators!):<br/>
            https://uppbeat.io/t/claude-patterns/pattern-22<br/>
            License code: O5BXHKFUKHABKGG0</p></article>
    </section>

    <script type="text/javascript" src="./js/car.js"></script>
    <script type="text/javascript" src="./js/obstacle.js"></script>
    <script type="text/javascript" src="./js/game.js"></script>
    <script type="text/javascript" src="./js/index.js"></script>
    <script type="text/javascript" src="./js/audio.js"></script>
    <script type="text/javascript" src="./js/login.js"></script>
    
</body>

</html>