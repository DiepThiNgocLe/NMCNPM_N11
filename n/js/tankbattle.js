let playerTank;
let bullets = [];
let obstacles = [];

function initGame() {
    createPlayerTank();
    createObstacles();
    document.addEventListener('keydown', handleKeyDown);
    setInterval(updateGame, 20);
}

function createPlayerTank() {
    playerTank = createTank(50, 200, true);
}

function createTank(x, y, isPlayer) {
    const tank = document.createElement('div');
    tank.classList.add('tank');
    if (isPlayer) {
        tank.classList.add('player-tank');
    }
    tank.style.left = `${x}px`;
    tank.style.top = `${y}px`;
    document.getElementById('game-container').appendChild(tank);
    return tank;
}

function createBullet(x, y, direction) {
    const bullet = document.createElement('div');
    bullet.classList.add('bullet');
    bullet.style.left = `${x}px`;
    bullet.style.top = `${y}px`;
    bullet.direction = direction;
    document.getElementById('game-container').appendChild(bullet);
    bullets.push(bullet);
}

function createObstacles() {
    for (let i = 0; i < 5; i++) {
        const x = Math.random() * 550;
        const y = Math.random() * 350;
        const obstacle = document.createElement('div');
        obstacle.classList.add('obstacle');
        obstacle.style.left = `${x}px`;
        obstacle.style.top = `${y}px`;
        document.getElementById('game-container').appendChild(obstacle);
        obstacles.push(obstacle);
    }
}

function handleKeyDown(event) {
    switch (event.key) {
        case 'ArrowUp':
            moveTank(playerTank, 'up');
            break;
        case 'ArrowDown':
            moveTank(playerTank, 'down');
            break;
        case 'Enter':
            shoot();
            break;
    }
}

function moveTank(tank, direction) {
    const gameContainer = document.getElementById('game-container');
    const tankRect = tank.getBoundingClientRect();
    const gameRect = gameContainer.getBoundingClientRect();

    if (direction === 'up' && tankRect.top > gameRect.top) {
        tank.style.top = `${parseInt(tank.style.top) - 5}px`;
    } else if (direction === 'down' && tankRect.bottom < gameRect.bottom) {
        tank.style.top = `${parseInt(tank.style.top) + 5}px`;
    }
}

function shoot() {
    const tankRect = playerTank.getBoundingClientRect();
    const bulletX = parseInt(tankRect.left) + 50;
    const bulletY = parseInt(tankRect.top) + 25;
    createBullet(bulletX, bulletY, 'right');
}

function updateGame() {
    moveBullets();
    checkBulletCollision();
}

function moveBullets() {
    bullets.forEach(bullet => {
        if (bullet.direction === 'right') {
            bullet.style.left = `${parseInt(bullet.style.left) + 5}px`;
        }
    });
}

function checkBulletCollision() {
    bullets.forEach(bullet => {
        const bulletRect = bullet.getBoundingClientRect();
        obstacles.forEach(obstacle => {
            const obstacleRect = obstacle.getBoundingClientRect();
            if (collisionDetected(bulletRect, obstacleRect)) {
                bullet.remove();
                obstacle.remove();
            }
        });
    });
}

function collisionDetected(rect1, rect2) {
    return !(rect1.right < rect2.left || 
             rect1.left > rect2.right || 
             rect1.bottom < rect2.top || 
             rect1.top > rect2.bottom);
}

initGame();
