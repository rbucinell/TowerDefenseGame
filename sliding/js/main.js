var canvasWidth = 640;
var canvasHeight = 480;
var tiles = [
    [1,2,3,4],
    [5,6,7,8],
    [9,10,11,12],
    [13,14,15,0],
];
var s = 100;
var grid = {
    x_offset: 100,  y_offset: 35,
    x_margin: 5, y_margin: 5
};


function preload()
{
	
}

function setup()
{
	createCanvas( canvasWidth, canvasHeight );
    frameRate(60);
    textSize( 30 );

    x = 0, y = 0;
    for( var i = 0;i < 1000; i++)
    {
        var nx = Math.floor(Math.random()*4);
        var ny = Math.floor(Math.random()*4);

        var temp = tiles[x][y];
        tiles[x][y] = tiles[nx][ny];
        tiles[nx][ny] = temp;


    }

}

function draw()
{
    background('gray');
    for( var i = 0; i < 4; i++ )
        for( var j = 0; j < 4;j++ )
        {
            fill( 'white');
            stroke( 'black');
            if( tiles[j][i] === 0)
            {
                fill(0,0,0,0);
                stroke(0,0,0,0);
            }
            rect( grid.x_offset + j*s, grid.y_offset + i*s, s, s);

           if( tiles[j][i] !== 0)
            text(tiles[j][i],grid.x_offset + j*s + s/2, grid.y_offset + i*s + s/2 )
        }
}