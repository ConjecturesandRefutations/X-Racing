let currentColor = 'blue';

function handleColorChange(event) {
  event.stopPropagation();
  if (event.target.checked) {
    currentColor = event.target.value;
    // Uncheck other checkboxes
    const checkboxes = document.querySelectorAll('input[name="color"]');
    checkboxes.forEach((checkbox) => {
      if (checkbox !== event.target) {
        checkbox.checked = false;
      }
    });
  } else {
    // Ensure that at least one checkbox is always checked
    const checkedCheckboxes = document.querySelectorAll('input[name="color"]:checked');
    if (checkedCheckboxes.length === 0) {
      event.target.checked = true;
    }
  }
}


function addTouchListeners() {
  // Touch event handling for leftButton
  currentCar.leftButton.ontouchstart = () => {
    currentCar.leftButtonDown = true;
    currentCar.throttledLeftStart();
  };

  currentCar.leftButton.ontouchend = () => {
    currentCar.leftButtonDown = false;
    currentCar.stopMovingCar();
  };

  // Touch event handling for rightButton
  currentCar.rightButton.ontouchstart = () => {
    currentCar.rightButtonDown = true;
    currentCar.throttledRightStart();
  };

  currentCar.rightButton.ontouchend = () => {
    currentCar.rightButtonDown = false;
    currentCar.stopMovingCar();
  };

  // Mouse event handling for leftButton
  currentCar.leftButton.onmousedown = () => {
    currentCar.leftButtonDown = true;
    currentCar.throttledLeftStart();
  };

  currentCar.leftButton.onmouseup = () => {
    currentCar.leftButtonDown = false;
    currentCar.stopMovingCar();
  };

  // Mouse event handling for rightButton
  currentCar.rightButton.onmousedown = () => {
    currentCar.rightButtonDown = true;
    currentCar.throttledRightStart();
  };

  currentCar.rightButton.onmouseup = () => {
    currentCar.rightButtonDown = false;
    currentCar.stopMovingCar();
  };
}

class Car {
    constructor(){
      this.x = canvas.width/2;
      this.y = canvas.height/1.25;
      this.width = 30;
      this.height = 50;
      this.img = this.getImagePath();
        // Variables to track button presses
        this.leftButtonDown = false;
        this.rightButtonDown = false;
    
      // Variables to track button presses
    this.leftButtonDown = false;
    this.rightButtonDown = false;
    this.throttleDelay = 100; // Mobile Throttle Delay (Milliseconds)

    // Select the mobile-controls buttons
    this.leftButton = document.getElementById('left');
    this.rightButton = document.getElementById('right');

    // Throttle the touchstart event listeners
    this.throttledLeftStart = this.throttle(() => this.startMovingCar('left'), this.throttleDelay);
    this.throttledRightStart = this.throttle(() => this.startMovingCar('right'), this.throttleDelay);

    this.isCarMoving = false;

    this.throttleDelay = 100; // Keyboard Throttle Delay (Milliseconds)

    //Event listeners for keyboard controls
    document.addEventListener('keydown', (event) => this.handleKeyDown(event));
    document.addEventListener('keyup', (event) => this.handleKeyUp(event));
    
    }
    
    getImagePath() {
      // Return the appropriate image path based on the currentColor
      switch (currentColor) {
        case 'yellow':
          return './images/yellow-car.png';
        case 'blue':
          return './images/blue-car.png';
        case 'red':
        default:
          return './images/red-car.png';
      }
    }

    drawCar(){
      const carImg = new Image();
      carImg.src = this.img;
      ctx.drawImage(carImg, this.x, this.y, this.width, this.height);
    }

    handleKeyDown(event) {
      if (event.keyCode === 37) {
        // left arrow key
        this.leftButtonDown = true;
        this.throttledLeftStart();
      } else if (event.keyCode === 39) {
        // right arrow key
        this.rightButtonDown = true;
        this.throttledRightStart();
      }
    }
  
    handleKeyUp(event) {
      if (event.keyCode === 37) {
        // left arrow key
        this.leftButtonDown = false;
        this.stopMovingCar();
      } else if (event.keyCode === 39) {
        // right arrow key
        this.rightButtonDown = false;
        this.stopMovingCar();
      }
    }

    throttle(callback, delay) {
      let lastCallTime = 0;
      return function () {
        const now = Date.now();
        if (now - lastCallTime >= delay) {
          lastCallTime = now;
          callback.apply(this, arguments);
        }
      };
    }
    
startMovingCar(direction) {
    // Move the car continuously as long as the corresponding button is pressed
    if (direction === 'left' && this.leftButtonDown && this.x > 5) {
      this.x -= 3;
      turn.play();
    } else if (direction === 'right' && this.rightButtonDown && this.x < myCanvas.width - 35) {
      this.x += 3;
      turn.play();
    }

    // Use requestAnimationFrame to keep moving the car continuously
    if (this.leftButtonDown || this.rightButtonDown) {
      this.requestAnimationFrame = requestAnimationFrame(() => this.startMovingCar(direction));
    }
  }
  
  stopMovingCar() {
    // Stop the car's movement when both buttons are released
    if (!this.leftButtonDown && !this.rightButtonDown) {
      cancelAnimationFrame(this.requestAnimationFrame);
    }
  }

  }