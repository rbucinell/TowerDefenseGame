const cell_size = 40;
let player;



function keyPressed( keyEvent )
{
    console.log( `Key ${keyEvent.keyCode} was pressed` );
    player.keyPressed( keyEvent );
}


function setup()
{
    createCanvas( 1001, 601 );
    player = new Player( 3 * cell_size, 2 * cell_size, cell_size);
    
}

function draw()
{
    background( 'gray');
    fill(255)
    stroke(0);

    for( let i = 0; i < width; i+= cell_size)
    {
        for( let j = 0; j < height;j += cell_size )
        {
            rect( i, j, cell_size, cell_size);
        }
    }
    player.draw();
}