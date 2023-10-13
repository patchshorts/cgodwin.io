---
title: Resume Game
icon: snake
article: false
headerDepth: 1
showInSidebar: false
sidebar: false
---

  <div id="game-container">
    <canvas ref="gameCanvas" width="600" height="600"></canvas>
     <div id="score-container">
      <div>Score: {{ score }}</div>
      <div>Roles Held: {{ snakeLength }}</div>
      <div>XP: {{ xp }}</div>
    </div>
  </div>


<script>
export default {
  data() {
    return {
      snake: {
        position: { x: 100, y: 50 },
        body: [{ x: 100, y: 50 }, { x: 90, y: 50 }, { x: 80, y: 50 }, { x: 70, y: 50 }],
        direction: 'NONE',
      },
      food: {
        nuggets: [
          {
              "position": { "x": 346, "y": 338 },
              "text": "NOC Support / Sys Eng, Suddenlink"
          },
          {
              "position": { "x": 424, "y": 281 },
              "text": "Unix Administrator, NLI"
          },
          {
              "position": { "x": 413, "y": 402 },
              "text": "Linux Engineer III, Rackspace"
          },
          {
              "position": { "x": 167, "y": 256 },
              "text": "CTO, HostUOnline, Inc"
          },
          {
              "position": { "x": 139, "y": 375 },
              "text": "Development Guru, Sundaram"
          },
          {
              "position": { "x": 139, "y": 375 },
              "text": "Owner, Fire, Well & Tree"
          },
          {
              "position": { "x": 221, "y": 148 },
              "text": "Sr. SRE, International Game Tech"
          },
          {
              "position": { "x": 112, "y": 499 },
              "text": "Manager SRE / DevSecOps, Charles Schwab"
          }
      ],
       count: 0
      },
      growthCounter: 0, // new counter for snake growth
      growthRate: 5, // new growth rate for snake
      canvasSize: { width: 600, height: 600 },
      score: 0, // new score property
      xp: 0, // new xp property
      snakeLength: 0,
    };
  },
  mounted() {
    const canvas = this.$refs.gameCanvas;
    this.ctx = canvas.getContext('2d');
    this.drawTitle();
    this.drawSubtext();
    this.drawInstructions();
    window.addEventListener('keydown', this.handleKeyDownOnce);
    canvas.addEventListener('touchstart', this.handleTouchStartOnce);
    canvas.addEventListener('touchmove', this.handleTouchMove);
  },
  beforeDestroy() {
    clearInterval(this.gameLoop);
    window.removeEventListener('keydown', this.handleKeyDown);
  },
  methods: {
    handleTouchStartOnce(event) {
      event.preventDefault();
      this.startGame();
      window.removeEventListener('keydown', this.handleKeyDownOnce);
      window.removeEventListener('touchstart', this.handleTouchStartOnce);
      window.addEventListener('keydown', this.handleKeyDown);
      window.addEventListener('touchstart', this.handleTouchStart);
      window.addEventListener('touchmove', this.handleTouchMove);

      const touch = event.touches[0];
      this.touchStartX = touch.clientX;
      this.touchStartY = touch.clientY;
    },
    handleTouchStart(event) {
      event.preventDefault();

      const touch = event.touches[0];
      this.touchStartX = touch.clientX;
      this.touchStartY = touch.clientY;
    },
    handleTouchMove(event) {
      event.preventDefault();
      if (!this.touchStartX || !this.touchStartY) return;
      const touch = event.touches[0];
      const deltaX = touch.clientX - this.touchStartX;
      const deltaY = touch.clientY - this.touchStartY;
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0 && this.snake.direction !== 'LEFT') {
          this.snake.direction = 'RIGHT';
        }
        if (deltaX < 0 && this.snake.direction !== 'RIGHT') {
          this.snake.direction = 'LEFT';
        }
      } else {
        if (deltaY > 0 && this.snake.direction !== 'UP') {
          this.snake.direction = 'DOWN';
        }
        if (deltaY < 0 && this.snake.direction !== 'DOWN') {
          this.snake.direction = 'UP';
        }
      }
      this.touchStartX = null;
      this.touchStartY = null;
    },
    drawTitle() {
      this.ctx.font = 'bold 48px sans-serif';
      this.ctx.fillStyle = 'green';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('ResumeSnake', this.canvasSize.width / 2, 100);
    },
    drawSubtext() {
      this.ctx.font = '24px sans-serif';
      this.ctx.fillStyle = 'green';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('Use arrow keys to move', this.canvasSize.width / 2, 150);
    },
    drawInstructions() {
      this.ctx.font = '18px sans-serif';
      this.ctx.fillStyle = 'green';
      this.ctx.textAlign = 'left';
      this.ctx.fillText('Instructions:', 50, 200);
      this.ctx.fillText('Eat the role to grow your career.', 50, 230);
      this.ctx.fillText('Avoid hitting the walls or yourself', 50, 260);
    },
    handleKeyDownOnce(event) {
      if (event.key === 'ArrowUp' && this.snake.direction === 'NONE') {
        this.startGame();
        this.snake.direction = 'UP';
        window.removeEventListener('keydown', this.handleKeyDownOnce);
        window.addEventListener('keydown', this.handleKeyDown);
      }
      if (event.key === 'ArrowDown' && this.snake.direction === 'NONE') {

        this.startGame();
        this.snake.direction = 'DOWN';
        window.removeEventListener('keydown', this.handleKeyDownOnce);
        window.addEventListener('keydown', this.handleKeyDown);
      }
      if (event.key === 'ArrowLeft' && this.snake.direction === 'NONE') {
        this.startGame();
        this.snake.direction = 'LEFT';
        window.removeEventListener('keydown', this.handleKeyDownOnce);
        window.addEventListener('keydown', this.handleKeyDown);
      }
      if (event.key === 'ArrowRight' && this.snake.direction === 'NONE') {
        this.startGame();
        this.snake.direction = 'RIGHT';
        window.removeEventListener('keydown', this.handleKeyDownOnce);
        window.addEventListener('keydown', this.handleKeyDown);
      }
    },
    startGame() {
      this.gameLoop = setInterval(this.updateGame, 100);
    },
    generateFood() {
      this.food.count = this.food.count + 1
    },
    updateGame() {
      // Update snake position based on direction
      if(this.snake.direction === 'RIGHT') this.snake.position.x += 10;
      if(this.snake.direction === 'LEFT') this.snake.position.x -= 10;
      if(this.snake.direction === 'UP') this.snake.position.y -= 10;
      if(this.snake.direction === 'DOWN') this.snake.position.y += 10;

      // Add a new segment to the snake body at the new position
      this.snake.body.unshift({ x: this.snake.position.x, y: this.snake.position.y });

      if (!this.ctx) {
        const canvas = this.$refs.gameCanvas;
        this.ctx = canvas.getContext('2d');
      }
      // Check if the snake has collided with the food
      const foodBoundingBox = {
        x: this.food.nuggets[this.food.count].position.x,
        y: this.food.nuggets[this.food.count].position.y - 10, // Subtract 10 to account for font size
        width: this.ctx.measureText(this.food.nuggets[this.food.count].text).width,
        height: 10, // Use fixed height of 10 for font size
      };
      if (
        this.snake.position.x >= foodBoundingBox.x &&
        this.snake.position.x <= foodBoundingBox.x + foodBoundingBox.width &&
        this.snake.position.y >= foodBoundingBox.y &&
        this.snake.position.y <= foodBoundingBox.y + foodBoundingBox.height
      ) {
        // Generate a new food object
        this.score += 10; // increment score
        this.snakeLength = this.snake.body.length
        this.generateFood();
      } else {
        // If the snake hasn't collided with the food, remove the last segment of the snake body to maintain length
        this.snake.body.pop();
      }

      // Check for collisions with walls or itself
      if (
        this.snake.position.x < 0 ||
        this.snake.position.y < 0 ||
        this.snake.position.x >= this.canvasSize.width ||
        this.snake.position.y >= this.canvasSize.height ||
        this.snake.body.slice(1).some(segment => segment.x === this.snake.position.x && segment.y === this.snake.position.y)
      ) {
        this.resetGame();
      }
      if (this.snakeLength < 0) {
        this.snakeLength = 0
      }
      this.xp = (this.xp + 10)+(this.score * 100); // calculate xp
      // Draw game
      this.draw();
    },
    draw() {
      const canvas = this.$refs.gameCanvas;
      const ctx = canvas.getContext('2d');
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw snake
      this.ctx.fillStyle = 'green';
      this.snake.body.forEach(segment => {
        this.ctx.fillRect(segment.x, segment.y, 10, 10);
      });
      
      // Draw food
      this.ctx.fillStyle = 'red';
      this.ctx.fillText(this.food.nuggets[this.food.count].text, this.food.nuggets[this.food.count].position.x, this.food.nuggets[this.food.count].position.y);
    },
    handleKeyDown(event) {
      const { key } = event;
      if (key === 'ArrowUp' && this.snake.direction !== 'DOWN') this.snake.direction = 'UP';
      if (key === 'ArrowDown' && this.snake.direction !== 'UP') this.snake.direction = 'DOWN';
      if (key === 'ArrowLeft' && this.snake.direction !== 'RIGHT') this.snake.direction = 'LEFT';
      if (key === 'ArrowRight' && this.snake.direction !== 'LEFT') this.snake.direction = 'RIGHT';
    },
    resetGame() {
      this.snake.position = { x: 100, y: 50 };
      this.snake.body = [{ x: 100, y: 50 }, { x: 90, y: 50 }, { x: 80, y: 50 }];
      this.snake.direction = 'RIGHT';
      this.food.nuggets[this.food.count].position = { x: 200, y: 200 };
      this.food.count = 0;
      this.xp = 0;
      this.snakeLength = this.snake.body.length
      this.score = 0;
    },
  },
};
</script>


<style scoped>
#game-container {
  max-width: 100%;
  max-height: 100vh;
    /* display: flex;
    justify-content: center;
    align-items: center; */
    /* height: 100vh; */
    /* background-color: #f0f0f0; */
}

canvas {
    border: 2px solid #000;
    background-color: #fff;
}
body {
  overflow-y: hidden !important;
  
}
#score-container {
  position: relative;
  top: 0;
  left: 0;
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0.8);
}
</style>

