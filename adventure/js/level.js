class Level{
    constructor( config, mapdata  ){
        this.config = config;
        this.map_data = map_data;
        this.origin = this.config.rooms[this.config.origin.x][this.config.origin.y];
        this.cur_room = buildRoom( this.origin )

    }

    buildRoom( room_data)
    {
        let room = this.createGrid( this.map_data.config.rows, this.map_data.config.cols );
        for( let i = 0; i < room_data.templates.length; i++ )
        {
            let curTemplate = room_data.templates[i];
            room = applyTemplate( room, curTemplate);
        }
        room = this.applyTemplate( room, room_data.layout );
        return room;         
    }

    applyTemplate( target, template )
    {
        return target.map( (row,r) =>
        {
            return row.map( cell,c  =>{
                return cell + template[r][c];
            })
        });
    }

    createGrid( rows, cols )
    {
        let grid = [];
        for( let c = 0; c < cols; c++ )
        {
            let row = [];
            for( let r = 0; r < rows; r++ )
                row.push( 0 );
            grid.push(row);
        }
        return grid;
    }

    draw(){

    }
}