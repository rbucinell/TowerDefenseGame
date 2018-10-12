class Item{
    constructor( x, y, cell_size)
    {
        this.x = x;
        this.y = y;
        this.cell_size = cell_size;
    }

    updatePositionBasedOnPlayer( playerX, playerY)
    {
        this.x = playerX * this.cell_size.width + this.cell_size.width + 5;
        this.y = playerY * this.cell_size.height - 5;
    }

    draw()
    {
        fill('green');
        rect( this.x, this.y, 10, 10 );
    }
}