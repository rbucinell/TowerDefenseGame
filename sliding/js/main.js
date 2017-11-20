var canvasWidth = 640;
var canvasHeight = 480;
var tiles = [];
let squareCount = 4;

var grid = {
    x_offset: 50,  y_offset: 40,
    x_margin: 5, y_margin: 5,
    rows: squareCount,
    cols: squareCount,
    s: 100
};

var tileBG = {
    offset: 0,
    range: 70
}

function setup()
{
    grid.s = (canvasWidth - grid.x_offset*2) / grid.cols;
    canvasHeight = 2 * grid.y_offset + grid.rows * grid.s;

    let cvs = createCanvas( canvasWidth, canvasHeight );
    cvs.mousePressed(canvasClick);

    let counter = 0;
    for( let i = 0; i < grid.rows; i++)
        {
            tiles[i] = [];
            for( let j = 0; j < grid.cols; j++ )
                tiles[i].push( counter++);
        }

    frameRate(60);
    textSize( 30 );
    colorMode( HSL );
    shuffleTiles();
}

function shuffleTiles()
{
    for( let i = 0;i < 1000; i++)
    {
        //random pt
        let x = Math.floor(Math.random()*grid.rows);
        let y = Math.floor(Math.random()*grid.cols);

        //random 2nd pt
        let nx = Math.floor(Math.random()*grid.rows);
        let ny = Math.floor(Math.random()*grid.cols);

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
    stroke( 'black');
    
    for( var i = 0; i < grid.cols; i++ )
        for( var j = 0; j < grid.rows;j++ )
        {
            strokeWeight( 2);     

            if( tiles[j][i] !== 0 )
            {
                fill( (tiles[j][i]/(grid.rows*grid.cols))* tileBG.range + tileBG.offset, 100, 50 );
                rect( grid.x_offset + j * grid.s, grid.y_offset + i * grid.s, grid.s, grid.s);
                fill( 'white');
                strokeWeight( 3 );
                text(tiles[j][i],
                    grid.x_offset + j* grid.s + grid.s/2 - textWidth(tiles[j][i])/2, 
                    grid.y_offset + i* grid.s + grid.s/2 + textSize()/2 - grid.y_margin);
            }            
        }
    if( isWin() )
    {
        fill( 'white' );
        text( 'you win, click to reset', 10, textSize() + grid.y_margin );
    }
}

function canvasClick( mouseEvent )
{
    //if we already won, reset
    if( isWin() )
    {
        shuffleTiles();
        return;
    }
        

    let col = Math.floor((mouseEvent.x - grid.x_offset) / grid.s );
    let row = Math.floor((mouseEvent.y-grid.y_offset) /   grid.s );
    
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