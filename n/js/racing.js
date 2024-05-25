let car;
let road;
let score;
let gameInterval;
let isGameOver;

function startGame() {
    isGameOver = false;
    score = 0;
    document.getElementById('score').textContent = score;

    car = document.getElementById('car');
    road = document.getElementById('road');

    document.addEventListener('keydown', moveCar);

    gameInterval = setInterval(updateGame, 20);
}

function updateGame() {
    if (isGameOver) return;

    score++;
    document.getElementById('score').textContent = score;

    if (score % 100 === 0) {
        road.style.animationDuration = `${parseFloat(window.getComputedStyle(road).animationDuration) - 0.1}s`;
    }
}

function moveCar(event) {
    const carLeft = parseInt(window.getComputedStyle(car).left);
    if (event.key === 'ArrowLeft' && carLeft > 0) {
        car.style.left = `${carLeft - 5}px`;
    } else if (event.key === 'ArrowRight' && carLeft < 350) {
        car.style.left = `${carLeft + 5}px`;
    }
}

document.getElementById('start-button').addEventListener('click', startGame);

startGame();
