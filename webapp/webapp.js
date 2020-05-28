var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var car = new Image();
var bg = new Image();
var border = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

car.src = "images/car.png";
bg.src = "images/hstraße.png";
border.src = "";
pipeNorth.src = "images/hin_5.jpg";
pipeSouth.src = "images/hin_5.jpg";


var gap = 150;
var constant;
var bX = 10;
var bY = 150;
var gravity = 1.5;
var score = 0;

document.addEventListener("keydown",moveUp);

function moveUp(){
    bY -= 25;
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

        if( pipe[i].x == 20){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            });
        }

        if( bX + car.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+car.height >= pipe[i].y+constant) || bY + car.height >=  cvs.height - border.height){
            location.reload();
        }
        if(pipe[i].x == 5){
            score++;
        }


    }

    ctx.drawImage(border,0,cvs.height - border.height);
    ctx.drawImage(car,bX,bY);

    bY += gravity;

    ctx.fillStyle = "white";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-5);

    requestAnimationFrame(draw);

}

draw();
