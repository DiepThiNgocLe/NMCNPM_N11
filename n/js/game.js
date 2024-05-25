// 21130440_NguyenThanhLuu_0866430732_DH21DTC
//          Nguyễn Thanh Lưu

const cvs = document.getElementById("gameview");
const ctx = cvs.getContext("2d");

const WIN = new Audio();
WIN.src = "./music/game-win.wav"

const LOSE = new Audio();
LOSE.src = "./music/game-lose.wav"

const HIT = new Audio();
HIT.src = "./music/hit.wav"

const BANNER = new Image();
BANNER.src = "./img/wraper.jpg";

const CROSSBAR_IMG = new Image();
CROSSBAR_IMG.src = "./img/crossbar.jpg";

const HODEN_IMG = new Image();
HODEN_IMG.src = "./img/HoDen.jpg";

const BOSS_IMG = new Image();
BOSS_IMG.src = "./img/boss.jpg";

const SOUND_IMG = new Image();
SOUND_IMG.src = "./img/sound.svg";

const BRICK_IMG = new Image();
BRICK_IMG.src = "./img/brick.jpg";

const SCORE_IMG = new Image();
SCORE_IMG.src = "./img/score.svg";

const LEVEL_IMG = new Image();
LEVEL_IMG.src = "./img/level.svg";

const LIFE_IMG = new Image();
LIFE_IMG.src = "./img/life.svg";

const CROSSBAR_WIDTH = 120;
const CROSSBAR_HEIGHT = 20;
const CROSSBAR_MARGIN_BOTTOM = 20;
const BALL_RADIUS = 10;
let DIEM = 0;
const SCORE = 10;
const LEVEL_MAX = 6;
let LEVEL = 1;
let HEART = 5;
let turnLeft = false;
let turnRight = false;

//Thanh đỡ bóng
const crossbar = {
    x: cvs.width / 2 - CROSSBAR_WIDTH / 2,
    y: cvs.height - CROSSBAR_MARGIN_BOTTOM - CROSSBAR_HEIGHT,
    width: CROSSBAR_WIDTH,
    height: CROSSBAR_HEIGHT,
    dx: 10
}

function drawCrossBar() {
    ctx.fillStyle = "#2e3548";
    ctx.fillRect(crossbar.x, crossbar.y, crossbar.width, crossbar.height);
    ctx.drawImage(CROSSBAR_IMG, crossbar.x, crossbar.y, 120, 20);
    ctx.strokeStyle = "black";
    ctx.strokeRect(crossbar.x, crossbar.y, crossbar.width, crossbar.height);
    if (LEVEL === 3) {
        drawReboundBars();
    }

}


// Quả bóng

const ball = {
    x: cvs.width / 2,
    y: crossbar.y - BALL_RADIUS,
    radius: BALL_RADIUS,
    speed: 6,
    dx: 3,
    dy: -3
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
}
// Hàm tạo vô số cầu
// const circle = {
//     x: cvs.width / 2,
//     y: crossbar.y - BALL_RADIUS,
//     radius: BALL_RADIUS,
//     speed: 6,
//     dx:  2,
//     dy: -2
// }

function drawCircle() {
    circles.forEach(circle => {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
        ctx.fillStyle = "yellow";
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.stroke();
    });
}

let circles = [];

function initCircles() {
    circles = [
        { x: cvs.width / 2, y: crossbar.y - BALL_RADIUS, radius: BALL_RADIUS, speed: 6, dx: 3, dy: -3 },
        { x: cvs.width / 2, y: crossbar.y - BALL_RADIUS, radius: BALL_RADIUS, speed: 8, dx: -2, dy: -4 },
        { x: cvs.width / 2, y: crossbar.y - BALL_RADIUS, radius: BALL_RADIUS, speed: 5, dx: 1, dy: -5 }
        // Thêm các quả bóng khác ở đây nếu cần
    ];
}

initCircles();

function moveCricle() {
    circles.forEach(circle => {
        circle.x += circle.dx;
        circle.y += circle.dy;
    });
}

function resetCircle() {
    circles.forEach(circle => {
        circle.x = cvs.width / 2; // Đặt lại tọa độ x
        circle.y = crossbar.y - BALL_RADIUS; // Đặt lại tọa độ y
        circle.dx = Math.random() > 0.5 ? circle.dx : -circle.dx; // Ngẫu nhiên chọn hướng di chuyển ngang
        circle.dy = -Math.abs(circle.dy); // Đặt lại hướng di chuyển dọc
    });
}

function checkCircleWall() {
    if (circles.x + circles.radius > cvs.width || circles.x - circles.radius < 0) {
        circles.dx = -circles.dx;

    }
    if (circles.y - circles.radius < 0) {
        circles.dy = -circles.dy;
    }
    if (circles.y + circles.radius > cvs.height) {
        HEART--;
        resetCircle();
        // if (HEART <= 0) {
        //     checkGameOver();

        // }
    }
}

// Gạch
const brick = {
    row: 1,
    collumn: 12,
    width: 55,
    height: 20,
    paddingLeft: 40,
    paddingTop: 20,
    marginTop: 60,
    colorBrick: "Black"
}
let bricks = [];


function createBrick() {
    for (let r = 0; r < brick.row; r++) {
        bricks[r] = [];
        for (let c = 0; c < brick.collumn; c++) {
            bricks[r][c] = {
                x: c * (brick.paddingLeft + brick.width) + brick.paddingLeft,
                y: r * (brick.paddingTop + brick.height) + brick.paddingTop + brick.marginTop,
                status: true
            }
        }
    }

}


function drawBricks() {
    for (let r = 0; r < brick.row; r++) {
        for (let c = 0; c < brick.collumn; c++) {
            let b = bricks[r][c];

            if (bricks[r][c].status) {
                ctx.fillStyle = brick.colorBrick;
                ctx.fillRect(b.x, b.y, brick.width, brick.height);
                ctx.drawImage(BRICK_IMG, b.x, b.y, 55, 20);
                ctx.strokeStyle = "black";
                ctx.strokeRect(b.x, b.y, brick.width, brick.height);
            } else {
                // let circleProps = {
                //     x: b.x + brick.width / 2,
                //     y: b.y + brick.height / 2,
                //     radius: BALL_RADIUS,
                //     fillColor: "black",
                //     strokeColor: "black"        
                // };

                //     ctx.beginPath();
                //     ctx.arc(circleProps.x, circleProps.y, circleProps.radius, 0, 2 * Math.PI);
                //     ctx.fillStyle = circleProps.fillColor;
                //     ctx.fill();
                //     ctx.strokeStyle = circleProps.strokeColor;
                //     ctx.stroke();                           

                // ctx.beginPath();
                // ctx.arc(b.x + brick.width / 2, b.y + brick.height / 2, BALL_RADIUS, 0, 2 * Math.PI);
                // ctx.fillStyle = "black";
                // ctx.fill();
                // ctx.strokeStyle = "black";
                // ctx.stroke();

            }
        }
    }
}


// Hàm tạo boom từ viên gạch biến mất    
// function moveBlackCircles() {
//     for (let r = 0; r < brick.row; r++) {
//         for (let c = 0; c < brick.collumn; c++) {
//             let b = bricks[r][c];
//             if (!b.status) {

//                 // Tự động di chuyển hình tròn màu đen
//                 b.y += 1; // Thay đổi tốc độ di chuyển tại đây
//                 // Kiểm tra nếu hình tròn màu đen ra khỏi canvas thì gán lại status là false
//                 if (b.y > cvs.height) {
//                     b.status = false;
//                 }
//                 if (
//                     b.x + BALL_RADIUS > crossbar.x &&
//                     b.x - BALL_RADIUS < crossbar.x + crossbar.width &&
//                     b.y + BALL_RADIUS > crossbar.y
//                 ) {
//                    b.status = true;
//                 //     if (!heartReduced) {    
//                 //         b.y +=10;

//                 //         heartReduced = true; // Đã giảm heart, không cần giảm nữa
//                 //     }
//                 // } else {
//                 //     heartReduced = false; // Reset biến để cho phép giảm heart tiếp theo
//                 }

//             }
//         }
//     }
// }

// function checkBallCrossBarCollision() {
//     if (
//         ball.x + ball.radius > crossbar.x &&
//         ball.x - ball.radius < crossbar.x + crossbar.width &&
//         ball.y + ball.radius > crossbar.y &&
//         ball.y - ball.radius < crossbar.y + crossbar.height
//     ) {
//         HEART--; // Giảm số lượng heart
//     }
// }






// function drawBricks() {
//     for (let r = 0; r < brick.row; r++) {
//         for (let c = 0; c < brick.collumn; c++) {
//             let b = bricks[r][c];
//             if (bricks[r][c].status) {
//                 ctx.fillStyle = brick.colorBrick;
//                 ctx.fillRect(b.x, b.y, brick.width, brick.height);
//                 ctx.drawImage(BRICK_IMG, b.x, b.y, 55, 20);
//                 ctx.strokeStyle = "black";
//                 ctx.strokeRect(b.x, b.y, brick.width, brick.height);
//             }

//             else { 
//                 let circle1 = drawCircleAtPosition(b.x + brick.width / 2, b.y + brick.height / 2);
//                 // Cập nhật thông tin về hình tròn vào mảng bricks để có thể sử dụng trong các vòng lặp tiếp theo
//                 // bricks[r][c] = circle1;
//             }

//             //  else { // Nếu status là false, vẽ một quả cầu ở vị trí của viên gạch với tốc độ 1
//             //     let temp = (1200-55*12)/8                
//             //     let circle1 = drawCircleAtPosition(c*55/2+(c+1)*temp,85 );
//             // //     // Cập nhật thông tin về hình tròn vào mảng bricks để có thể sử dụng trong các vòng lặp tiếp theo
//             //     bricks[r][c] = circle1;
//             // }

//         }
//     }
// }


// function drawCircleAtPosition(x, y) {
//     const circle1 = {
//         x: x,
//         y: y,
//         radius: BALL_RADIUS,
//         dx: 0, // Đặt tốc độ ban đầu của hình tròn khi rơi xuống
//         dy: 2, // Đặt tốc độ ban đầu của hình tròn khi rơi xuống
//     }; 
//     ctx.beginPath();
//     ctx.arc(circle1.x, circle1.y, circle1.radius, 0, 2 * Math.PI);
//     ctx.fillStyle = "black";
//     ctx.fill();
//     ctx.strokeStyle = "black";
//     ctx.stroke();

//     circle1.y += circle1.dy;

//     // Trả về thông tin về hình tròn để có thể sử dụng trong các vòng lặp tiếp theo
//     return circle1;
// }

// function moveCircle1() {
//     // Di chuyển hình tròn theo tốc độ đã được đặt trong các thuộc tính dx và dy của mỗi hình tròn
//     circles.forEach(circle => {
//         circle.x += circle.dx;
//         circle.y += circle.dy;
//     });
// }

createBrick();


// sự kiện di chuyển thanh đỡ bóng
document.addEventListener("keydown", function (event) {
    if (event.keyCode == 37) {
        turnLeft = true;
    } else if (event.keyCode == 39) {
        turnRight = true;
    }

});


document.addEventListener("keyup", function (event) {
    if (event.keyCode == 37) {
        turnLeft = false;
    } else if (event.keyCode == 39) {
        turnRight = false;
    }

});

// document.addEventListener("mousemove", function(event) {
//     if (crossbar.x > 10 && crossbar.x + crossbar.width < cvs.width +10) {
//         crossbar.x = event.clientX - 300;
//     }
// });




function moveCrossBar() {
    if (turnLeft && crossbar.x > 0) {
        crossbar.x -= crossbar.dx;
    } else if (turnRight && (crossbar.x + crossbar.width) < cvs.width) {
        crossbar.x += crossbar.dx;
    }
}

//sự kiện di chuyển  bóng
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;
}

function checkBallWall() {
    if (ball.x + ball.radius > cvs.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;

    }
    if (ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    }
    if (ball.y + ball.radius > cvs.height) {
        HEART--;
        resetBall();

    }
    // if (
    //     ball.x < crossbar.x + crossbar.width &&
    //     ball.x > crossbar.x &&
    //     ball.y + ball.radius > crossbar.y
    // ) {
    //     HEART--; // Giảm 1 heart
    //     resetBall(); // Đặt lại vị trí của quả bóng
    // }
}
let GAME_OVER = false;

function checkGameOver() {

    if (HEART <= 0) {
        showGameOver();
        GAME_OVER = true;
        LOSE.play();
    }

}

function checkCrossBarWall() {
    if (ball.x < crossbar.x + crossbar.width && ball.y < crossbar.y + crossbar.height &&
        ball.x > crossbar.x && ball.y > crossbar.y - BALL_RADIUS) {


        let touchPoint = ball.x - (crossbar.x + crossbar.width / 2);


        touchPoint = touchPoint / (crossbar.width / 2);
        let angle = touchPoint * Math.PI / 3;

        ball.dx = ball.speed * Math.sin(angle);
        ball.dy = -ball.speed * Math.cos(angle);

    }
}

// Sự kiện chạm bóng và gạch
let brickHitTimeout;
function checkBallBrick() {
    for (let r = 0; r < brick.row; r++) {

        for (let c = 0; c < brick.collumn; c++) {
            let b = bricks[r][c];
            if (b.status) {

                if (ball.x + ball.radius > b.x &&
                    ball.x - ball.radius < b.x + brick.width &&
                    ball.y + ball.radius > b.y &&
                    ball.y - ball.radius < b.y + brick.height) {
                    HIT.play();
                    b.status = false;
                    DIEM += SCORE;
                    ball.dy = -ball.dy;
                    console.log(DIEM);
                    if (LEVEL === 6) {
                        if (boosHeart <= 0) {
                            clearTimeout(brickHitTimeout);
                        } else {
                            brickHitTimeout = setTimeout(function () {
                                b.status = true;
                            }, 5000);
                        }
                    }
                }
            }

        }
    }
}


function showDiem() {
    ctx.fillStyle = "#DCC50F";
    ctx.fillText(DIEM, 110, 30);
    ctx.font = "20px Verdana";
}
// const cvsScore = document.getElementsByName(flag);

function showLevel() {
    ctx.fillStyle = "#DCC50F";
    ctx.fillText(LEVEL, 260, 30);
    ctx.font = "20px Verdana";
    ctx.fillText("/" + 6, 272, 30);
}

function showMang() {
    ctx.fillStyle = "#B50606";
    ctx.fillText(HEART, 400, 30);
    ctx.font = "20px Verdana";
}

function resetBall() {
    ball.x = cvs.width / 2;
    ball.y = crossbar.y - BALL_RADIUS;
    ball.dx = 3 * (Math.random() * 2 - 1);
    ball.dy = -3;
}

let currentLevel = 1;
function checkQuaMan() {
    let lvUp = true;
    for (let r = 0; r < brick.row; r++) {
        for (let c = 0; c < brick.collumn; c++) {
            lvUp = lvUp && !bricks[r][c].status;
        }
    }
    if (lvUp) {
        if (LEVEL > LEVEL_MAX) {
            showWin()
            WIN.play();
            GAME_OVER = true;
            return;
        }
        currentLevel++; // Tăng màn chơi lên một
        switch (currentLevel) { // Chuyển đổi sang màn chơi tiếp theo
            case 2:
                level2();
                break;
            case 3:
                level3();
                break;
            case 4:
                level4();
                break;
            case 5:
                level5();
                break;
            case 6:
                level6();
                break;
            default:
                break;
        }
        // ball.speed += 1;
    }
}

// hàm di chuyển gạch
let brickDirection = 1; // 1: di chuyển sang phải, -1: di chuyển sang trái
function moveBricks() {
    if (LEVEL === 2 || LEVEL === 3 || LEVEL === 4 || LEVEL === 5 || LEVEL === 6) {
        for (let r = 0; r < brick.row; r++) {
            for (let c = 0; c < brick.collumn; c++) {
                let b = bricks[r][c];
                if (b.status) {
                    b.x += brickDirection;
                    // đảo hướng khi chạm viền
                    if (b.x <= 0 || b.x + brick.width >= cvs.width) {
                        brickDirection *= -1;
                    }
                }
            }
        }
    }
}

// Chọn các level
const lv1 = document.getElementById('lv1');
lv1.addEventListener('click', level1);

function level1() {
    LEVEL = 1;
    brick.row = 1;
    createBrick();
    resetBall();
    resetGame();

}
// level 2
const lv2 = document.getElementById('lv2');
lv2.addEventListener('click', level2);

function level2() {
    LEVEL = 2;
    brick.row = 2;
    createBrick();
    resetBall();
    resetGame();

}
//level 3
const lv3 = document.getElementById('lv3');
lv3.addEventListener('click', level3);

function level3() {
    LEVEL = 3;
    brick.row = 4;
    createBrick();
    resetBall();
    resetGame();
    ball.speed = 7;
}
// Thanh chắn level = 3

const reboundBars = [
    { x: cvs.width / 2 - CROSSBAR_WIDTH / 2, y: cvs.height / 2, width: CROSSBAR_WIDTH, height: CROSSBAR_HEIGHT },
    { x: 3 * cvs.width / 4 - CROSSBAR_WIDTH / 2, y: cvs.height/ 1.5, width: CROSSBAR_WIDTH, height: CROSSBAR_HEIGHT },
    { x: cvs.width / 4 - CROSSBAR_HEIGHT / 2, y: cvs.height / 2 - CROSSBAR_WIDTH / 2, width: CROSSBAR_HEIGHT, height: CROSSBAR_WIDTH },
    { x: 3 * cvs.width / 4 - CROSSBAR_HEIGHT / 4, y: cvs.height/ 4  - CROSSBAR_WIDTH / 2, width: CROSSBAR_HEIGHT, height: CROSSBAR_WIDTH }
];

function drawReboundBars() {
    reboundBars.forEach(bar => {
        ctx.fillStyle = "#2e3548";
        ctx.fillRect(bar.x, bar.y, bar.width, bar.height);
        ctx.drawImage(CROSSBAR_IMG, bar.x, bar.y, bar.width, bar.height);
        ctx.strokeStyle = "black";
        ctx.strokeRect(bar.x, bar.y, bar.width, bar.height);
    });
}

function checkBallReboundBars() {
    reboundBars.forEach(bar => {
        if (ball.x + ball.radius > bar.x && ball.x - ball.radius < bar.x + bar.width &&
            ball.y + ball.radius > bar.y && ball.y - ball.radius < bar.y + bar.height) {
            let touchPoint;
            if (bar.width > bar.height) {
                touchPoint = ball.y - (bar.y + bar.height / 2);
                touchPoint = touchPoint / (bar.height / 2);
            } else {
                touchPoint = ball.x - (bar.x + bar.width / 2);
                touchPoint = touchPoint / (bar.width / 2);
            }
            let angle = touchPoint * Math.PI / 3;
            ball.dx = ball.speed * Math.sin(angle);
            ball.dy = -ball.speed * Math.cos(angle);
        }
    });
}

// Level = 4

const lv4 = document.getElementById('lv4');
lv4.addEventListener('click', level4);

function level4() {
    LEVEL = 4;
    brick.row = 3;
    createBrick();
    resetBall();
    resetGame();
    ball.speed = 7;
    // resetCircle();
}

//level 5
const lv5 = document.getElementById('lv5');
lv5.addEventListener('click', level5);

function level5() {
    LEVEL = 5;
    brick.row = 4;
    createBrick();
    resetBall();
    resetGame();
    ball.speed = 9;
}
// level 6
const lv6 = document.getElementById('lv6');
lv6.addEventListener('click', level6);

function level6() {
    LEVEL = 6;
    brick.row = 4;
    createBrick();
    resetBall();
    resetGame();
    ball.speed = 7;
}

function resetGame() {
    DIEM = 0;
    HEART = 5;
    boosHeart = 5;
    ball.speed = 4 + LEVEL; // Cập nhật tốc độ của quả bóng dựa trên level
    resetBall();
    createBrick();
}

const notiGame = document.getElementById("noti-game");
const notiWin = document.getElementById("noti-win");
const notiGameOver = document.getElementById("noti-gameover");
const playAgain = document.getElementById("play-again");
// const startButton = document.getElementById('startButton');

function showWin() {
    notiGame.style.display = "block";
    notiWin.style.display = "block";
}

function showGameOver() {
    notiGame.style.display = "block";
    notiGameOver.style.display = "block";
}
playAgain.addEventListener("click", function () {
    location.reload();
})


function draw() {
    drawCrossBar();
    drawBall();
    drawBricks();
    showDiem();
    showLevel();
    showMang();
    if (LEVEL === 3) {
        drawReboundBars();
    }
    if (LEVEL === 4) {
        // drawCircle();
        drawReboundBars();
    }
    if (LEVEL === 5) {
        drawBoss();
        drawBossHealth();
    }
    if (LEVEL === 6) {
        // drawReboundBars();
        drawBoss();
        drawBossHealth();
        drawSquare();
        drawLifeBoss();
    }
}

function update() {
    moveCrossBar();
    moveBall();
    moveCricle();
    // moveBlackCircles();
    checkBallWall();
    checkCrossBarWall();
    checkBallBrick();
    checkGameOver();
    checkQuaMan();
    moveBricks();
    if (LEVEL === 3) {
        checkBallReboundBars();
    }

    if (LEVEL === 4) {
        shootBullet(); // mưa đạn
        checkBallReboundBars();
    }

    if (LEVEL === 5) {
        shootBullet(); 
        shootBlood(); //cấp máu
        updateBoss();
        checkBallBossCollision();
    }
    if (LEVEL === 6) {
        shootBullet();
        shootBlood();  
        // checkBallReboundBars();
        updateBoss();
        checkBallBossCollision();
        checkBallSq();
        updateSq();
    }
}

// nút stop trò chơi
const stopButton = document.getElementById('stopButton');
stopButton.addEventListener('click', stopGame);

function stopGame() {
    cancelAnimationFrame(animationId); // Dừng vòng lặp game
    console.log('Trò chơi đã dừng lại.');
    stopButton.style.display = 'none';
    resumeButton.style.display = 'inline';
}

let animationId; // Biến lưu ID của vòng lặp game

// Hàm vòng lặp game
function loop() {
    ctx.drawImage(BANNER, 0, 0);
    if (!GAME_OVER) {
        animationId = requestAnimationFrame(loop); // Lặp lại vòng lặp game
    }
    draw();
    update();
}

// hàm tiếp tục
const resumeButton = document.getElementById('resumeButton');
resumeButton.addEventListener('click', resumeGame);

function resumeGame() {
    loop(); 
    console.log('Trò chơi đã tiếp tục.');
    resumeButton.style.display = 'none';
    stopButton.style.display = 'inline';
}

const startButton = document.getElementById('startButton');

let isRunning = false; // biến kiểm tra trạng thái trò chơi

startButton.addEventListener('click', startGame);

function startGame() {
    if (!isRunning) {
        loop(); 
        console.log('Trò chơi đã bắt đầu.');
        isRunning = true;
        startButton.style.display = 'none';
        stopButton.style.display = 'inline';
    }
}


// Lấy tham chiếu đến phần tử chứa chữ "Thành công"
const successMessage = document.getElementById("successMessage");

// Lấy tất cả các nút level
const levelButtons = document.querySelectorAll(".levelButton");

// Lặp qua từng nút level để gán sự kiện click
levelButtons.forEach(button => {
    button.addEventListener("click", function () {
        const level = this.getAttribute("data-level");
        // Hiển thị chữ "Thành công"
        successMessage.style.display = "block";
        // Sau 2 giây ẩn chữ đi
        setTimeout(function () {
            successMessage.style.display = "none";
        }, 2000); 
    });
});

// Viên đạn
const bullet = {
    x: 0,
    y: 0,
    radius: 5,
    speed: 2
};

// Hàm vẽ viên đạn
function drawBullet() {
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}

// Hàm di chuyển viên đạn 
function moveBullet() {
    bullet.y += bullet.speed;
}

// Hàm kiểm tra va chạm giữa viên đạn và thanh đỡ
function checkBulletCollision() {
    if (
        bullet.x > crossbar.x &&
        bullet.x < crossbar.x + crossbar.width &&
        bullet.y > crossbar.y &&
        bullet.y < crossbar.y + crossbar.height
    ) {
        HEART--; 
        resetBullet(); // Đặt lại vị trí của viên đạn
    }
}

// Hàm đặt lại vị trí của viên đạn
function resetBullet() {
    bullet.x = Math.random() * cvs.width; 
    bullet.y = 0; 
}

// Biến thời gian bắn viên đạn
let bulletTimer = 0;

// Hàm chính để kiểm tra và cho viên đạn rơi
function shootBullet() {
    bulletTimer++; 

    if (bulletTimer >= 300) {
        moveBullet(); 
        drawBullet(); 

        // nếu đi qua màng hình
        if (bullet.y > cvs.height) {
            resetBullet(); 
        }

        checkBulletCollision(); // Kiểm tra va chạm với thanh đỡ
    }
}


// Cấp máu

const blood = {
    x: cvs.width/2,
    y: 0,
    radius: 10,
    speed: 0.5
};

// Hàm vẽ viên máu
function drawBlood() {
    ctx.beginPath();
    ctx.arc(blood.x, blood.y, blood.radius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

// Hàm di chuyển viên máu xuống dưới màn hình
function moveBlood() {
    blood.y += blood.speed;
}

// Hàm kiểm tra va chạm giữa viên máu và thanh đỡ
function checkBloodCollision() {
    if (
        blood.x > crossbar.x &&
        blood.x < crossbar.x + crossbar.width &&
        blood.y > crossbar.y &&
        blood.y < crossbar.y + crossbar.height
    ) {
        HEART++; 
        resetBlood(); 
    }
}

// Hàm đặt lại vị trí của viên máu
function resetBlood() {
    blood.x = Math.random() * cvs.width; 
    blood.y = 0; 
}

// Biến thời gian bắn viên máu
let bloodTimer = 0;

function shootBlood() {
    bloodTimer++; 

    if (bloodTimer >= 400) {
        moveBlood(); 
        drawBlood(); 

        if (blood.y > cvs.height) {
            resetBlood(); 
        }

        checkBloodCollision(); 
    }
}
////////////////////



function loop() {
    ctx.drawImage(BANNER, 0, 0);
    if (!GAME_OVER) {
        animationId = requestAnimationFrame(loop);
    }
    draw();
    update();
}



// Biến cho boss, boss này như 1 hố đen, trả ball về vị trí đầu
const boss = {
    x: 0,
    y: 50,
    width: 100,
    height: 50,
    health: 5, // suck
};

// Hàm vẽ boss hố đen
function drawBoss() {
    ctx.fillRect(boss.x, boss.y, boss.width, boss.height);
    ctx.drawImage(HODEN_IMG, boss.x, boss.y, 100, 50);
}

function drawBossHealth() {
    ctx.fillStyle = "#B50606";
    ctx.fillText("Suck: " + boss.health, 450, 30);
    ctx.font = "20px Verdana";
}

function updateBoss() {
    if (boss.health <= 0) {
        boss.x = -boss.width;
        boss.isVisible = false; // ẩn con boss đi
        return; 
    }

    // Di chuyển con boss qua lại
    boss.x += 2; 
    if (boss.x <= 0 || boss.x + boss.width >= cvs.width) {
        boss.x = 0; // Đặt lại vị trí của con boss
        // b.status = true;

    }
}

// Hàm kiểm tra va chạm giữa quả bóng và con boss
function checkBallBossCollision() {
    if (
        ball.x + ball.radius > boss.x &&
        ball.x - ball.radius < boss.x + boss.width &&

        ball.y + ball.radius > boss.y &&
        ball.y - ball.radius < boss.y + boss.height
    ) {
        boss.health--; 
        resetBall(); 
    }
}

// tạo con boss thứ 2, boss này giúp tái tạo lại gạch đã mất
let square = { x: cvs.width / 2, y: 10, size: 50 };
let boosHeart = 5;
function drawSquare() {
    ctx.beginPath();
    ctx.rect(square.x, square.y, square.size, square.size);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();
    ctx.drawImage(BOSS_IMG, square.x, square.y, 50, 50);

}

function drawLifeBoss() {
    ctx.fillStyle = "#B50606";
    ctx.fillText(boosHeart, 617, 30);
    ctx.font = "20px Verdana";
}

function checkBallSq() {
    if (ball.x + ball.radius > square.x &&
        ball.x - ball.radius < square.x + square.size &&
        ball.y + ball.radius > square.y &&
        ball.y - ball.radius < square.y + square.size) {
        boosHeart--;
        ball.dx = -ball.dx; // Reverse ball direction
        ball.dy = -ball.dy; // Reverse ball direction
    }
}

function updateSq() {
    if (boosHeart === 0) {
        square.x = -square.width;
        square.isVisible = false; // Nếu có, ẩn con boss đi
        return; // Kết thúc hàm
    }
}

