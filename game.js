"use strict";

function Game(canvas) {
    this.player = null;
    this.enemies = [];
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.gameOver = false;
}

Game.prototype.startLoop = function() {
   
    this.player = new Player(this.canvas);

    const loop = () => {

      if (Math.random() > 0.97) {
          const randomNum = (Math.random() * this.canvas.width) + 15;
          this.enemies.push(new Enemy(this.canvas, randomNum));
      }

      console.log('i am in the loop');
      this.clearCanvas();
      this.updateCanvas();
      this.drawCanvas();
      this.checkCollisions();
      console.log(this.player.direction);

      if (this.gameOver === false) {
      window.requestAnimationFrame(loop);
      }
    }
    
    window.requestAnimationFrame(loop);
  }

Game.prototype.clearCanvas = function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

}

Game.prototype.updateCanvas = function() {
    this.player.update();
    this.enemies.forEach( function(enemy) {
        enemy.update();
    });
}

Game.prototype.drawCanvas = function() {
    this.player.draw();
    this.enemies.forEach( function(enemy) {
        enemy.draw();
    });
}

Game.prototype.checkCollisions = function() {
    this.enemies.forEach((enemy, index) => {
       const isColliding = this.player.checkCollisionWithEnemy(enemy);
    
       if(isColliding) {
           this.enemies.splice(index, 1);
           this.player.setLives();
           if (this.player.lives === 0) {
               this.gameOver = true;
               
           }
       }
    })

}

Game.prototype.setGameOverCallback = function(callback) {

}