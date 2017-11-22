class Player
{
    constructor( x, y, config)
    {
        this._x = x;
        this._y = y;
        this.config = config;
        
        this.color = color( 30, 144, 255);
        this._width = 1;
        this._height = 1;
        this.vision = 6;
    }

    get X()
    {
        return this._x;
    }
    set X( val )
    {
        this._x = val;
    }
    get Col()
    {
        return this._x;
    }

    get Y()
    {
        return this._y;
    }
    set Y( val )
    {
        this._y = val;
    }
    get Row()
    {
        return this._y;
    }

    get Width()
    {
        return this._width * this.config.grid.colWidth;
    }

    get Height()
    {
        return this._height * this.config.grid.rowHeight;
    }

    keyPressed( keyEvent )
    {
        if( keyEvent.keyCode === LEFT_ARROW )
        {
            if( this.X > 0)
                this.X--;
        }
        else if( keyEvent.keyCode === RIGHT_ARROW )
        {
            this.X++;
            if( this.X == this.config.grid.cols )
                this.X--;
        }
        else if( keyEvent.keyCode === DOWN_ARROW )
        {
            this.Y++;
            if( this.Y == this.config.grid.rows)
                this.Y--;
        }
        else if( keyEvent.keyCode === UP_ARROW )
        {
            if( this.Y > 0)
                this.Y--;
        }
    }

    update()
    {

    }

    draw()
    {
        //fill( 255, 255, 0, 50 )
        //ellipse( this.X + this.Width/2, this.Y + this.Height/2, this.gridSize * this.vision, this.gridSize * this.vision);

        fill( this.color );
        rect( this.X * this.config.grid.colWidth, this.Y * this.config.grid.rowHeight, this.Width, this.Height );
        
    }
}