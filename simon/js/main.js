var canvasWidth = 400;
var canvasHeight = 400;
var tileSize = 150;
var pattern = [];
var buttons = [
    { name: 'yellow', x: 0, y: 0},
    { name: 'blue', x: 1, y: 0},
    { name: 'red', x: 0, y: 1},
    { name: 'green', x: 1, y: 1}
];

var osc = new p5.Oscillator();

function setup()
{
    osc.setType('sine');
    osc.freq(240);
    osc.amp(5);
    //osc.start();

    var cvs = createCanvas( canvasWidth, canvasHeight );
    cvs.mousePressed( clickListener );
    textSize( 30 );
    for( let i = 0; i < buttons.length; i++)
    {
        buttons[i].loc = {
            x: tileSize*buttons[i].x + (canvasWidth-2*tileSize)/2,
            y: tileSize*buttons[i].y + (canvasHeight-2*tileSize)/2
        }
    }
}

function draw()
{
    background( 50 );

    stroke( 'black');
    fill( 'white' );
    if( pattern.length === 0 )
        text( 'click to start', 10, textSize())
    else
        text( 'Score [' + pattern.length + ']', canvasWidth - textWidth('Score [' + pattern.length + ']'), textSize() )
    if( playerGuess && pattern.length !== 0)
    {
        var command = playerGuess ? "Repeat the pattern" : "Listen to Simon!";
        text( command, canvasWidth/2-textWidth(command)/2, canvasHeight- textSize() + 10 );
    }
    for( let i = 0; i < buttons.length; i++)
    {
        fill( buttons[i].name );
        rect( buttons[i].loc.x, buttons[i].loc.y, tileSize, tileSize);
    }
    pattern.forEach( (p) => {
        if( p.highlighted)
        {
            fill( 'white' );
            rect( p.loc.x, p.loc.y, tileSize, tileSize);
        }
    });
}

function incPattern()
{
    pattern.push( buttons[Math.floor(random(buttons.length))] );
}

var simonSpeaking = false;
var playerGuess = false;
var guessIndex = 0;

function clickListener( e)
{
    
    if( simonSpeaking )
        return;
    console.log( 'click');
    if( playerGuess && !simonSpeaking )
    {
        let next = pattern[guessIndex++];
        let guessCorrect = collidePointRect( e.offsetX, e.offsetY, next.loc.x, next.loc.y, tileSize, tileSize);
        if( !guessCorrect )
        {
            pattern = [];
            playerGuess = false;
            guessIndex = 0;
            alert( 'game over');
        }
        else if( guessCorrect && pattern.length === guessIndex)
        {
            guessIndex = 0;
            playerGuess = false;
            incPattern();
            speak();
        }
    }
    else if( !simonSpeaking )
    {
        incPattern();
        speak();
    }
}

function speak( )
{
    console.log( '-----');
    simonSpeaking = true;
    pattern[0].highlighted = true;
    setTimeout( simonSpeak, 500, 0 );
}

function simonSpeak( i )
{
    if( i >= 1)
    pattern[i-1].highlighted = false;

    if( i >= pattern.length)
    {        
        playerGuess = true;
        simonSpeaking = false;
        pattern.forEach( (p) => p.highlighted = false );
    }
    else
    {
        console.log( pattern[i]);
        pattern[i].highlighted = true;
        
        setTimeout( simonSpeak, 1000, i+1 );
    }
}