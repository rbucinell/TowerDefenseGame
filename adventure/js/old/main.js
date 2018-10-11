var config = {
    debugMode: true,
    canvas: {
        width: 800,
        height: 600,
        background: 'gray'
    },
    grid: {
        rows: 60,
        cols: 80,
        rowHeight: 0, //Set dyanmically in setup()
        colWidth: 0, //Set dynamically in setup()
    }

};
var cnvs;
var map;

function setup()
{
    config.grid.rowHeight = config.canvas.height / config.grid.rows;
    config.grid.colWidth = config.canvas.width / config.grid.cols;

    cnvs = createCanvas( config.canvas.width + 1, config.canvas.height + 1 ); //Add a pixel to allow squares to be easily drawn
    map = new Map( config );
}

function keyPressed( keyEvent )
{
    Debugger.Log( `Key ${keyEvent.keyCode} was pressed` );
    map.keyPressed( keyEvent );
}


function draw()
{
    background( config.canvas.background );
    stroke( 0 );
    map.draw();
    Debugger.DrawGrid();
}


class Debugger
{
    static DrawGrid()
    {
        if( config.debugMode )
        {
            for( let i = 0; i < width; i+= config.grid.square )
            {
                for( let j = 0; j < height; j+= config.grid.square )
                {
                    fill( 0,0,0,0 );
                    stroke( 0, 0, 0, 50 )
                    rect( i, j, config.grid.square, config.grid.square );
                }
            }
        }
    }
    static Log( message )
    {
        console.log( message );
    }
}