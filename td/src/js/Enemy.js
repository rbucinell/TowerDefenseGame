var id_index = 0; //static index incrementor for Enemy ID debugging

/**
 * Enemy class
 * 
 * @class Enemy
 */
class Enemy
{
    constructor()
    {
        this.Id = ++id_index;
        this.x = 0;
        this.y = 0;
        this.width = 20;
        this.height = 20;
        this.Color = "white";
        this.Health = 10;
        this.Speed = 3;
        this._path = [];
    
        this.IsMoving = false;
        this.AtGoal = false;
        this.Despawn = false;
    }

    set Path ( path )
    {
        this._path = path.slice();
        var startingPoint = this._path.shift();
    
        this.x = startingPoint.x;
        this.y = startingPoint.y;
    }
    get Path () { return this._path; }

    /**
     * Update logic for the Enemy object
     * 
     * @returns {void}
     * @memberof Enemy
     */
    update()
    {
        //don't move until flagged to go
        if( !this.IsMoving )
            return;
        
        //check if dead or at goal
        if( this.AtGoal || this.Health <= 0 )
        {
            this.Despawn = true;
            return;
        }

        var nextPoint = this.Path[0];
        var atX = false, atY = false;

        var xdist = Math.abs( this.x - nextPoint.x );
        if( xdist < this.Speed )
        {
            this.x = nextPoint.x;
            atX = true;
        }
        else
        {
            if( this.x > nextPoint.x )
            {
                this.x = this.x - this.Speed;
            }
            else
            {
                this.x = this.x + this.Speed;
            }
        }

        var ydist = Math.abs( this.y - nextPoint.y );

        if(ydist < this.Speed)
        {
            this.y = nextPoint.y;
            atY = true;
        }
        else 
        {
            if( this.y > nextPoint.y )
            {
                this.y = this.y - this.Speed;
            }
            else
            {
                this.y = this.y + this.Speed;
            }
        }
        if( atX && atY )
        {
            this.Path.shift();
            if( this.Path.length === 0 )
                this.AtGoal = true;
        }
    }

    /**
     * Draws the enemy object 
     * @param {Context2D} ctx The context to draw the enemy on
     * @memberof Enemy
     * @returns {void}
     */
    draw( ctx )
    {
        if( !this.Despawn)
        {
            ctx.fillStyle = this.Color
            ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        }
    }
}

class RedEnemy extends Enemy
{
    constructor()
    {
        super();
        this.Color = "red";
        this.Health = 1;
    }

    get Path ()
    {
        return super.Path;
    }

    set Path( val )
    {
        super.Path = val;
    }
}

class OrangeEnemy extends Enemy
{
    constructor()
    {
        super();
        this.Color = "orange";
        this.Health = 2;
    }
}


class EnemyFactory
{
    /**
     * Creates an Enemy based on type
     * 
     * @static
     * @memberof EnemyFactory
     * @param {string} type The enemy type
     * @param {any} path The path the enemy will follow
     * @returns {Enemy} an Enemy or a subclass
     */
    static createEnemy( type, path )
    {
        var parentClass = null;
        
        if( type === "red" )
        {
            parentClass = RedEnemy;
        } 
        else if( type === "orange" ) 
        {
            parentClass = OrangeEnemy;
        } 
        else 
        {
            parentClass = Enemy;
        }
    
        //Return the class, if its not found return nothing
        if( parentClass !== null ) 
        {
            var obj = new parentClass();
            obj.Path = path;
            return obj;
        }
    }
}