---
title: Resume Chat
icon: chat
article: false
headerDepth: 1
showInSidebar: false
sidebar: false
---
<!DOCTYPE html>
<title>Multi-level Game</title>
<style>
body {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #000;
}

.game-level {
    width: 100%;
    height: 100%;
    position: absolute;
}

/* Add specific styles for each level if needed */
#level-1 {
    /* Specific styles for Pong Game */
    background-color: red; /* Example style */
}

#level-2 {
    display: none;
    /* Specific styles for Gorilla Game */
    background-color: green; /* Example style */
}

#level-3 {
    display: none;
    /* Specific styles for Snake Game */
    background-color: blue; /* Example style */
}
</style>

<div id="level-1" class="game-level">
    <!-- Pong Game Elements -->
    PONG GAME
</div>
<div id="level-2" class="game-level">
    <!-- Gorilla Game Elements -->
    GORILLA GAME
</div>
<div id="level-3" class="game-level">
    <!-- Snake Game Elements -->
    SNAKE GAME
</div>


<script>
export default {
  name: 'GameComponent',
  data() {
    return {
      currentLevel: 1,
      // Pong game variables
      canvas: null,
      ctx: null,
      ball: null,
      playerPaddle: null,
      computerPaddle: null,
      playerScore: 0,
      computerScore: 0,
    };
  },
  methods: {
    initPong() {
      this.canvas = this.$refs.canvas;
      this.ctx = this.canvas.getContext('2d');
      this.resetPong();
      this.animatePong();
      this.canvas.addEventListener('mousemove', this.handleMouseMove);
    },
    resetPong() {
      this.ball = { x: 150, y: 150, radius: 10, dx: 2, dy: 2 };
      this.playerPaddle = { x: 0, y: 140, width: 10, height: 60 };
      this.computerPaddle = { x: 290, y: 140, width: 10, height: 60 };
    },
    animatePong() {
      this.updatePong();
      this.drawPong();
      requestAnimationFrame(this.animatePong);
    },
    updatePong() {
      // Move ball
      this.ball.x += this.ball.dx;
      this.ball.y += this.ball.dy;

      // Ball wall collision
      if (this.ball.y + this.ball.radius > this.canvas.height || this.ball.y - this.ball.radius < 0) {
        this.ball.dy *= -1;
      }

      // Paddle collision
      if (
        (this.ball.dx < 0 && this.isColliding(this.ball, this.playerPaddle)) ||
        (this.ball.dx > 0 && this.isColliding(this.ball, this.computerPaddle))
      ) {
        this.ball.dx *= -1;
      }

      // Simple AI: Move computer paddle
      this.computerPaddle.y = this.ball.y - this.computerPaddle.height / 2;

      // Out of bounds (scoring)
      if (this.ball.x + this.ball.radius < 0) {
        this.computerScore += 1;
        this.resetPong();
      } else if (this.ball.x - this.ball.radius > this.canvas.width) {
          this.playerScore += 1;
          this.resetPong();
      }
    },
    drawPong() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = '#fff';
      this.ctx.fill();
      this.ctx.closePath();

      // Draw paddles
      [this.playerPaddle, this.computerPaddle].forEach(paddle => {
        this.ctx.beginPath();
        this.ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
        this.ctx.fillStyle = '#fff';
        this.ctx.fill();
        this.ctx.closePath();
      });
    },
    handleMouseMove(event) {
      const rect = this.canvas.getBoundingClientRect();
      this.playerPaddle.y = event.clientY - rect.top - this.playerPaddle.height / 2;
    },
    isColliding(ball, paddle) {
      // Find the closest point on the paddle to the ball
      const closestX = Math.clamp(ball.x, paddle.x, paddle.x + paddle.width);
      const closestY = Math.clamp(ball.y, paddle.y, paddle.y + paddle.height);

      // Calculate the distance between the ball's center and this closest point
      const distanceX = ball.x - closestX;
      const distanceY = ball.y - closestY;

      // If the distance is less than the ball's radius, they are colliding
      const distanceSquared = distanceX * distanceX + distanceY * distanceY;
      return distanceSquared < (ball.radius * ball.radius);
    },
    celebrateAndAdvance(callback) {
      // Show celebration animation...
      setTimeout(callback, 1000); // Example: execute the callback after 1 second
    },
    initGorilla() {
      this.currentLevel = 2;
      this.canvas.removeEventListener('mousemove', this.handleMouseMove);
      // Implement Gorilla game logic here
    },
    // ... Other methods remain the same
  },
  render(h) {
    return h('div', { class: 'game-level', style: { backgroundColor: this.currentLevelColors } }, [
        h('canvas', {
            ref: 'canvas',
            attrs: { width: 300, height: 300 },
        }),
        h('div', `${this.playerScore} - ${this.computerScore}`),
        h('div', this.currentLevelText),
    ]);
  },
  computed: {
    currentLevelColors() {
      const colors = ['red', 'green', 'blue'];
      return colors[this.currentLevel - 1] || 'black';
    },
    currentLevelText() {
      const texts = ['PONG GAME', 'GORILLA GAME', 'SNAKE GAME'];
      return texts[this.currentLevel - 1] || 'GAME OVER';
    }
  },
  mounted() {
    this.initPong();
  }
};
Math.clamp = function(value, min, max) {
    return Math.max(min, Math.min(value, max));
};
</script>

<style scoped>
.game-level {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex-direction: column;
}
canvas {
    border: 1px solid #fff;
}
</style>
