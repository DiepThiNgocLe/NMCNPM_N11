// let bird;
// let pipeUpper;
// let pipeLower;
// let score;
// let gameInterval;
// let isGameOver;
// let gravity;
// let birdVelocity;

// function startGame() {
//     isGameOver = false;
//     score = 0;
//     document.getElementById('score').textContent = score;

//     bird = document.getElementById('bird');
//     pipeUpper = document.getElementById('pipe-upper');
//     pipeLower = document.getElementById('pipe-lower');

//     bird.style.top = '200px';
//     birdVelocity = 0;
//     gravity = 0.5;

//     document.addEventListener('keydown', flyUp);

//     resetPipes();

//     gameInterval = setInterval(updateGame, 20);
// }

// function updateGame() {
//     if (isGameOver) return;

//     birdVelocity += gravity;
//     bird.style.top = `${parseInt(bird.style.top) + birdVelocity}px`;

//     const birdRect = bird.getBoundingClientRect();
//     const pipeUpperRect = pipeUpper.getBoundingClientRect();
//     const pipeLowerRect = pipeLower.getBoundingClientRect();

//     if (birdRect.bottom > 400 || birdRect.top < 0 || 
//         (birdRect.right > pipeUpperRect.left && birdRect.left < pipeUpperRect.right && birdRect.top < pipeUpperRect.bottom) || 
//         (birdRect.right > pipeLowerRect.left && birdRect.left < pipeLowerRect.right && birdRect.bottom > pipeLowerRect.top)) {
//         endGame();
//         return;
//     }

//     if (pipeUpper.offsetLeft < -80) {
//         resetPipes();
//         score++;
//         document.getElementById('score').textContent = score;
//     }

//     pipeUpper.style.left = `${pipeUpper.offsetLeft - 2}px`;
//     pipeLower.style.left = `${pipeLower.offsetLeft - 2}px`;
// }

// function flyUp(event) {
//     if (event.key === ' ') {
//         birdVelocity = -8;
//     }
// }

// function resetPipes() {
//     const gap = 150;
//     const randomHeight = Math.floor(Math.random() * 200) + 50;
//     pipeUpper.style.height = `${randomHeight}px`;
//     pipeLower.style.height = `${400 - randomHeight - gap}px`;
//     pipeUpper.style.left = '400px';
//     pipeLower.style.left = '400px';
//     pipeLower.style.top = `${randomHeight + gap}px`;
// }

// function endGame() {
//     clearInterval(gameInterval);
//     isGameOver = true;
//     document.removeEventListener('keydown', flyUp);
// }

// document.getElementById('start-button').addEventListener('click', startGame);


var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "./img/brick.jpg";
bg.src = "./img/brick.jpg";
fg.src = "./img/brick.jpg";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

var fly = new Audio();
var scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";  

var gap = 85;
var constant;

var bX = 10;
var bY = 150;

var gravity = 1.5;

var score = 0;

document.addEventListener("keydown",moveUp);

function moveUp(){
    bY -= 25;
    fly.play();
}

var pipe = [];

pipe[0] = {
  x : cvs.width,
  y : 0
};

function draw(){
    
    ctx.drawImage(bg,0,0);
    
    
    for(var i = 0; i < pipe.length; i++){
        
        constant = pipeNorth.height+gap;
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
             
        pipe[i].x--;
        
        if( pipe[i].x == 125 ){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            }); 
        }

        // detect collision
        
        if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cvs.height - fg.height){
            location.reload(); // reload the page
        }
        
        if(pipe[i].x == 5){
            score++;
            scor.play();
        }
        
        
    }

    ctx.drawImage(fg,0,cvs.height - fg.height);
    
    ctx.drawImage(bird,bX,bY);
    
    bY += gravity;
    
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);
    
    requestAnimationFrame(draw);
    
}

draw();