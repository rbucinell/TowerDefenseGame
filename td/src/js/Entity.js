export default class Entity 
{
    constructor() 
    {
        this.pos = { 
            x: 0, 
            y: 0
        };
        this.w = 0; //width
        this.h = 0; //height
        this.range = 0; //range
        this.hp = 10; //health
        this.spd = 1;//speed
    }

    update(){}

    draw(){}
}