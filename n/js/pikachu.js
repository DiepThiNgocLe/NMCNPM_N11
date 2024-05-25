const images = [
    './img/imgpikachu/th.jpg', './img/imgpikachu/th.jpg',
    './img/imgpikachu/th1.jpg', './img/imgpikachu/th1.jpg',
    './img/imgpikachu/th2.jpg', './img/imgpikachu/th2.jpg',
    './img/imgpikachu/th3.jpg', './img/imgpikachu/th3.jpg',
    './img/imgpikachu/th4.jpg', './img/imgpikachu/th4.jpg',
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function createCard(imageSrc) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `<img src="${imageSrc}" alt="Pikachu">`;
    card.addEventListener('click', flipCard);
    return card;
}

function setupBoard() {
    const gameBoard = document.getElementById('game-board');
    shuffle(images);
    images.forEach(image => {
        const card = createCard(image);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.innerHTML === secondCard.innerHTML;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

let matches = 0; // Số cặp hình đã ghép đúng
const totalMatches = images.length / 2; // Tổng số cặp hình
let timeRemaining = 60; // Thời gian đếm ngược
let timerInterval; // Biến lưu interval của đồng hồ đếm ngược

function startTimer() {
    const timerElement = document.getElementById('timer');
    timerElement.textContent = `Thời gian: ${timeRemaining}`;
    timerInterval = setInterval(() => {
        timeRemaining--;
        timerElement.textContent = `Thời gian: ${timeRemaining}`;
        if (timeRemaining === 0) {
            endGame(false);
        }
    }, 1000);
}

function endGame(won) {
    clearInterval(timerInterval);
    const winMessage = document.getElementById('win-message');
    winMessage.style.display = 'block';
    winMessage.textContent = won ? 'Bạn đã thắng!' : 'Hết thời gian!';
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => card.removeEventListener('click', flipCard));
    document.getElementById('restart-button').style.display = 'block';
}


function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    matches++;
    resetBoard();
    if (matches === totalMatches) {
        endGame(true);
    }
}

function setupBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = ''; // Xóa các thẻ trước đó
    shuffle(images);
    images.forEach(image => {
        const card = createCard(image);
        gameBoard.appendChild(card);
    });
    startTimer();
}



function restartGame() {
    matches = 0;
    timeRemaining = 60;
    document.getElementById('win-message').style.display = 'none';
    document.getElementById('restart-button').style.display = 'none';
    setupBoard();
}

document.getElementById('restart-button').addEventListener('click', restartGame);

setupBoard();
