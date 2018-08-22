import Atlas from './Atlas.js'

var DEBUG_MODE = true;

export default class TrackMap
{
	constructor( json )
	{
		this.json = json;
		this.Atlas = new Atlas( json.atlas_map, json.atlas_data, this);
		this.TileWidth = parseInt( json.tile_width);
		this.TileHeight = parseInt( json.tile_height);

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
	}

	LoadTiles()
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
		populateList( this.TerrainTiles, 	this.json.terrain, 	 this.TileWidth, this.TileHeight );
		populateList( this.ObjectTiles, 	this.json.objects, 	 this.TileWidth, this.TileHeight );		
		populateList( this.PathTiles, 		this.json.path.tiles, this.TileWidth, this.TileHeight );
	}

	draw( ctx )
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
		const tileCount = this.TerrainTiles.length;

		for( let i = 0; i < tileCount; i++)
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
				const tileNumber = curTerrain.texture_name.substring( 8, curTerrain.texture_name.length-4);
				ctx.fillText(tileNumber ,curTerrain.x, curTerrain.y+8); //y+8 is y+fontsize
			}
		}
		
		//Render the path
		const pathCount = this.PathTiles.length;
		for( let i = 0; i < pathCount; i++ )
		{
			const curPath = this.PathTiles[i];
			texture = this.Atlas.getTextureByName( curPath.texture_name );
			ctx.drawImage(this.Atlas.SpriteSheet, texture.x, texture.y, texture.w, texture.h,  curPath.x, curPath.y, this.TileWidth, this.TileHeight);
		}
		
		//Render the objects
		const objCount = this.ObjectTiles.length;
		for( let i = 0; i < objCount; i++ )
		{
			const curObj = this.ObjectTiles[i];
			texture = this.Atlas.getTextureByName( curObj.texture_name );
			ctx.drawImage(this.Atlas.SpriteSheet, texture.x, texture.y, texture.w, texture.h,  curObj.x, curObj.y, this.TileWidth, this.TileHeight);
		}
	}
}