class Player
{
    constructor( x, y, cell_size)
    {
        this.x = x;
        this.y = y;
        this.cell_size = cell_size;
        this.color = color( 30, 144, 255);
        this.item = new Item(0, 0, cell_size);
    }

    keyPressed( keyEvent )
    {
        if( keyEvent.keyCode === LEFT_ARROW )
        {
            this.x -= (this.x - this.cell_size < 0) ? 0 : this.cell_size;
        }
        else if( keyEvent.keyCode === RIGHT_ARROW )
        {
            this.x += (this.x = this.cell_size > width)? 0 : this.cell_size;
        }
        else if( keyEvent.keyCode === DOWN_ARROW )
        {
            this.y += (this.y + this.cell_size *2 > height ) ? 0 : this.cell_size
        }
        else if( keyEvent.keyCode === UP_ARROW )
        {
            this.y -= (this.y - this.cell_size < 0 ) ? 0 : this.cell_size;
        }
        if( this.item !== null )
        {
            this.item.updatePositionBasedOnPlayer( this.x, this.y );
        }
    }

    update()
    {
        if( this.item != null )
        {
            
        }
    }

    draw()
    {
        //fill( 255, 255, 0, 50 )
        //ellipse( this.X + this.Width/2, this.Y + this.Height/2, this.gridSize * this.vision, this.gridSize * this.vision);

        fill( this.color );
        rect( this.x, this.y , this.cell_size, this.cell_size );
        if( this.item !== null )
        {
            this.item.draw();
        }        
    }
}