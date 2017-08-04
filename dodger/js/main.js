var enemies = [];
var player;
var curScore = 0;
var baseScore = 0;
var canvasWidth = 640;
var canvasHeight = 480;
var finalScore = 0;
var gameOver = true;

//Ref links: https://p5js.org/reference/
// https://github.com/bmoren/p5.collide2D#colliderectcircle
//http://inventwithpython.com/blog/2012/02/20/i-need-practice-programming-49-ideas-for-game-clones-to-code/


function byte2Hex(n)
  {
    var nybHexString = "0123456789ABCDEF";
    return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
  }

function RGB2Color( R, G, B )
{
    return '#' + byte2Hex(R) + byte2Hex(G) + byte2Hex(B);
}

function Enemy(x,y,w,h,s)
{
    this.color = "#00FF00";
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.s = (typeof s !== 'undefined' ) ? s : 2;
    this.isHit = false;
}
Enemy.prototype.update = function()
{
    if( !this.isHit )
    {
        this.y += this.s;
    }
}
Enemy.prototype.draw = function()
{
    fill( this.color );
    rect( this.x, this.y, this.w, this.h );
}
Enemy.prototype.hit = function()
{
    this.isHit = true;
    this.color = "#FF0000";
}

function Player( x, y, r)
{
    this.x = x;
    this.y = y;
    this.r = r;
}
Player.prototype.update = function( x, y )
{
    if(!this.isHit )
    {
        var half = this.r/2;

        if( x < half ) x = half;
        if( x + half > width ) x = width - half;
        this.x = x;
        
        if( this.y+ half > scren)
        this.y = y;
    }
}
Player.prototype.draw = function()
{
    if( this.isHit )
        fill( RGB2Color( sin(frameCount*.1) * 127 + 128, 0, 0 ));
    else
        fill( "#FFFFFF");
    ellipse( this.x, this.y, 50, 50 );
}
Player.prototype.hit = function()
{
    this.isHit = true;
}




//single run function that kicks off draw() loop
function setup()
{
    createCanvas( canvasWidth, canvasHeight );
    background(153);
    noCursor();
    frameRate(60);
    textSize( 32 );
    enemies.push( new Enemy( 50,50, 100, 200 ));
    baseScore = frameCount; 
    player = new Player( mouseX, height - 50 - 10, 50 );
    gameOver = false;
}


//looping function.
function draw()
{
    //reset
    background(153);

    //score   
    fill( "#FFFFFF");
    stroke("#000000"); 
    var scoreBoard = "Score:\n";
    if( !gameOver )
    {           
        curScore = (Math.floor((frameCount - baseScore) / 100));
    }
    else
    {
        scoreBoard = "Final Score:\n";
    }
    scoreBoard += curScore;
    text( scoreBoard, canvasWidth - textWidth( scoreBoard), 40  );

        //draw mouse
    player.update( mouseX, mouseY);//, height - player.r );
    player.draw();


    //draw enemies
    enemies.forEach(function(e) 
    {
        if( collideRectCircle( e.x, e.y, e.w, e.h, player.x, player.y, player.r, player.r ))
        {
            e.hit();
            player.hit();
            gameOver = true;
        }
        else
        {
            e.update();
        }
        e.draw();
    }, this);




    

}