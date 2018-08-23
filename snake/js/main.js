const canvasWidth = 800;
const canvasHeight = 800;
const snake_size = 20;

let apple = {};
let snake = [];
let score = 0;


class Entity {
    constructor( x, y, w, h, c){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c ? c : 'white';
        this.vX = 0;
        this.vY = 0;
    }

    draw = function()
    {
        fill( this.c );
        rect( this.x, this.y, this.w, this.h )
    }
}


function setup()
{
   createCanvas( canvasWidth, canvasHeight);
   rectMode(CENTER);
   snake.push( new Entity( 50, 50, snake_size, snake_size, 'blue'))
}

function draw()
{
    background( 50 );
    snake.forEach(s => {
        s.draw();
    });

}

function keyPressed()
{
    console.log( keyCode );
    if( keyCode === LEFT_ARROW )
    {
            
    }
    else if( keyCode === RIGHT_ARROW )
    {

    }
    else if( keyCode === DOWN_ARROW )
    {

    }
    else if( keyCode === UP_ARROW )
    {

    }
}
