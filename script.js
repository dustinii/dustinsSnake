const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables (cell size, board dimensions, etc.)
const cellSize = 10;
const widthInCells = canvas.width / cellSize;
const heightInCells = canvas.height / cellSize;

// Snake and food variables and logic
let snake = [];
let food = { x: 0, y: 0 };

// Game state variables
let direction = 'right';
let gameOver = false;

// Game loop function
function gameLoop() {
    // Clear the canvas before redrawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update snake position and check for collisions
    updateSnake();

    // Draw the snake and food
    drawSnake();
    drawFood();

    // Check for game over conditions
    checkGameOver();

    // Add logic for changing direction based on user input

    // Request animation frame for smooth animation
    if (!gameOver) {
        window.requestAnimationFrame(gameLoop);
    }
}

// Functions for snake movement, food placement, drawing, and collision detection

// Event listener for keyboard input to change direction

gameLoop(); // Start the game loop
