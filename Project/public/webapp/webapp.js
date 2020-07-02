let stage = document.getElementById("stage");
let ctx = stage.getContext("2d");

let car = new Image();
let bg = new Image();
let fg = new Image();
let pipeNorth = new Image();
let pipeSouth = new Image();

car.src = "img/car.png";
bg.src = "img/hstraße.png";
fg.src = "";
pipeNorth.src = "img/hin_5.jpg";
pipeSouth.src = "img/hin_5.jpg";

let continua = true;
let gap = 85;
let constant;
let bX = 10;
let bY = 15
let gravity = 2.0;
let gravity_backup = gravity;
let score = 0;

let fly = new Audio();
let scor = new Audio();
scor.src = "audio/score.mp3";

document.addEventListener("keydown", moveUp);
document.getElementById("btn_again").addEventListener("click", play_again);

function moveUp() {

    if (!continua) {
        return false;
    }

    gravity = -6.0;

    setTimeout(function () {
        gravity = gravity_backup;
    }, 80);

}

function game_over() {
    continua = false;
    document.getElementById("pontos_detail").innerText = score;
    document.getElementById("game_over").style = "display:inline";
    gravity = 0;

}

function play_again() {
    continua = true;
    score = 0;
    gravity = gravity_backup;
    bY = 150;
    document.getElementById("pontos_detail").innerText = score;
    document.getElementById("game_over").style = "display:none";

    pipe = [];
    pipe[0] = {
        x: stage.width,
        y: 0
    }

}

let pipe = [];

pipe[0] = {
    x: stage.width,
    y: 0
}

function draw() {
    ctx.drawImage(bg, 0, 0);

    for (let i = 0; i < pipe.length; i++) {

        constant = pipeNorth.height + gap;
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

        if (continua) {
            pipe[i].x--;
        }

        if (pipe[i].x == 10) {
            pipe.push({
                x: stage.width,
                y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
            })
        }

        if (bX + car.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width
            && (bY <= pipe[i].y + pipeNorth.height || bY + car.height >= pipe[i].y + constant)
            || bY + car.height >= stage.height - fg.height) {
            game_over();
        }

        if (pipe[i].x == 5) {
            score++;
            scor.play();
        }
    }
    ctx.drawImage(fg, 0, stage.height - fg.height);
    let bd = ctx.drawImage(car, bX, bY);

    bY += gravity;

    let width_canvas = (stage.width / 2) - 10;
    ctx.fillStyle = "#FFF";
    ctx.strokeStyle = "#000";
    ctx.font = "70px Flappy";
    ctx.fillText(score, width_canvas, 80);
    ctx.strokeText(score, width_canvas, 80);

    requestAnimationFrame(draw);
}

window.onload = function () {
    draw();
}
