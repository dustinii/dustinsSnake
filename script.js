const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const startButton = document.getElementById('startButton');

const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = {};
let dx = 1;
let dy = 0;
let score = 0;
let gameSpeed = 100;
let gameLoop;
let isGameOver = false;  

function generateFood() {
  // Ensure food doesn't spawn on the snake
  let validPosition = false;
  while (!validPosition) {
    food = {
      x: Math.floor(Math.random() * (canvas.width / gridSize)),
      y: Math.floor(Math.random() * (canvas.height / gridSize))
    };
    validPosition = snake.every(segment => segment.x !== food.x || segment.y !== food.y);
  }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? 'green' : 'lime';
        ctx.fillRect(snake[i].x * gridSize, snake[i].y * gridSize, gridSize, gridSize);
    }

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

function update() {
    // Check for collisions (walls, self)
    checkCollisions();

    // Move snake
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    // Did snake eat food?
    const didEatFood = snake[0].x === food.x && snake[0].y === food.y;
    if (didEatFood) {
        score++;
        scoreDisplay.textContent = score;
        generateFood();
    } else {
        snake.pop(); 
    }
}

function checkCollisions() {
    const head = snake[0];

    // Wall collisions
    if (head.x < 0 || head.x >= canvas.width / gridSize || head.y < 0 || head.y >= canvas.height / gridSize) {
        gameOver();
    }

    // Self-collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
        }
    }
}

function startGame() {
  snake = [{ x: 10, y: 10 }];
  dx = 1; dy = 0;
  score = 0;
  scoreDisplay.textContent = score;
  isGameOver = false;
  generateFood();
  gameLoop = setInterval(function() {
    draw();
    update();
  }, gameSpeed);
}

function gameOver() {
    clearInterval(gameLoop);
    alert("Game Over! Your score was " + score);
}

function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    // Prevent opposite direction 
    const goingUp = dy === -1;
    const goingDown = dy === 1;
    const goingRight = dx === 1;
    const goingLeft = dx === -1;

    if (event.keyCode === LEFT_KEY && !goingRight) { dx = -1; dy = 0; }
    if (event.keyCode === RIGHT_KEY && !goingLeft) { dx = 1; dy = 0; }
    if (event.keyCode === UP_KEY && !goingDown) { dx = 0; dy = -1; }
    if (event.keyCode === DOWN_KEY && !goingUp) { dx = 0; dy = 1; }
}

function increaseSpeed() {
  if (gameSpeed > 50) { // Limit maximum speed
    gameSpeed -= 5;
    clearInterval(gameLoop);
    gameLoop = setInterval(function() {
      draw();
      update();
    }, gameSpeed);
  }
}

generateFood();
gameLoop = setInterval(function() {
    draw();
    update();
}, 100); // Update every 100 ms

document.addEventListener('keydown', changeDirection);
startButton.addEventListener('click', startGame);
document.addEventListener('keydown', changeDirection);
