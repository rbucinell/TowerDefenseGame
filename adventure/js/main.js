let player, cell, rows, cols;

function keyPressed( keyEvent )
{
    if( keyEvent.keyCode === LEFT_ARROW )
    {
        player.x -= (player.x - 1 < 0) ? 0 : 1;
    }
    else if( keyEvent.keyCode === RIGHT_ARROW )
    {
        player.x += (player.x + 1 >= cols) ? 0 : 1;
    }
    else if( keyEvent.keyCode === DOWN_ARROW )
    {
        player.y += (player.y + 1 >= rows) ? 0 : 1;
    }
    else if( keyEvent.keyCode === UP_ARROW )
    {
        player.y -= (player.y - 1 < 0) ? 0 : 1;
    }
    if( player.item !== null )
    {
        player.item.updatePositionBasedOnPlayer( player.x, player.y );
    }
}

let currentMap = [];
let map_data = {};

function preload()
{
    map_data = loadJSON( "./data/maps.json", configureData );
}

function configureData()
{
    map_data.config.cell_height = Math.floor(map_data.config.height / map_data.config.rows);
    map_data.config.cell_width = Math.floor(map_data.config.width / map_data.config.cols);
    cols = map_data.config.cols;
    rows = map_data.config.rows;
    cell = {
        width: map_data.config.cell_width,
        height: map_data.config.cell_height
    }
    console.log(map_data);
}

function setup()
{
    createCanvas( map_data.config.width+1, map_data.config.height+1 );
    player = new Player( 3, 2, cell);

    currentMap = map_data.templates.exterior_walls;
}

function draw()
{
    background( 'gray');
    fill(255)
    stroke(0);
    for( let c= 0; c < cols; c++)
    {
        for( let r = 0; r < rows; r++ )
        {
            let val = currentMap[r][c];
            fill( val === 1 ? "yellow" : "white");
            rect( c * cell.width, r * cell.height, cell.width, cell.height);
        }
    }
    line(width/2,0,width/2, height);
    line(0,height/2,width,height/2);
    player.draw();
}

