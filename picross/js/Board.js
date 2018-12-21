const LargestElement = (acc, cur) => Math.max(acc, cur.length);
const SpanVal = ( acc, cur ) => cur === null ? acc : acc + cur + 1;
const CalcVals = span =>  Math.max(0, (span.reduce( SpanVal, 0 ) -1));

class Board 
{
    constructor( s, clues )
    {
        this.size = s;
        this.clues = clues;
        this.grid = [];
        for (let i = 0; i < s; i++)
        {
            let arr = [];
            for( let j = 0; j < s; j++)
            {
                arr.push( new Tile());
            }
            this.grid.push( arr );
        }
            this.grid.push(new Array(s));

        this.display = {
            //In order to calculate the number of columsn we need to konw the longest clue row + gridCount
            cols: clues.rows.reduce(LargestElement, 0) + s,
            //and vise-versa
            rows: clues.cols.reduce(LargestElement, 0) + s
        }
    }
    
    setDisplaySize( canvasSize, padding )
    {
        this.display.size = (canvasSize - padding * 2) / Math.max(this.display.cols, this.display.rows);
    }

    draw( padding )
    {
        strokeWeight( 1 );
        let s = this.display.size;
        let gCols = this.display.cols - this.size;
        let gRows = this.display.rows - this.size;

        //Draw base grid
        for (let c = 0; c < this.display.cols; c++)
            for (let r = 0; r < this.display.rows; r++)
                rect(padding + c * s, padding + r * s, s, s);

        this.drawClues(s, gCols, gRows, padding);

        //Cover up
        rect(padding, padding, gCols * s, gRows * s);

        //Border of game area
        strokeWeight(3)
        fill(0, 0, 0, 0)
        rect(padding + gCols * s, padding + gRows * s, gridCount * s, gridCount * s);
    }

    drawClues(s, gCols, gRows, padding) 
    {
        stroke(0);
        fill('darkgray');
        for (let c = 0; c < this.display.cols; c++) {
            for (let r = 0; r < this.display.rows; r++) {
                let x = padding + c * s;
                let y = padding + r * s;
                let colClues = this.clues.cols[c - gCols];
                let rowClues = this.clues.rows[r - gRows];

                if (c < gCols) {
                    if (r >= gRows && c <= rowClues.length) 
                        if (rowClues[c] !== null)
                            text(`${rowClues[c]}`, x + s / 2, y + s / 2);
                } 
                else 
                {
                    if (r < gRows && r <= colClues.length) 
                        if (colClues[r] !== null)
                            text(`${colClues[r]}`, x + s / 2, y + s / 2);
                }
            }
        }
    }

    get ColClueVals()
    {
        console.log(this.clues.cols.map( CalcVals ));
        
        return this.clues.cols.map( CalcVals );
    }

    get RowClueVals()
    {
        return this.clues.rows.map( CalcVals );
    }

    areCluesValid()
    {
        const CountGreaterThanSize = count => count > this.size;
        
        let colValid = !(this.ColClueVals.some( CountGreaterThanSize ));
        let rowValid = !(this.RowClueVals.some( CountGreaterThanSize ));
        console.log( 'areCluesValid', colValid, rowValid );
        return colValid && rowValid;
    }
}