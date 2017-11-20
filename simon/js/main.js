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

function setup()
{
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

    for( let i = 0; i < buttons.length; i++)
    {
        fill( buttons[i].name );
        rect( buttons[i].loc.x, buttons[i].loc.y, tileSize, tileSize);
    }    
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
            incPattern();
            speak(0);
        }
    }
    else if( !simonSpeaking )
    {
        console.log( e );
        incPattern();
        speak(0);
    }
}

function speak( i )
{
    if( i >= pattern.length)
    {
        simonSpeaking = false;
        playerGuess = true;
    }
    else
    {
        console.log( pattern[i]);
        setTimeout( speak( i+1),  2000 );
    }
}