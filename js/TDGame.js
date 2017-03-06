// Main TD Game Application File

var DEBUG_MODE = true

function TDGame( canvas )
{
	this.canvas = canvas;
	var ctx = canvas.getContext("2d");
	//factory pattern: https://carldanley.com/js-factory-pattern/
	//inheritance: http://stackoverflow.com/questions/2064731/good-example-of-javascripts-prototype-based-inheritance
	//inheritance: http://javascript.crockford.com/inheritance.html
	//docs: https://developer.mozilla.org/en-US/
	
	var framerate     = 60;
	var intervalID    = -1;
	var isRunning     = false;
	
	var trackInterface;
	var currentTrack;
	
	var handleMouseUp = function( event )
	{
		console.log( 'game click' );
		trackInterface.handleMouseUp( event );
	}
	
	var update = function()
	{
		//Nothing to update yet
		currentTrack.update();
	}
	
	var draw = function()
	{
		/////Reset the canvas///////
        ctx.fillStyle = "#fff";
        ctx.clearRect(0,0,canvas.width,canvas.height);
		
		/////Draw objects///////////
		//currentTrack.draw( ctx );
		
		/////Draw interface///////////
		trackInterface.draw( ctx );
		
	}
	
    var running = function()
    {
        if( isRunning )
        {
            update();
            draw();
        }
    }
	
	var startup = function()
	{
		console.log( 'Starting simulation');
		$.get( "data/track1.json", function(json){
			currentTrack = loadTrack( JSON.parse(json) );
			trackInterface = new TrackInterface( canvas, currentTrack );
			isRunning = true;
			intervalID = setInterval( running, 1000 / framerate );
		});
	}
	
	var shutdown = function()
    {
        console.log( "Shutting down simulation" );
    }
	
	this.run = function()
    {
		startup();
        
    };

	
	this.stop = function()
    {
        running = false;
        clearInterval( intervalID );
        shutdown();
    };
	
	var loadTrack = function( trackJSON )
	{
		return new Track( trackJSON );
	}
	
	
	canvas.addEventListener( 'mouseup', handleMouseUp, false);
	
}
