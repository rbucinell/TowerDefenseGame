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
        rect( this.x * this.cell_size.width, this.y * this.cell_size.height, this.cell_size.width, this.cell_size.height );
        if( this.item !== null )
        {
            this.item.draw();
        }        
    }
}