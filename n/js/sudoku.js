const board = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

function initGame() {
    const gameBoard = document.getElementById('game-board');
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if (board[i][j] !== 0) {
                cell.textContent = board[i][j];
                cell.classList.add('preset');
            }
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', handleCellClick);
            gameBoard.appendChild(cell);
        }
    }
}

function handleCellClick(event) {
    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);
    const value = parseInt(prompt('Nhập số (1-9):'));
    if (isValidMove(row, col, value)) {
        event.target.textContent = value;
        board[row][col] = value;
        if (isSudokuSolved()) {
            alert('Chúc mừng! Bạn đã giải xong Sudoku!');
        }
    } else {
        alert('Không hợp lệ. Vui lòng nhập lại.');
    }
}

function isValidMove(row, col, value) {
    // Check row and column
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === value || board[i][col] === value) {
            return false;
        }
    }
    // Check 3x3 box
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (board[i][j] === value) {
                return false;
            }
        }
    }
    return true;
}

function isSudokuSolved() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === 0) {
                return false;
            }
        }
    }
    return true;
}

document.getElementById('restart-button').addEventListener('click', initGame);

initGame();
