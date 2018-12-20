let canvasSize = 600;
let padding = 20;
let newGameButton;
let gridCount = 5;
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

const reducer = (acc, cur) => Math.max(acc, cur.length);
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
    createNewGame();
}

function draw() 
{
    background('white');
    fill(255)
    strokeWeight(1)
    stroke(0);

    let s = displayGrid.size;
    let gCols = displayGrid.cols - gridCount;
    let gRows = displayGrid.rows - gridCount;

    //Draw base grid
    for (let c = 0; c < displayGrid.cols; c++)
        for (let r = 0; r < displayGrid.rows; r++)
            rect(padding + c * s, padding + r * s, s, s);

    drawClues(s, gCols, gRows);

    //Cover up
    rect(padding, padding, gCols * s, gRows * s);

    //Border of game area
    strokeWeight(3)
    fill(0, 0, 0, 0)
    rect(padding + gCols * s, padding + gRows * s, gridCount * s, gridCount * s);

}

function drawClues(s, gCols, gRows) 
{
    stroke(0);
    fill('darkgray');
    for (let c = 0; c < displayGrid.cols; c++) {
        for (let r = 0; r < displayGrid.rows; r++) {
            let x = padding + c * s;
            let y = padding + r * s;
            let colClues = clues.cols[c - gCols];
            let rowClues = clues.rows[r - gRows];


            if (c < gCols) {
                if (r >= gRows) {


                    if (c <= rowClues.length) {
                        if (rowClues[c] !== null)
                            text(`${rowClues[c]}`, x + s / 2, y + s / 2);
                    }
                }
            } else {
                if (r < gRows) {
                    fill('darkgray');

                    if (r <= colClues.length) {
                        if (colClues[r] !== null)
                            text(`${colClues[r]}`, x + s / 2, y + s / 2);
                    }
                }
            }
        }
    }
}

function createGrid(s) {
    let g = [];
    for (let i = 0; i < s; i++)
        g.push(new Array(s));
    return g;
}

function createNewGame() {
    console.log('new game clicked');
    gridCount = parseInt(sizeField.value());
    grid = createGrid(gridCount);
    clues.cols = parseConfigToArray(colConfig, gridCount);
    clues.rows = parseConfigToArray(rowConfig, gridCount);
    console.log('cols', clues.cols);
    console.log('rows', clues.rows);


    //In order to calculate the number of columsn we need to konw the longest clue row + gridCount
    displayGrid.cols = clues.rows.reduce(reducer, 0) + gridCount;
    //and vise-versa
    displayGrid.rows = clues.cols.reduce(reducer, 0) + gridCount;

    console.log(displayGrid);
    displayGrid.size = (canvasSize - padding * 2) / Math.max(displayGrid.cols, displayGrid.rows);
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