var canvasWidth = 640;
var canvasHeight = 480;
var tiles = [
    [0,4,8,12],
    [1,5,9,13],
    [2,6,10,14],
    [3,7,11,15],
];
var s = 100;
var grid = {
    x_offset: 100,  y_offset: 35,
    x_margin: 5, y_margin: 5,
    rows: 4,
    cols: 4
};



function preload()
{
	
}

function setup()
{
    let cvs = createCanvas( canvasWidth, canvasHeight );
    cvs.mousePressed(canvasClick);

    frameRate(60);
    textSize( 30 );
    
    for( let i = 0;i < 1000; i++)
    {
        //random pt
        let x = Math.floor(Math.random()*grid.cols);
        let y = Math.floor(Math.random()*grid.rows);

        //random 2nd pt
        let nx = Math.floor(Math.random()*grid.cols);
        let ny = Math.floor(Math.random()*grid.rows);

        //swap
        let temp = tiles[x][y];
        tiles[x][y] = tiles[nx][ny];
        tiles[nx][ny] = temp;
    }
}

function cheat()
{
    let count = 0;
    for( var i = 0; i < grid.cols; i++ )
        for( var j = 0; j < grid.rows;j++ )
            tiles[j][i] = count++;
}


function draw()
{
    clear();
    background('gray');
    for( var i = 0; i < grid.cols; i++ )
        for( var j = 0; j < grid.rows;j++ )
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
    if( isWin() )
    {
        fill( 0 );
        stroke( 0 );
        text(size)
        text( 'you win', 10, 10 );
    }
}

function canvasClick( mouseEvent )
{
    let col = Math.floor((mouseEvent.x - grid.x_offset) / s );
    let row = Math.floor((mouseEvent.y-grid.y_offset) / s );
    
    //If click is not in bounds, don't do anything
    if( col >= grid.cols || col < 0 || row >= grid.rows || row < 0 )
        return; 

    let val = tiles[col][row];
    let move = moveDir( col, row );

    //swap the tiles
    tiles[col][row] = 0;
    tiles[ col + move.c][ row + move.r] = val;
}

//0 - north, 1 - east, 2 - south, 3 - west, -1 can't move
function moveDir( col, row )
{
    let move = { c: 0, r: 0};
    
    if(  row-1 >= 0 && tiles[col][row-1] === 0)
        move = { c: 0, r: -1};
    else if(  col+1 < grid.cols &&  tiles[col+1][row] === 0 )
        move = { c: 1, r: 0};
    else if(  row+1 < grid.rows &&  tiles[col][row+ 1] === 0 )
        move = { c: 0, r: 1};
    else if( col-1 >= 0 &&  tiles[col-1][row] === 0 )
        move = { c: -1, r: 0};
    return move;
}

function isWin()
{
    let ret = false;
    if( tiles[0][0] === 0)
    {
        let counter = 0;
        for( var i = 0; i < grid.cols; i++ )
            for( var j = 0; j < grid.rows;j++ )
                if( counter++ != tiles[j][i] )
                    return false;
        ret = true;
    }
    else if( tiles[ grid.cols-1][grid.rows-1] === 0)
    {
        let counter = 1;
        for( var i = 0; i < grid.cols-1; i++ )
            for( var j = 0; j < grid.rows;j++ )
                if( counter <= 15 && counter++ != tiles[j][i] )
                    return false;
        ret = true;
    }
    return ret;
}