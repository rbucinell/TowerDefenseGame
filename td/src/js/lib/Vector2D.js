export default class Vector2D 
{
	constructor( x, y )
	{
		this.x = x;
		this.y = y;
	}

	dot( vector )
	{
		return this.x * vector.x + this.y * vector.y;
	}

	mag()
	{
		return Math.sqrt( Math.pow( this.x, 2) + Math.pow( this.y, 2 ) );
	}

	normal()
	{
		return Vector2D( this.x / this.mag(), this.y / this.mag() );
	}

	rot()
	{
		return Math.degrees( Math.acos( this.x / this.mag() ) );
	}

	static CreateFromRadialCord( r, deg )
	{
		const getXComp = ( degrees ) => {
			let value = 0;
			if( degrees <= 90 )
				value = Math.cos( Math.radians( degrees));
			else if( degrees > 90 && degrees <= 180 )
				value = -1 * Math.cos( Math.radians(180-degrees));
			else if( degrees > 180 && degrees <= 270)
				value = -1 * Math.sin( Math.radians( 270-degrees));
			else
				value = Math.cos( Math.radians(360-degrees));
			return value;
		}

		const getYComp = (degrees) => {
			let value = 0;
			if( degrees <= 90 )
				value = Math.sin( Math.radians( degrees));
			else if( degrees > 90 && degrees <= 180 )
				value = Math.sin( Math.radians(180-degrees));
			else if( degrees > 180 && degrees <= 270)
				value = Math.cos( Math.radians( 270-degrees));
			else
				value = -1 * Math.sin( Math.radians(360-degrees));
			return value;
		}

		return Vector2D( r * getXComp(deg), r * getYComp(deg) );
	}
}

Math.radians = function( degree )
{
	return degree * ( Math.PI / 180 );
}

Math.degrees = function( radian )
{
	return radian * ( 180/ Math.PI );
}
