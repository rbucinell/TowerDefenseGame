class Map
{
    constructor( config )
    {
        this.config = config;
        this.player = new Player( this.config.grid.cols/2, this.config.grid.rows/2, config );
        this.grid = [];

        for( let r = 0; r < config.grid.rows; r++)
        {
            let row = [];
            for( let c = 0; c < config.grid.cols; c++)
                row.push( {
                    "r": r, 
                    "c": c, 
                    "x": c * this.config.grid.colWidth, 
                    "y": r * this.config.grid.rowHeight,
                    visible: false,
                    color: (r%2===0 && c%2===0) ? 'red': 'white'
                });
            this.grid.push( row );
        }
        this.setVisibleSquares( this.player.Row, this.player.Col, this.player.vision );
    }

    setVisibleSquares( r, c, distance )
    {
        for( let r = 0; r < this.config.grid.rows; r++)
            for( let c = 0; c < this.config.grid.cols; c++)
                this.grid[r][c].visible = false;
        
        
        for( let dist = distance; dist > 0; dist--)
        {
            let x = dist-1;
            let y = 0
            let dx = 1;
            let dy = 1;
            let err = dx - ( dist << 1 );
    
            while( x >= y )
            {
                this.grid[r + y][c + x].visible = true;
                this.grid[r + x][c + y].visible = true;
                this.grid[r + x][c - y].visible = true;
                this.grid[r + y][c - x].visible = true;
                this.grid[r - y][c - x].visible = true;
                this.grid[r - x][c - y].visible = true;
                this.grid[r - x][c + y].visible = true;
                this.grid[r - y][c + x].visible = true;
    
                if (err <= 0)
                {
                    y++;
                    err += dy;
                    dy += 2;
                }
                if (err > 0)
                {
                    x--;
                    dx += 2;
                    err += (-dist << 1) + dx;
                }
            }
        }

        /*
        //BFS Solution
        let queue = [];
        let visited = [];
        queue.push( { r: r, c: c, d: 0} );
        while( queue.length != 0)
        {
            var cur = queue.shift();
            visited.push(cur);
            this.grid[cur.r][cur.c].visible = true;
            if( cur.d < dist )
            {
                let neighbors =  [];
                if( cur.r -1 >= 0 )
                    neighbors.push( { r: cur.r - 1 , c: cur.c, d: cur.d + 1} );
                if( cur.c + 1 < this.config.grid.cols )
                    neighbors.push( { r: cur.r, c: cur.c + 1, d: cur.d + 1} );
                if( cur.r + 1 < this.config.grid.rows )
                    neighbors.push( { r: cur.r + 1 , c: cur.c, d: cur.d + 1} );
                if( cur.c -1 >= 0 )
                    neighbors.push( { r: cur.r, c: cur.c - 1, d: cur.d + 1} );
                neighbors = neighbors.filter( (n) => visited.indexOf( n ) === -1 );
                neighbors.forEach( (n) => queue.push( n )) ;
            }
        }*/

    }

    keyPressed( keyEvent )
    {
        this.player.keyPressed( keyEvent );
        this.setVisibleSquares( this.player.Row, this.player.Col, this.player.vision );
    }

    

    draw()
    {
        this.player.draw();
        for( let r = 0; r < this.config.grid.rows; r++)
            for( let c = 0; c < this.config.grid.cols; c++)
            {
                if( this.grid[r][c].visible )
                    fill( this.grid[r][c].color );
                else
                    fill( 0,0,0,0);
                rect( this.grid[r][c].x, this.grid[r][c].y, this.config.grid.colWidth, this.config.grid.rowHeight);
            }
        this.player.draw();

    }
}