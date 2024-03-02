'use strict'
/* 
    Docs:
        Render Task Type:
            {0x00:'render polygon',
             0x01:'render image',
             0x02:'render text',
             0x03:'graphic move',
             0x04:'graphic delete',
             0x05:'change alpha(experimental)',
             0x06:'create circle'}
*/
let X = 50;
let Y = 50;
let PlaneX = 250;
let PlaneY = 580;
let Xvector = 1;
let Yvector = 1;
let EnemyX = 250;
let EnemyY = 20;
let Score = 0;
let EnemyScore = 0; 
let operationCache = [];
const canvas = document.querySelector('.Game');
const ctx = canvas.getContext("2d");

document.body.addEventListener('keydown',(e)=>{
    operationCache.push(e.key.toLowerCase());
})

restartButton.addEventListener('click',()=>{
    gamecycle();
})

gamecycle();

function gamecycle(timeStamp) {
    paintBall();
    paintPlane();
    paintEnemy();
    X += 5 * Xvector;
    Y += 5 * Yvector;
    if(X<=0 || X >= 800){
        Xvector = -Xvector;
    }
    if(Y>=PlaneY+10){
        X = 50;
        Y = 50;
        EnemyScore++;
        changeEnemyScore();
    }
    
    if(Y<=10){
        X = 50;
        Y = 50;
        Score++;
        changeScore();
    }

    if(Y>=PlaneY-10 && X >= PlaneX - 50 && X <= PlaneX + 50){
        Yvector = -Yvector;
    }

    if(operationCache.length>0){
        let move = operationCache.pop()
        if (move == "w"){
            PlaneY -= 5;
            if (PlaneY-10 <= 300){
                PlaneY = 310;
            }
        }
        if (move == "s"){
            PlaneY += 5;
            if (PlaneY >= 600){
                PlaneY = 600;
            }
        }
        if (move == "a"){
            PlaneX -= 40;
            if (PlaneX-50<0){
                PlaneX = 50;
            }
        }
        if (move == "d"){
            PlaneX += 40;           //userspeed
            if (PlaneX+50>800){
                PlaneX = 750;
            }
        }
    }

    //Enemy logic
    if (X - EnemyX > -5 && Y < 300){
        EnemyX += 20 * Math.random();
        if (EnemyX+50>800){
            EnemyX = 750;
        }
    }
    if (X - EnemyX < 5 && Y < 300){
        EnemyX -= 20 * Math.random();
        if (EnemyX-50<0){
            EnemyX = 50;
        }
    }


    if (X <= EnemyX+100 && X >= EnemyX && Y<=30){
        Yvector = -Yvector;
    }
    requestAnimationFrame(gamecycle);
}

function paintBall(){
    ctx.clearRect(0,0,canvas.width,canvas.height);        //clear canvas
    ctx.beginPath();
    ctx.arc(X, Y, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.closePath();
}

function paintPlane(){
    ctx.beginPath();
    ctx.rect(PlaneX-50,PlaneY-10,100,10);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function paintEnemy(){
    ctx.beginPath();
    ctx.rect(EnemyX-50,EnemyY,100,10);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
}

function changeEnemyScore(){
    let Escore = document.querySelector('#enemy-Score');
    Escore.textContent = EnemyScore;
}

function changeScore(){
    let PScore = document.querySelector('#player-Score');
    PScore.textContent = Score;
}