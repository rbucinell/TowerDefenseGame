function TrackMap( json )
{
	this.Atlas = new Atlas();
	this.Atlas.Load( json.atlas_map, json.atlas_data, this );
	
	this.TileWidth = parseInt( json.tile_width );
	this.TileHeight = parseInt(json.tile_height);
	
	this.MapTileWidth = json.map_tile_width;
	this.MapTileHeight = json.map_tile_height;
	
	this.width = this.TileWidth * this.MapTileWidth;
	this.height = this.TileHeight * this.MapTileHeight;
	
	this.BaseColor = json.base_color;
	this.BackgroundImage = json.background_img;
	
	this.TerrainTiles = [];
	this.PathTiles = [];
	this.ObjectTiles = [];
	
	//Builds the arrays of objects for each of the map arrays
	//This will be called after the Atlas Finishes loading
	this.LoadTiles = function()
	{	
		function populateList( list, jsonArr, tWidth, tHeight )
		{
			for( var t in jsonArr )
			{
				var tile = jsonArr[t];
				tile.x = tile.x * tWidth;
				tile.y = tile.y * tHeight;
				list.push( jsonArr[t] );
			}
		}		
		populateList( this.TerrainTiles, 	json.terrain, 	 this.TileWidth, this.TileHeight );
		populateList( this.ObjectTiles, 	json.objects, 	 this.TileWidth, this.TileHeight );		
		populateList( this.PathTiles, 		json.path.tiles, this.TileWidth, this.TileHeight );
	}
}

TrackMap.prototype.draw = function( ctx )
{	
	//Render Order: Background -> terrain -> path -> objects
	
	//Render the Background
	ctx.fillStyle = this.BaseColor;
	ctx.fillRect(0, 0, this.width, this.height);
	
	if( this.Atlas.Textures.length === 0 )
	{
		console.log( "Textures for atlas have not loaded!");
		return;
	}
	
	//Render the Terrain
	var tileCount = this.TerrainTiles.length;
	for( var i = 0; i < tileCount; i++)
	{
		var curTerrain = this.TerrainTiles[i];
		var texture = this.Atlas.getTextureByName( curTerrain.texture_name );
		
		//Draw the terrain 
		ctx.drawImage(this.Atlas.SpriteSheet, texture.x, texture.y, texture.w, texture.h,  curTerrain.x, curTerrain.y, this.TileWidth, this.TileHeight);
		
		//Debug tile border and tile name
		if (typeof DEBUG_MODE !== 'undefined' && DEBUG_MODE === true) {
			ctx.strokeStyle = "lightgray";
			ctx.strokeRect(curTerrain.x, curTerrain.y, this.TileWidth, this.TileHeight);
			
			ctx.fillStyle = "black";
			ctx.font = "8px Arial";
			var tileNumber = curTerrain.texture_name.substring( 8, curTerrain.texture_name.length-4);
			ctx.fillText(curTerrain.texture_name.substring( 8, curTerrain.texture_name.length-4) ,curTerrain.x, curTerrain.y+8); //y+8 is y+fontsize
		}
	}
	
	//Render the path
	var pathCount = this.PathTiles.length;
	for( i = 0; i < pathCount; i++ )
	{
		var curPath = this.PathTiles[i];
		texture = this.Atlas.getTextureByName( curPath.texture_name );
		ctx.drawImage(this.Atlas.SpriteSheet, texture.x, texture.y, texture.w, texture.h,  curPath.x, curPath.y, this.TileWidth, this.TileHeight);
	}
	
	//Render the objects
	var objCount = this.ObjectTiles.length;
	for( i = 0; i < objCount; i++ )
	{
		var curObj = this.ObjectTiles[i];
		texture = this.Atlas.getTextureByName( curObj.texture_name );
		ctx.drawImage(this.Atlas.SpriteSheet, texture.x, texture.y, texture.w, texture.h,  curObj.x, curObj.y, this.TileWidth, this.TileHeight);
	}
	
	//Render the objects
	var objCount = this.ObjectTiles.length;
	for( i = 0; i < objCount; i++ )
	{
		var curObj = this.ObjectTiles[i];
		texture = this.Atlas.getTextureByName( curObj.texture_name );
		ctx.drawImage(this.Atlas.SpriteSheet, texture.x, texture.y, texture.w, texture.h,  curObj.x, curObj.y, this.TileWidth, this.TileHeight);
	}
};