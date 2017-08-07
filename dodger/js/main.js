var enemies = [];
var player;
var curScore = 0;
var baseScore = 0;
var canvasWidth = 640;
var canvasHeight = 480;
var finalScore = 0;
var gameOver = true;
var timerID;
var SECONDS = 1000;
var timeToNextEnemy = 2 * SECONDS;
var RAMPUP_TIMER = 5 * SECONDS;
var ENEMY_BASE_WIDTH = 20, ENEMY_BASE_HEIGHT = 10;


//Ref links: https://p5js.org/reference/
// https://github.com/bmoren/p5.collide2D#colliderectcircle
//http://inventwithpython.com/blog/2012/02/20/i-need-practice-programming-49-ideas-for-game-clones-to-code/

function rampDifficulty()
{
    timeToNextEnemy *= .95;
    ENEMY_BASE_WIDTH *= 1.05
    ENEMY_BASE_HEIGHT *= 1.05;

}

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
    this.color = RGB2Color( random(256),random(256),random(256));
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
    if( this.y > height )
    {
        enemies.splice( enemies.indexOf(this), 1 );
    }
}
Enemy.prototype.draw = function()
{
    fill( this.color );
    stroke("#000000");
    rect( this.x, this.y, this.w, this.h );
}
Enemy.prototype.hit = function()
{
    this.isHit = true;
    this.color = "#FF0000";
}

function spawnEnemy()
{    
    if( !gameOver)
    {
        var wRand = ENEMY_BASE_WIDTH * .25;
        var hRand = ENEMY_BASE_HEIGHT * .25;

        var eW = ENEMY_BASE_WIDTH + random(-wRand,wRand);
        var eH = ENEMY_BASE_HEIGHT + random(-hRand,hRand);

        var eX = random(width-eW)
        var eY = -eH-1;

        enemies.push( new Enemy( eX, eY, eW, eH));
        setTimeout( spawnEnemy, timeToNextEnemy);
    }
}

function Player( x, y, r)
{
    this.x = x;
    this.y = y;
    this.r = r;
    this.half = this.r/2;
}
Player.prototype.update = function( x, y )
{
    if(!this.isHit )
    {
        if( x < this.half ) x = this.half;
        if( x + this.half > width ) x = width - this.half;
        this.x = x;
        
        if( y+ this.half > height)  y = height - this.half;
        if( y < this.half ) y = this.half;
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
Player.prototype.boundingBoxBuffer = function()
{
    return 2;
}

function setGameOver()
{
    gameOver = true;
    clearInterval( timerID );
    finalScore = curScore;
}


//single run function that kicks off draw() loop
function setup()
{
    createCanvas( canvasWidth, canvasHeight );
    background(153);
    noCursor();
    frameRate(60);
    textSize( 32 );
    baseScore = frameCount; 
    player = new Player( width, height - 25 - 10, 25 );
    gameOver = false;
    setTimeout( spawnEnemy, timeToNextEnemy );
    timerID = setInterval( rampDifficulty, RAMPUP_TIMER);
}

function showScore()
{
    //score
    fill( "#FFFFFF");
    stroke("#000000"); 
    var s = gameOver? finalScore : curScore;
    var m = gameOver? "Final Score" : "Score";
    
    if( !gameOver && frameCount % 3 === 0 )
    {
        curScore = (Math.floor((frameCount - baseScore) / 100));
    }    
    text( m, canvasWidth - textWidth(m), 40  );
    text( s, canvasWidth - textWidth(s) - 5, 80  );
}
//looping function.
function draw()
{
    //reset
    background(153);

    //update the player, but draw him on top of enemies
    player.update( mouseX, mouseY);

    //draw enemies
    enemies.forEach(function(e) 
    {
        if( collideRectCircle( e.x, e.y, e.w, e.h, player.x, player.y, player.r -player.boundingBoxBuffer(), player.r-player.boundingBoxBuffer() ))
        {
            e.hit();
            player.hit();
            setGameOver();
        }
        else
        {
            e.update();
        }
        e.draw();
    }, this);

    //draw player
    player.draw();

    showScore();    
}