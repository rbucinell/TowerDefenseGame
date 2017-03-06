
function TrackInterface( canvas, track ) 
{
	this.canvas = canvas;
	this.Track = track;
	
	
	
	this.StartWaveButton = new Button( this.getLeftEdge(),80, 100, 30, "#55F", "Next Wave" );
	
}

TrackInterface.prototype.getLeftEdge = function()
{
	return this.Track.Map.TileWidth * this.Track.Map.MapTileWidth+ this.Track.Map.TileWidth + 10;
}

TrackInterface.prototype.update = function()
{
	
}

TrackInterface.prototype.draw = function( ctx )
{
	var startX = this.getLeftEdge();
	
	//draw track first so rest of interface always on top
	this.Track.draw( ctx );
	
	//Draw the Title	
	ctx.font = "30px Arial";
	ctx.fillStyle = "#0000FF";
	ctx.fillText( this.Track.Name,startX,40);
	
	//Draw the Wave information
	
	ctx.font = "12px Arial";
	ctx.fillStyle = "#000000";	
	
	var waveNum = this.Track.getCurrentWave();	
	if( waveNum < this.Track.Waves.length )
	{
		ctx.fillText( "["+(waveNum+1)+"] - " + this.Track.Waves[ waveNum ].Name,startX,60);
	}
	else
	{
		ctx.fillText( "[FINAL WAVE]", startX, 60);
	}
	
	this.StartWaveButton.draw( ctx );
}

TrackInterface.prototype.handleMouseUp = function( event )
{
	var mX = event.x - this.canvas.getBoundingClientRect().left;
	var mY = event.y - this.canvas.getBoundingClientRect().top;
	
	if( this.StartWaveButton.hitTest( mX, mY ) )
	{
		this.StartWaveButton.handleMouseUp( event );
		if( this.Track.getCurrentWave() <=  this.Track.Waves.length -1 )
			this.Track.nextWave();
		else
			console.log( 'out of waves' );
	}
}