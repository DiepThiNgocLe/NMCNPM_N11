const boardSize = 10;
const mineCount = 10;
let board = [];
let revealedCount = 0;
let gameOver = false;

function initBoard() {
    board = [];
    revealedCount = 0;
    gameOver = false;
    document.getElementById('game-status').textContent = '';
    document.getElementById('minesweeper-board').innerHTML = '';

    for (let i = 0; i < boardSize; i++) {
        const row = [];
        for (let j = 0; j < boardSize; j++) {
            row.push({ mine: false, revealed: false, adjacentMines: 0 });
        }
        board.push(row);
    }

    placeMines();
    calculateAdjacentMines();
    renderBoard();
}

function placeMines() {
    let minesPlaced = 0;
    while (minesPlaced < mineCount) {
        const row = Math.floor(Math.random() * boardSize);
        const col = Math.floor(Math.random() * boardSize);
        if (!board[row][col].mine) {
            board[row][col].mine = true;
            minesPlaced++;
        }
    }
}

function calculateAdjacentMines() {
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            if (board[row][col].mine) continue;
            let adjacentMines = 0;
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    const newRow = row + i;
                    const newCol = col + j;
                    if (newRow >= 0 && newRow < boardSize && newCol >= 0 && newCol < boardSize && board[newRow][newCol].mine) {
                        adjacentMines++;
                    }
                }
            }
            board[row][col].adjacentMines = adjacentMines;
        }
    }
}

function renderBoard() {
    const boardElement = document.getElementById('minesweeper-board');
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', onCellClick);
            boardElement.appendChild(cell);
        }
    }
}

function onCellClick(event) {
    if (gameOver) return;
    const row = parseInt(event.target.dataset.row, 10);
    const col = parseInt(event.target.dataset.col, 10);
    revealCell(row, col);
    checkGameStatus();
}

function revealCell(row, col) {
    if (board[row][col].revealed || gameOver) return;
    board[row][col].revealed = true;
    const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
    cell.classList.add('revealed');
    if (board[row][col].mine) {
        cell.classList.add('mine');
        cell.textContent = '💣';
        gameOver = true;
        document.getElementById('game-status').textContent = 'Bạn thua rồi!';
        return;
    }
    revealedCount++;
    if (board[row][col].adjacentMines > 0) {
        cell.textContent = board[row][col].adjacentMines;
    } else {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const newRow = row + i;
                const newCol = col + j;
                if (newRow >= 0 && newRow < boardSize && newCol >= 0 && newCol < boardSize) {
                    revealCell(newRow, newCol);
                }
            }
        }
    }
}

function checkGameStatus() {
    if (revealedCount === boardSize * boardSize - mineCount) {
        gameOver = true;
        document.getElementById('game-status').textContent = 'Bạn đã thắng!';
    }
}

document.getElementById('restart-button').addEventListener('click', initBoard);

initBoard();
