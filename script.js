const gameArea = document.getElementById('gameArea');
const ctx = gameArea.getContext('2d');
const startButton = document.getElementById('startGame');
const restartButton = document.getElementById('restartGame');
const scoreElement = document.getElementById('score');

const snakeSize = 20;
const gameWidth = gameArea.width;
const gameHeight = gameArea.height;
let snake;
let foodX;
let foodY;
let dx;
let dy;
let score;
let timeoutId;

function initGame() {
    snake = [{x: 160, y: 200}, {x: 140, y: 200}, {x: 120, y: 200}];
    dx = snakeSize;
    dy = 0;
    score = 0;
    updateScore(0);
    createFood();
    gameLoop();
}

function drawSnakePart(snakePart) {
    ctx.fillStyle = 'lightgreen';
    ctx.strokeStyle = 'darkgreen';
    ctx.fillRect(snakePart.x, snakePart.y, snakeSize, snakeSize);
    ctx.strokeRect(snakePart.x, snakePart.y, snakeSize, snakeSize);
}

function drawSnake() {
    snake.forEach(drawSnakePart);
}

function advanceSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);

    if (snake[0].x === foodX && snake[0].y === foodY) {
        score += 1;
        updateScore(score);
        createFood();
    } else {
        snake.pop();
    }
}

function clearCanvas() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, gameWidth, gameHeight);
}

function randomFood(min, max) {
    return Math.round((Math.random() * (max-min) + min) / snakeSize) * snakeSize;
}

function createFood() {
    while (true) {
        foodX = randomFood(0, gameWidth - snakeSize);
        foodY = randomFood(0, gameHeight - snakeSize);

        // detect if the food is on the snake
        let foodIsOnSnake = snake.some(segment => {
            return segment.x === foodX && segment.y === foodY;
        });

        // if the food is not on the snake, break the loop
        if (!foodIsOnSnake) {
            drawFood();
            break;
        }
    }
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(foodX, foodY, snakeSize, snakeSize);
}

function updateScore(newScore) {
    scoreElement.textContent = "Score: " + newScore;
}

function gameLoop() {
    if (didGameEnd()) {
        clearTimeout(timeoutId);
        restartButton.style.display = 'block'; // restart button
        return;
    }
    timeoutId = setTimeout(function onTick() {
        clearCanvas();
        drawSnake();
        advanceSnake();
        drawFood();
        gameLoop();
    }, 100);
}

function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode;
    const goingUp = dy === -snakeSize;
    const goingDown = dy === snakeSize;
    const goingRight = dx === snakeSize;
    const goingLeft = dx === -snakeSize;

    // prevent the browser from scrolling
    if ([LEFT_KEY, RIGHT_KEY, UP_KEY, DOWN_KEY].includes(keyPressed)) {
            event.preventDefault();
    }

    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -snakeSize;
        dy = 0;
    }

    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -snakeSize;
    }

    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = snakeSize;
        dy = 0;
    }

    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = snakeSize;
    }
}

function didGameEnd() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > gameWidth - snakeSize;
    const hitTopWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > gameHeight - snakeSize;
    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
}

startButton.addEventListener("click", function() {
    startButton.style.display = 'none';
    initGame();
});

restartButton.addEventListener("click", function() {
    restartButton.style.display = 'none';
    initGame();
});

document.addEventListener("keydown", changeDirection);
