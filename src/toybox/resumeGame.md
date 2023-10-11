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
        body: [{ x: 100, y: 50 }, { x: 90, y: 50 }, { x: 80, y: 50 }],
        direction: 'RIGHT',
      },
      food: {
        position: { x: 200, y: 200 },
        text: 'Hello',
      },
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
        x: this.food.position.x,
        y: this.food.position.y - 10, // Subtract 10 to account for font size
        width: this.ctx.measureText(this.food.text).width,
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
      if (!this.ctx) {
        this.ctx = canvas.getContext('2d');
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw snake
      ctx.fillStyle = 'green';
      this.snake.body.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, 10, 10);
      });
      
      // Draw food
      ctx.fillStyle = 'red';
      ctx.fillText(this.food.text, this.food.position.x, this.food.position.y);
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
      this.food.position = { x: 200, y: 200 };
      this.food.text = 'Hello';
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

