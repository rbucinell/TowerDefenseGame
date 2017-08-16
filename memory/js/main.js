var cnvs;
var canvasWidth = 900, canvasHeight = 660;
var spritesheet, bg;
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
var score = 0;

///////////////////////  P5.JS Functions  /////////////////////////
function preload()
{
    spritesheet     = loadImage('assets/sprites.png');
    whodatpkmn.img  = loadImage('assets/whodat.png');
    bg              = loadImage('assets/background.jpg');
}

function setup()
{
    frameRate(30);

    pkmn_count = 1;
    cnvs = createCanvas( canvasWidth, canvasHeight );
    cnvs.mousePressed( flipCard );
    
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

    //populate the matchables grid with pairs of pkmn
    while( matchables.length < grid.rows*grid.cols)
    {
        var rand = random(pkmn);
        var alreadyContains = false;
        matchables.forEach( function( e ){
            if( e.id === rand.id )
                alreadyContains = true;
        });

        if( !alreadyContains )
        {
            matchables.push(JSON.parse(JSON.stringify(rand)));
            matchables.push(JSON.parse(JSON.stringify(rand)));    
        }
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
    background(bg);

    //Draw cards
    for( var i = 0; i < matchables.length; i++ )
    {
        var cur = matchables[i]; 

        if( cur.revealed || cur.matched )
        {
            fill(240, 240, 240); //background color of card
            rect(cur.loc.x, cur.loc.y, cur.loc.w, cur.loc.h); // draw background of card
            
            //draw the pkmn on the card
            image(spritesheet, cur.loc.x, cur.loc.y, cur.loc.w, cur.loc.h, cur.sx, cur.sy, spriteW, spriteH );
        }
        else
        {
            //draw the back of the card (hidden)
            image(whodatpkmn.img, cur.loc.x, cur.loc.y, cur.loc.w, cur.loc.h,  whodatpkmn.sx, whodatpkmn.sy, whodatpkmn.w, whodatpkmn.h );
        }  
        noFill();      
        rect(cur.loc.x, cur.loc.y, cur.loc.w, cur.loc.h); //draw border around card
    }

    //Title and Score board
    textSize( 40 );

    strokeWeight(6);
    fill(255,255,0);
    stroke( 0,0,255);
    text( "Pokemon", 10, 50);

    fill(255,255,255);
    stroke( 0,0,0);
    strokeWeight(1);
    text(" Memory", 10+textWidth("Pokemon"), 50);

    var scoreBoard = 'Score: ' + score;
    text( scoreBoard , width - textWidth(scoreBoard)- 10, 50 );
}

//////////////// Click Handler Function /////////////////////

var clickCounter = 0;
var revealed = [];
var waitTimer = false;
function flipCard( e )
{
    if( waitTimer)
        return;

    matchables.forEach( function( card ){

        if( collidePointRect( e.offsetX, e.offsetY, card.loc.x, card.loc.y, card.loc.w, card.loc.h ) )
        {
            if( !card.matched && !card.revealed)
            {
                card.revealed = !card.revealed;   
                revealed.push( card );
                clickCounter++;
                score++;
            }
        }
    });

    if( clickCounter == 2 )
    {
        waitTimer = true;
        clickCounter = 0;

        //set matched cards
        matchables.forEach( function( card ){ 
            if( revealed[0].id === revealed[1].id && (revealed[0].id === card.id || revealed[1].id === card.id ))
            {
                card.matched = true;
            }
        });

        //wait a short perioe before reseting
        setTimeout( function()
        {
            matchables.forEach( c => c.revealed = false );

            if( matchables.every( m => m.matched) )
            {
                alert( 'gameover');
            }

            revealed = [];
            waitTimer = false;
         }, 2000 );
    }  
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