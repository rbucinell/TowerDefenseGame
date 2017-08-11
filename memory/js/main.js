var canvasWidth = 900, canvasHeight = 660;
var spritesheet;
var whodatpkmn = {img : {}, sx: 1240, sy: 210, w: 300, h: 440 };
var spriteW = 60, spriteH = 60;
var spriteScale = 2;
var pkmn = [];
var matchables = [];
var grid = {
    rows: 4,
    cols: 6,
    x_offset: 70,
    y_offset: 120,
    x_margin: 5,
    y_margin: 5
}

///////////////////////  P5.JS Functions  /////////////////////////
function preload()
{
    spritesheet = loadImage('assets/sprites.png');
    whodatpkmn.img = loadImage('assets/whodat.png');
}

function setup()
{
    frameRate(30);

    pkmn_count = 1;
    createCanvas( canvasWidth, canvasHeight );
    
    //read the spritesheet in
    for( var row = 0; row < (spritesheet.height/spriteH); row++ )
    {
        for( var col = 0; col < (spritesheet.width/spriteW); col++ )
        {
            if( pkmn_count < 151 )
            {
                pkmn.push( {id: pkmn_count++, sx: col * spriteW, sy: row * spriteH, loc: {} , revealed: false, matched: false});
            }            
        }
    }
}

function draw()
{

}