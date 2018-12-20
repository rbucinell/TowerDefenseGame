let canvasSize = 600;
let padding = 20;
let newGameButton;
let gridCount = 5;

let board;
let clues = {
    cols: [],
    rows: []
};
let sizeField;
let colConfig, rowConfig;
let grid = []
let displayGrid = {
    rows: 0,
    cols: 0,
    size: (canvasSize / gridCount) - padding
}
const intParser = e => parseInt(e);

function setup() 
{
    let span = createSpan("Grid Size")
    sizeField = createInput(gridCount, "text");
    sizeField.size(30);

    createSpan("cols:");
    colConfig = createInput("3,3,3 2,2 1 0 1", "text"); //createInput( "1,1 1 1,1 1,1 2,1", "text" );
    createSpan("rows:");
    rowConfig = createInput("1,2 1 1,2 0 2,1", "text");
    newGameButton = createButton("New Game");
    newGameButton.mousePressed(createNewGame);
    createCanvas(canvasSize, canvasSize);
    //Setup new game after elements are configured
    board = createNewGame();
}

function draw() 
{
    background('white');
    board.draw( padding );
}

function createNewGame() {
    console.log('new game clicked');
    gridCount = parseInt(sizeField.value());
    let board = new Board( gridCount, {
        cols: parseConfigToArray(colConfig, gridCount),
        rows: parseConfigToArray(rowConfig, gridCount)
    });
    board.setDisplaySize( canvasSize, padding );
    console.log( 'board valid: ' + board.isValid());
    return board;
}

function parseConfigToArray(inputField, s) {
    let ret = [];
    let strArr = inputField.value().split(' ');
    for (let i = 0; i < s; i++) {
        if (i == 2)
            console.log(strArr[i].split(',').map(intParser));
        if (strArr[i] === undefined || strArr[i] === "0")
            ret.push([]);
        else
            ret.push(strArr[i].split(',').map(intParser));

    }
    let maxLen = ret.reduce(reducer, 0);
    ret.forEach(span => {
        while (span.length < maxLen) {
            span.unshift(null);
        }
    });

    return ret;
}