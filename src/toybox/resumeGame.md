---
title: Resume Chat
icon: chat
article: false
headerDepth: 1
showInSidebar: false
sidebar: false
---

  <div id="game-container">
    <canvas ref="gameCanvas" width="800" height="600"></canvas>
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
      canvasSize: { width: 800, height: 600 },
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

      // Check if the snake has eaten the food
      if (this.snake.position.x === this.food.position.x && this.snake.position.y === this.food.position.y) {
        // Update food text or position as necessary
        this.food.position = { x: Math.floor(Math.random() * this.canvasSize.width), y: Math.floor(Math.random() * this.canvasSize.height) };
      } else {
        // If the snake hasn't eaten the food, remove the last segment of the snake body to maintain length
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
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f0f0;
}

canvas {
    border: 2px solid #000;
    background-color: #fff;
}

</style>

