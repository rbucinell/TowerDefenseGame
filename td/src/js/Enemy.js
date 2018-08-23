import Entity from './Entity.js';

var id_index = 0; //static index incrementor for Enemy ID debugging

/**
 * Enemy class
 * 
 * @class Enemy
 */
export class Enemy extends Entity
{
    constructor()
    {
        super();
        this.Id = ++id_index;
        this.w = 20;
        this.h = 20;
        this.spd = 3;
        this.Color = "white";
        this._path = [];
    
        this.isMoving = false;
        this.AtGoal = false;
        this.Despawn = false;
    }

    set Path ( path )
    {
        this._path = path.slice();
        var startingPoint = this._path.shift();
        this.pos = startingPoint;
    }

    get Path() { return this._path; }

    /**
     * Update logic for the Enemy object
     * 
     * @returns {void}
     * @memberof Enemy
     */
    update()
    {
        //don't move until flagged to go
        if( !this.isMoving )
            return;
        
        //check if dead or at goal
        if( this.AtGoal || this.hp <= 0 )
        {
            this.Despawn = true;
            return;
        }

        var nextPoint = this.Path[0];
        var atX = false, atY = false;

        var xdist = Math.abs( this.pos.x - nextPoint.x );
        if( xdist < this.spd )
        {
            this.pos.x = nextPoint.x;
            atX = true;
        }
        else
        {
            this.pos.x = ( this.pos.x > nextPoint.x ) 
            ? this.pos.x - this.spd 
            : this.pos.x + this.spd;
        }

        var ydist = Math.abs( this.pos.y - nextPoint.y );

        if(ydist < this.spd)
        {
            this.pos.y = nextPoint.y;
            atY = true;
        }
        else 
        {
            if( this.pos.y > nextPoint.y )
            {
                this.pos.y = this.pos.y - this.spd;
            }
            else
            {
                this.pos.y = this.pos.y + this.spd;
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
            ctx.fillRect(this.pos.x - this.w / 2, this.pos.y - this.h / 2, this.w, this.h);
        }
    }
}

class RedEnemy extends Enemy
{
    constructor()
    {
        super();
        this.Color = "red";
        this.hp = 1;
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
        this.hp = 2;
    }
}

class GreenEnemy extends Enemy
{
    constructor()
    {
        super();
        this.Color = "green";
        this.hp = 5;
        this.spd = 5;
    }
}

export class EnemyFactory
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
        var EnemyClass = null;
        
        if( type === "red" )
        {
            EnemyClass = RedEnemy;
        } 
        else if( type === "orange" ) 
        {
            EnemyClass = OrangeEnemy;
        } 
        else if ( type === "green")
            EnemyClass = GreenEnemy;
        else 
        {
            EnemyClass = Enemy;
        }
    
        //Return the class, if its not found return nothing
        if( EnemyClass !== null ) 
        {
            var obj = new EnemyClass();
            obj.Path = path;
            return obj;
        }
    }
}