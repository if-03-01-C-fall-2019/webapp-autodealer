var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

//Bilder:

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "images/car.png";
bg.src = "images/hstraße.png";
pipeNorth.src = "images/hin_3.png";
pipeSouth.src = "images/hin_2.png";


//Variablen

var gap = 85;
var constant;

var bX = 10;
var bY = 150;

var gravity = 1.5;

var score = 0;

// Movement

document.addEventListener("keydown",moveUp);

function moveUp(){
    bY -= 25;
}

// Hinderniss Kordinaten

var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
};

// Bild wird dargestellt

function draw(){

    ctx.drawImage(bg,0,0);


    for(var i = 0; i < pipe.length; i++){

        constant = pipeNorth.height+gap;
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);

        pipe[i].x--;

        if( pipe[i].x == 20 ){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            });
        }

        // detect collision
        if(pipe[i].x == 5){
            score++;
        }
    }

    ctx.drawImage(fg,0,cvs.height - fg.height);

    ctx.drawImage(bird,bX,bY);

    bY += gravity;

    ctx.fillStyle = "white";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-5);

    requestAnimationFrame(draw);

}

draw();
