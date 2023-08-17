class Obstacle {
    constructor(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width =  30;
      this.height =  50;
      this.obstacleType = this.getRandomColor();
    }

    getRandomColor() {
      const colors = ['red', 'blue', 'yellow'];
      const randomIndex = Math.floor(Math.random() * colors.length);
      return colors[randomIndex];
    }
  
    drawObstacle() {
      const obstacleImg = new Image();
      obstacleImg.src =
      this.obstacleType === 'red'
      ? './images/obstacleCarRed.png'
      : this.obstacleType === 'blue'
      ? './images/obstacleCarBlue.png'
      : './images/obstacleCarYellow.png';
      ctx.drawImage(obstacleImg, this.x, this.y, this.width, this.height);
    }
  }
  
  class Bonus extends Obstacle {
    constructor(x, y) {
        super(x, y, 70, 50); 

        this.obstacleType = 'bonus';
    }

    drawObstacle() {
        const obstacleImg = new Image(  );
        obstacleImg.src = './images/bonus-box.png'; 
        ctx.drawImage(obstacleImg, this.x, this.y, this.width, this.height);
    }
}

class Skull extends Obstacle {
  constructor(x, y, width, height) {
      super(x, y, 60, 60);
      this.obstacleType = 'skull';
  }

  drawObstacle() {
      const obstacleImg = new Image();
      
      obstacleImg.src = './images/skull.png';
      ctx.drawImage(obstacleImg, this.x, this.y, this.width, this.height);
  }
}


