var enemies = [];
var curScore = 0;
var baseScore = 0;
var canvasWidth = 640;
var canvasHeight = 480;


function setup()
{
    createCanvas( canvasWidth, canvasHeight );
    background(153);
    noCursor();
    frameRate(60);
    textSize( 32 );
    enemies.push( new Enemy( 50,50, 100, 200 ));
    baseScore = frameCount; 
}


function draw()
{
    curScore = (Math.floor((frameCount - baseScore) / 100));
    curScore = 
    //reset
    background(153);
    
    //score   
    fill( "#FFFFFF");
    stroke("#000000"); 
    var scoreBoard = "Score:\n " + curScore;
    text( scoreBoard, canvasWidth - textWidth( scoreBoard), 40  );
    //draw enemies
    enemies.forEach(function(e) {
        e.draw();
    }, this);
    //draw mouse
    fill( "#FFFFFF");
    ellipse( mouseX, mouseY, 50, 50 );

    

}

function Enemy(x,y,w,h)
{
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
}

Enemy.prototype.draw = function()
{
    fill( "#00FF00" );
    rect( this.x, this.y, this.w, this.h );
}