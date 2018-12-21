class Tile
{
    constructor(r, c, s)
    {
        this.r = r;
        this.c = c;
        this.s = s;
        this.state = 0;
    }

    getColor()
    {
        switch( this.state )
        {
            case -1:
                return 'gray' ;
            case 1:
                return 'blue' ;
            default:
                return 'white';
        }
        let x = padding + this.c * this.s;
        let y = padding + this.r * this.s;
        text(`(${this.r},${this.c})`, x, y + textSize() )
        rect(x, y, this.s, this.s );
    }
}