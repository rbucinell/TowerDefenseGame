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
                pkmn.push( {id: pkmn_count++, sx: col * spriteW, sy: row * spriteH, loc: {} , revealed: true, matched: false});
            }            
        }
    }

    //populate the matchables grid with pairs of pkmn
    while( matchables.length < grid.rows*grid.cols)
    {
        var rand = random(pkmn);
        matchables.push(JSON.parse(JSON.stringify(rand)));
        matchables.push(JSON.parse(JSON.stringify(rand)));    
    }

    //shuff the deck to get ready to play
    matchables = shuffle( shuffle(matchables) );


    //Locations in the grid
    var counter = 0;
    for( row = 0; row < grid.rows; row++ )
    {
        for( col = 0; col < grid.cols; col++ )
        {
            var location = { 
                x: (grid.x_offset + (col * spriteW * spriteScale) + (col * grid.x_margin)), 
                y: (grid.y_offset + (row * spriteH * spriteScale) + (row * grid.y_margin)), 
                w: spriteW * spriteScale, 
                h: spriteH * spriteScale 
            };
            matchables[counter++].loc = location;
        }
    }
}

function draw()
{
    background(153);

    matchables.forEach( function( card )
    {
        if( card.revealed || card.matchabled)
        {
            fill( 240, 240,240 ); //background color of card
            rect( card.loc.x, card.loc.y, card.loc.w, card.loc.h ); // draw background of card
        }
        else
        {
            //draw the back of the card (hidden)
            image( whodatpkmn.img, card.loc.x, card.loc.y, card.loc.w, card.loc.h, whodatpkmn.sx, whodatpkmn.sy, whodatpkmn.w, whodatpkmn.h );            
        }
        noFill();
        rect( card.loc.x, card.loc.y, card.loc.w, card.loc.h ); //draw border around card
    });

}

//////////////// Helper Functions /////////////////////

/**
 * Shuffles array in place.
 * @param {Array} a items The array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}