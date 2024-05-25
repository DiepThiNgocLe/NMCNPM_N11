let board = [];
const boardSize = 4;

function initGame() {
    board = Array.from({ length: boardSize }, () => Array(boardSize).fill(0));
    addRandomTile();
    addRandomTile();
    updateBoard();
}

function addRandomTile() {
    const availableCells = [];
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            if (board[row][col] === 0) {
                availableCells.push({ row, col });
            }
        }
    }
    if (availableCells.length > 0) {
        const { row, col } = availableCells[Math.floor(Math.random() * availableCells.length)];
        board[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
}

function updateBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            tile.textContent = board[row][col] === 0 ? '' : board[row][col];
            tile.style.backgroundColor = getTileColor(board[row][col]);
            tile.style.color = getTileTextColor(board[row][col]);
            gameBoard.appendChild(tile);
        }
    }
}

function getTileColor(value) {
    const colors = {
        0: '#cdc1b4',
        2: '#eee4da',
        4: '#ede0c8',
        8: '#f2b179',
        16: '#f59563',
        32: '#f67c5f',
        64: '#f65e3b',
        128: '#edcf72',
        256: '#edcc61',
        512: '#edc850',
        1024: '#edc53f',
        2048: '#edc22e',
        default: '#3c3a32'
    };
    return colors[value] || colors.default;
}

function getTileTextColor(value) {
    return value <= 4 ? '#776e65' : '#f9f6f2';
}

document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event) {
    let moved = false;
    switch (event.key) {
        case 'ArrowUp':
            moved = moveUp();
            break;
        case 'ArrowDown':
            moved = moveDown();
            break;
        case 'ArrowLeft':
            moved = moveLeft();
            break;
        case 'ArrowRight':
            moved = moveRight();
            break;
    }
    if (moved) {
        addRandomTile();
        updateBoard();
        if (checkGameOver()) {
            showGameOverMessage();
        }
    }
}

function moveUp() {
    let moved = false;
    for (let col = 0; col < boardSize; col++) {
        for (let row = 1; row < boardSize; row++) {
            if (board[row][col] !== 0) {
                let newRow = row;
                while (newRow > 0 && board[newRow - 1][col] === 0) {
                    newRow--;
                }
                if (newRow !== row) {
                    board[newRow][col] = board[row][col];
                    board[row][col] = 0;
                    moved = true;
                }
                if (newRow > 0 && board[newRow - 1][col] === board[newRow][col]) {
                    board[newRow - 1][col] *= 2;
                    board[newRow][col] = 0;
                    moved = true;
                }
            }
        }
    }
    return moved;
}

function moveDown() {
    let moved = false;
    for (let col = 0; col < boardSize; col++) {
        for (let row = boardSize - 2; row >= 0; row--) {
            if (board[row][col] !== 0) {
                let newRow = row;
                while (newRow < boardSize - 1 && board[newRow + 1][col] === 0) {
                    newRow++;
                }
                if (newRow !== row) {
                    board[newRow][col] = board[row][col];
                    board[row][col] = 0;
                    moved = true;
                }
                if (newRow < boardSize - 1 && board[newRow + 1][col] === board[newRow][col]) {
                    board[newRow + 1][col] *= 2;
                    board[newRow][col] = 0;
                    moved = true;
                }
            }
        }
    }
    return moved;
}

function moveLeft() {
    let moved = false;
    for (let row = 0; row < boardSize; row++) {
        for (let col = 1; col < boardSize; col++) {
            if (board[row][col] !== 0) {
                let newCol = col;
                while (newCol > 0 && board[row][newCol - 1] === 0) {
                    newCol--;
                }
                if (newCol !== col) {
                    board[row][newCol] = board[row][col];
                    board[row][col] = 0;
                    moved = true;
                }
                if (newCol > 0 && board[row][newCol - 1] === board[row][newCol]) {
                    board[row][newCol - 1] *= 2;
                    board[row][newCol] = 0;
                    moved = true;
                }
            }
        }
    }
    return moved;
}

function moveRight() {
    let moved = false;
    for (let row = 0; row < boardSize; row++) {
        for (let col = boardSize - 2; col >= 0; col--) {
            if (board[row][col] !== 0) {
                let newCol = col;
                while (newCol < boardSize - 1 && board[row][newCol + 1] === 0) {
                    newCol++;
                }
                if (newCol !== col) {
                    board[row][newCol] = board[row][col];
                    board[row][col] = 0;
                    moved = true;
                }
                if (newCol < boardSize - 1 && board[row][newCol + 1] === board[row][newCol]) {
                    board[row][newCol + 1] *= 2;
                    board[row][newCol] = 0;
                    moved = true;
                }
            }
        }
    }
    return moved;
}

function checkGameOver() {
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            if (board[row][col] === 0) return false;
            if (row > 0 && board[row][col] === board[row - 1][col]) return false;
            if (row < boardSize - 1 && board[row][col] === board[row + 1][col]) return false;
            if (col > 0 && board[row][col] === board[row][col - 1]) return false;
            if (col < boardSize - 1 && board[row][col] === board[row][col + 1]) return false;
        }
    }
    return true;
}

function showGameOverMessage() {
    alert("Game Over!");
}

initGame();
