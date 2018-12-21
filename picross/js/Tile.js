class Tile
{
    constructor(x, y, s)
    {
        this.x = x;
        this.y = y;
        this.s = s;
        this.state = 0;
    }

    draw()
    {
        switch( this.state )
        {
            case 0:
                fill( 'white' );
                break;
            case -1:
                fill( 'gray' );
                break;
            case 1:
                fill( 'blue' );
                break;
        }
        rect(this.x, this.y, this.s, this.s );
    }
}