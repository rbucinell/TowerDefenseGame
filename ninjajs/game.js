var DEBUG_MODE = true;

function Game( canvas )
{
    this.canvas = canvas;
    var ctx = canvas.getContext("2d");

    var update = function()
    {

    }

    var draw = function()
    {
        /////Reset the canvas///////
        ctx.fillStyle = "#fff";
        ctx.clearRect(0,0,canvas.width,canvas.height);
        /////Draw Scene


    }

    var startup = function()
    {
        console.log( "Starting way of ninja" );

    }
    var running = function()
    {
        if( isRunning )
        {
            update();
            draw();
        }
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
}