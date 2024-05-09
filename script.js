const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');

const gridSize = 20; // Size of snake and food blocks
let snake = [{ x: 10, y: 10 }]; 
let food = {}; 
let dx = 1; // Initial horizontal movement 
let dy = 0; // No initial vertical movement
let score = 0;
let gameLoop; 

function generateFood() {
    food = {
        x: Math.floor(Math.random() * (canvas.width / gridSize)),
        y: Math.floor(Math.random() * (canvas.height / gridSize))
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

document.addEventListener('keydown', changeDirection);

generateFood();
gameLoop = setInterval(function() {
    draw();
    update();
}, 100); // Update every 100 ms
