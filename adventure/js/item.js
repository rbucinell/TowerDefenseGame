class Item{
    constructor( x, y, cell_size)
    {
        this.x = x;
        this.y = y;
        this.cell_size = cell_size;
    }

    updatePositionBasedOnPlayer( playerX, playerY)
    {
        this.x = playerX + this.cell_size + 5;
        this.y = playerY - 5;
    }

    draw()
    {
        fill('green');
        rect( this.x, this.y, 10, 10 );
    }
}