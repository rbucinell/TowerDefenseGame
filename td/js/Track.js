//Track.js
function Track( json )
{
    //Public Variables
    this.Name = json.name;
    this.Difficulty = json.difficulty;
    this.Map = new TrackMap( json.map );
    this.Path = new Array();
    this.Waves = new Array();

    waveEnemies = [];

    //Private Variables
    var currentWave = 0;

    //Constructor Initialization	
    var tileWidth = parseInt( json.map.tile_width );
    var tileHeight = parseInt( json.map.tile_height );

    var spawn = {
        x: parseInt( json.map.path.spawn.x ) * tileWidth + tileWidth / 2,
        y: parseInt( json.map.path.spawn.y ) * tileHeight + tileHeight / 2
    }
    this.Path.push( spawn );

    for( p in json.map.path.tiles )
    {
        var curJPath = json.map.path.tiles[ p ];
        var curPath = {
            x: parseInt( curJPath.x ) * ( tileWidth ) + tileWidth / 2,
            y: parseInt( curJPath.y ) * ( tileHeight ) + tileHeight / 2
        }
        this.Path.push( curPath );
        //this.Path.push( json.map.path.tiles[p] );
    }

    for( w in json.waves )
    {
        this.Waves.push( new Wave( this, json.waves[ w ] ) );
    }
    var waveEnemies = createWaveEnemies.apply( this );

    //////////Public functions ////////////

    //Accessors	
    this.getCurrentWave = function()
    {
        return currentWave;
    }

    this.getEnemies = function()
    {
        return waveEnemies;
    }

    this.nextWave = function() 
    {
        waveEnemies = createWaveEnemies.apply( this );
        this.Waves[ currentWave ].startWave();
        //currentWave++;
        currentWave = currentWave + 0;
    }

    //////////Private functions ////////////

    function createWaveEnemies()
    {
        waveEnemies = this.Waves[ currentWave ].Enemies;
    }

}

Track.prototype.update = function()
{
    if( this.getCurrentWave() >= this.Waves.length ) 
    {
        //TODO check enemies and life remaining determine win/lose
    } 
    else 
    {
        this.Waves[ this.getCurrentWave() ].update();
    }
}

Track.prototype.draw = function( ctx )
{
    //Draw the track's background Image
    //ctx.drawImage( this.MapImage, 0, 0, ctx.canvas.width, ctx.canvas.height);

    this.Map.draw( ctx );

    var enemies = this.Waves[ this.getCurrentWave() ].Enemies;
    //Draw the wave Enemies
    for( e in enemies )
    {
        enemies[e].draw( ctx );
    }
}