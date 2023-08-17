//Key Variables

let currentGame;
let currentCar;

let obstaclesFrequency = 0; // support the logic for generating obstacles
let obstacleSpeed = 3;

let skullFrequency = 0; // support the logic for generating skulls

let isGameOver = false;
let animationFrameId; 

let background = new Image();
let backgroundY = 0;
background.src = "./images/road.png";

let scoreDisplay = document.querySelector('#yourScore')
let finalScore = document.getElementById('#scoreTwo')
let finalLevel = document.getElementById('#levelTwo')

let frameCount = 0;

let level = document.querySelector('#level')
let lastDifficultyUpdate = 0;

let divisor = 30;

let isRestarting = false; // A flag to prevent multiple restarts

let startTime = 0;
let countdown = 20;

//Opening Area and Start Button

const toggleButton = document.querySelector('#start-button');
const timer = document.querySelector('.timer')
const toggleOpening = document.querySelector('.opening-section');
const toggleInfo = document.querySelector('.info');
const endScreen = document.querySelector('.full-time')
const mobile = document.querySelector('.mobile-controls')

toggleOpening.style.display = '';
endScreen.style.display = 'none';
mobile.style.display = 'none';
timer.style.display = 'none';


//Game Area
const myCanvas = document.getElementById('canvas');
const ctx = myCanvas.getContext('2d');

myCanvas.style.display = 'none';
toggleInfo.style.display = 'none';

//Start Button
window.onload = () => {
    toggleButton.onclick = (event) => {
    event.stopPropagation();
    pauseOpeningAudio();
    drive.play();
    toggleOpening.style.display = 'none';
    myCanvas.style.display = '';
    toggleInfo.style.display = '';      
    mobile.style.display = '';
    timer.style.display = '';
    startGame();
    };

  };

  //Main Menu Button
let mainMenuButton = document.getElementsByClassName('main-menu-button')
for (let i = 0 ; i < mainMenuButton.length; i++) {
  mainMenuButton[i].addEventListener('click',  ()=>{
    resetScore();
    toggleOpening.style.display = '';
    myCanvas.style.display = 'none';
    toggleInfo.style.display = 'none';      
    mobile.style.display = 'none';
    endScreen.style.display= 'none';
    closing.pause();
    isGameOver = false;
    obstacleSpeed = 3;
  })  
}
function startGame() {

  startTime = Date.now();
  cancelAnimationFrame(animationFrameId);
  drive.play();
  currentGame = new Game();
  ctx.drawImage(background, 0, 0, myCanvas.width, myCanvas.height); // draw background image
  // Instantiate a new Car
  currentCar = new Car();
  currentCar.drawCar();
  animationFrameId = requestAnimationFrame(updateCanvas);

  // Add touch event listeners
  if (!isGameOver) {
    addTouchListeners();
  }
}

const restartButton = document.querySelector('#restart-button');
restartButton.addEventListener('click', restartGame);

function restartGame() {
  if (isRestarting) return;
  isRestarting = true;
  myCanvas.style.display = 'block';
  endScreen.style.display = 'none';
  toggleOpening.style.display = 'none';
  closing.pause();
  toggleInfo.style.display = '';
  mobile.style.display = '';
  timer.style.display = '';
  isGameOver = false;
  obstacleSpeed = 3;
  resetScore();
  startGame();
  isRestarting = false;
  restartButton.addEventListener('click', restartGame);
}

function resetScore() {
  currentGame.score = 0;
  scoreDisplay.innerText = 0;
  currentGame.level = 1;
  level.innerText = currentGame.level;
  lastDifficultyUpdate = 0;
  divisor = 30;
}  

  function updateCanvas() {

    const currentTime = Date.now();
    const elapsedTimeInSeconds = Math.floor((currentTime - startTime) / 1000); // Calculate elapsed time in seconds


    if (isGameOver) return;
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height); // clear canvas
    
    // Scroll the background downwards
    backgroundY += 5;
    if (backgroundY >= myCanvas.height) {
        backgroundY = 0;
    }

    // Draw the background image twice, one above the other, to cover the entire canvas
    ctx.drawImage(background, 0, backgroundY, myCanvas.width, myCanvas.height);
    ctx.drawImage(background, 0, backgroundY - myCanvas.height, myCanvas.width, myCanvas.height);

    currentCar.drawCar(); // redraw the Car at its current position
    obstaclesFrequency++;
    skullFrequency++;

    if (obstaclesFrequency % divisor === 1) {
        //Draw an obstacle
        let randomObstacleX = Math.floor(Math.random() * myCanvas.width);
        let randomObstacleY = -50;
        let randomObstacleWidth = 30;
        let randomObstacleHeight = 50;
        let newObstacle = new Obstacle(
            randomObstacleX, 
            randomObstacleY, 
            randomObstacleWidth, 
            randomObstacleHeight);
  
        currentGame.obstacles.push(newObstacle);
        currentGame.score++;
        scoreDisplay.innerText = currentGame.score
    }

    if (skullFrequency >= 200) {
      // Draw a skull
      let randomSkullX = Math.floor(Math.random() * myCanvas.width);
      let randomSkullY = -50;
      let randomSkullWidth = 60;
      let randomSkullHeight = 60;
      let newSkull = new Skull(
          randomSkullX,
          randomSkullY,
          randomSkullWidth,
          randomSkullHeight,
          console.log("Generating skull")
      );
  
      currentGame.skulls.push(newSkull);
      console.log(currentGame.skulls.length);

        
  
      // Reset the skull frequency counter
      skullFrequency = 0;
  } else {
      // Increment the skull frequency counter
      skullFrequency++;
  }
  
    for(let i = 0; i<currentGame.obstacles.length; i++) {
        currentGame.obstacles[i].y += obstacleSpeed; 
        currentGame.obstacles[i].drawObstacle();
 
         if (detectCollision(currentGame.obstacles[i])) {
          congrats.pause();
          crash.play();
          currentCar.x = myCanvas.width/2;
          currentCar.y = myCanvas.height/1.5;
          endGame();
        }       
              // Logic for removing obstacles 
       if (currentGame.obstacles.length > 0 && currentGame.obstacles[i].y >= 700) {
        currentGame.obstacles.splice(i, 1); // remove that obstacle from the array
      } 
      }

        // Check collision with bonus boxes
  for (let i = 0; i < currentGame.bonuses.length; i++) {
    if (detectCollision(currentGame.bonuses[i])) {
      currentGame.bonuses.splice(i, 1);
      congrats.pause();
      yummy.play();
      currentGame.score += 50; // Increase the score by 50
      scoreDisplay.innerText = currentGame.score; // Update the score display

      // Display the bonus indicator and then hide it after a delay
      const bonusIndicator = document.getElementById('bonus-indicator');
      bonusIndicator.classList.remove('hidden');
      setTimeout(() => {
          bonusIndicator.classList.add('hidden');
      }, 1000); // Adjust the delay time as needed
    }
                  // Logic for removing obstacles
                  if (currentGame.bonuses.length > 0 && currentGame.bonuses[i].y >= 700) {
                    currentGame.bonuses.splice(i, 1); // remove that obstacle from the array
                  } 
  }

  for (let i = 0; i < currentGame.skulls.length; i++) {
    currentGame.skulls[i].y += 5; 
    currentGame.skulls[i].drawObstacle();

    if (detectCollision(currentGame.skulls[i])) {
      currentGame.skulls.splice(i, 1); 
      congrats.pause();
      skull.play();
      currentGame.score -= 50; // Decrease the score by 50
      scoreDisplay.innerText = currentGame.score; // Update the score display

      // Display the skull indicator and then hide it after a delay
    const skullIndicator = document.getElementById('skull-indicator');
    skullIndicator.classList.remove('hidden');
    setTimeout(() => {
        skullIndicator.classList.add('hidden');
    }, 1000); // Adjust the delay time as needed
}

                  // Logic for removing obstacles
                  for (let i = currentGame.skulls.length - 1; i >= 0; i--) {
                    if (currentGame.skulls[i].y >= 700) {
                        currentGame.skulls.splice(i, 1); 
                        }

                      }
  }        

      if (elapsedTimeInSeconds >= 20) { // Increase level every 20 seconds
        congrats.play();
        obstacleSpeed += 0.5;
        currentGame.level++;
        if (divisor > 2) {
            divisor -= 2;
        }
        startTime = currentTime; // Reset the start time
        level.innerText = currentGame.level;
    
        // Create a new bonus and add it to the bonuses array
        const randomX = Math.floor(Math.random() * myCanvas.width);
        const newBonus = new Bonus(randomX, -60); // Start above the canvas
        currentGame.bonuses.push(newBonus);
      }
    
    // Update and display countdown
    if (!isGameOver) {
        countdown = 20 - elapsedTimeInSeconds;
        countdown = countdown < 0 ? 0 : countdown; // To ensure sure countdown doesn't go negative
        document.getElementById('countdown').innerText = countdown;
    }

      // Move and draw bonuses
      for (let i = 0; i < currentGame.bonuses.length; i++) {
        currentGame.bonuses[i].y += 5;
        currentGame.bonuses[i].drawObstacle();

        // Remove bonuses that are out of the canvas
        if (currentGame.bonuses[i].y >= myCanvas.height) {
          currentGame.bonuses.splice(i, 1);
        }
      }

      function endGame(){
        closing.play();
        isGameOver = true;
        currentCar.x = myCanvas.width/2
        currentCar.y = myCanvas.height/1.25
        toggleOpening.style.display = 'none'
        toggleInfo.style.display = 'none'
        myCanvas.style.display = 'none'
        endScreen.style.display = '';
        mobile.style.display = 'none';
        timer.style.display = 'none';
        scoreTwo.innerText = currentGame.score;
        levelTwo.innerText = currentGame.level;
      }

      if (!isGameOver) {
        requestAnimationFrame(updateCanvas);
      }

  }


  function detectCollision(obstacle) {
    return ((currentCar.x < obstacle.x + obstacle.width) &&         // check left side of element 
    (currentCar.x + obstacle.width > obstacle.x) &&           // check right side
    (currentCar.y < obstacle.y + obstacle.height) &&         // check top side
    (currentCar.y + currentCar.height > obstacle.y));           // check bottom side
  }


