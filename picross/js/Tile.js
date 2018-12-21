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
    }
}