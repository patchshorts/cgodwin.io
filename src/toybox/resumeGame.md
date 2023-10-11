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
  </div>


<script>
export default {
  data() {
    return {
      snake: {
        position: { x: 100, y: 50 },
        body: [{ x: 100, y: 50 }, { x: 90, y: 50 }, { x: 80, y: 50 }, { x: 70, y: 50 }],
        direction: 'RIGHT',
      },
      food: {
        nuggets: [
          {
              "position": { "x": 346, "y": 338 },
              "text": "Support Technician, Suddenlink"
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
              "position": { "x": 285, "y": 494 },
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
    };
  },
  mounted() {
    this.gameLoop = setInterval(this.updateGame, 100);
    window.addEventListener('keydown', this.handleKeyDown);
  },
  beforeDestroy() {
    clearInterval(this.gameLoop);
    window.removeEventListener('keydown', this.handleKeyDown);
  },
  methods: {
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

      // Draw game
      this.draw();
    },
    draw() {
      const canvas = this.$refs.gameCanvas;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw snake
      ctx.fillStyle = 'green';
      this.snake.body.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, 10, 10);
      });
      
      // Draw food
      ctx.fillStyle = 'red';
      ctx.fillText(this.food.nuggets[this.food.count].text, this.food.nuggets[this.food.count].position.x, this.food.nuggets[this.food.count].position.y);
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

</style>

