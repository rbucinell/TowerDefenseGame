//Track.js

function Wave( parent, jsonobj )
{
	this.waveCounter = 0;
	
	this.Parent = parent;
	this.Name = jsonobj.name;
	this.Hint = jsonobj.hint;
	this.Enemies = new Array();
	this.isStarted = false;
		
	var factory = new EnemyFactory();
	
	for( var e = 0; e < jsonobj.enemies.length; e++ )
	{
		var quantity = jsonobj.enemies[e].qty;
		var type = jsonobj.enemies[e].type;
		
		for( var i = 0; i < quantity; i++ )
		{
			this.Enemies.push( factory.createEnemy( type, this.Parent.Path ));
		}
	}
	
	this.enemyIndex = 0;
	this.waveSpawnComplete = false;
	this.wavelength = this.Enemies.length;	
	
	this.startWave = function()
	{
		this.isStarted = true;
		function spawnEnemy( wave, i )
		{
			wave.Enemies[i].IsMoving = true;
		}
		for( var i = 0; i < this.Enemies.length; i++ )
		{
			setTimeout( spawnEnemy( this, i ), 1000*i);
		}
	}
}
/*
	setTimeout( function(){
		this.waveSpawnComplete = this.enemyIndex >= this.wavelength;
	}, 1000);
	
	
	console.log( this );	
	this.waveSpawnComplete = this.enemyIndex >= this.wavelength;
	
	if( !this.waveSpawnComplete )
	{
		this.Enemies[this.enemyIndex].IsMoving = true;
		setTimeout( this.startWave.bind( undefined, this, this.enemyIndex), 1000 );
		this.enemyIndex++;
	}
	
	/*
	this.isStarted = true;
	function spawnEnemy( wave, i )
	{
		console.log( wave.Enemies );
		console.log( 'wave ' + i + ' started' );
		wave.Enemies[i].IsMoving = true;
		if( i === wave.Enemies.length -1 )
			wave.waveSpawnComplete = true;
	}	
	var wave = this;
	for( var i = 0; i < this.Enemies.length; i++ )
	{
		setTimeout( spawnEnemy.bind( Wave, this, i ), 1000 * i);
	}
	this.update();
}*/

Wave.prototype.update = function()
{
	if( !this.isStarted )
		return;
	
	for( e in this.Enemies)
	{
		if( (typeof this.Enemies[e] === 'undefined' || this.Enemies[e].AtGoal || this.Enemies[e].Health <= 0) && this.Enemies[e].Despawn == false)
		{
			//this.Enemies.splice(e,1);
			this.Enemies[e].Despawn = true;
		}
		else
		{
			this.Enemies[e].update();
		}
		if( this.waveSpawnComplete )
		{
			this.Enemies.splice(e,1);
		}
	}
	
}

Wave.prototype.draw = function( ctx )
{
	
}