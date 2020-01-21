
Zombie.count = 0;

Zombie.acc = 0.0014;

function Zombie(){

    Zombie.count++;


    this.r = 0.017;
    this.rear_a = 50;

    this.id = Zombie.count.toString(); 
    
    Game.toDraw[this.id] = this;

    this.a = 0;

    
    
        this.positions = [{
            //left-top
            x: SRC.rand(0,SRC.W/2),
            y: SRC.rand(0,SRC.H/2)
            
        },
        {
            //right-top
            x: SRC.rand(SRC.W/2,SRC.W),
            y: SRC.rand(0,SRC.H/2)
        },
        {
            //left-down
            x: SRC.rand(0,SRC.W/2),
            y: SRC.rand(SRC.H/2,SRC.H)
        },
        {
            //right-top
            x: SRC.rand(SRC.W/2,SRC.W),
            y: SRC.rand(SRC.H/2,SRC.H)
        }];

        for(i=0;i<4;i++){
            if(this.positions[i].x<Game.hero.x+0.07*SRC.d && this.positions[i].x>Game.hero.x-0.07*SRC.d){
                this.positions[i].x+=0.125*SRC.d;
            }
            if(this.positions[i].y<Game.hero.y+0.07*SRC.d && this.positions[i].y>Game.hero.y-0.07*SRC.d){
                this.positions[i].y+=0.125*SRC.d;
            }
        }
    this.position = SRC.rand(0,4);

    this.x = this.positions[this.position].x;
    this.y = this.positions[this.position].y;    
    
    
    this.modX = 0;
    this.modY = 0;
    
    this.hp = 100;


}
Zombie.prototype.hitTest = function(x,y){
    if(x>this.x-this.r*SRC.d && x<this.x+this.r*SRC.d && y>this.y-this.r*SRC.d && y<this.y+this.r*SRC.d){
    if(Game.ctx.getImageData(x,y,1,1).data[0]==255){
        return true;
    }
}
    return false;

}

Zombie.prototype.remove = function(){
    Game.toDraw[this.id].hp -= 33;
    if(Game.toDraw[this.id].hp<=0){
        Zombie.count--;
        Hero.zombie_killed++;
        delete Game.toDraw[this.id];
    }
}

Zombie.prototype.draw = function(){
   
    
        // if(Math.abs(Game.hero.x-this.x)>Math.abs(Game.hero.y-this.y)){
        //     this.modX = Zombie.acc*1.2*SRC.d;
        //     this.modY = Zombie.acc*SRC.d;
        // }else if(Math.abs(Game.hero.x-this.x)<Math.abs(Game.hero.y-this.y)){
        //     this.modX = Zombie.acc*SRC.d;
        //     this.modY = Zombie.acc*1.2*SRC.d;

        // }else{
        //     this.modX = Zombie.acc*SRC.d;
        //     this.modY = Zombie.acc*SRC.d;
        // }

        this.modX=Math.sin(Math.atan2(Game.hero.x-this.x,Game.hero.y-this.y))*Zombie.acc*SRC.d;
    	this.modY=Math.cos(Math.atan2(Game.hero.x-this.x,Game.hero.y-this.y))*Zombie.acc*SRC.d;


        if(Hero.hp<=0){
            this.modX=0;
            this.modY=0;
        }

        this.x+=this.modX;
        this.y+=this.modY;
        // if(Game.hero.x>this.x && Game.hero.y>this.y){
        //     this.x += this.modX;
        //     this.y += this.modY;
        // }else if(Game.hero.x<this.x && Game.hero.y<this.y){
        //     this.x -= this.modX;
        //     this.y -= this.modY;
        // }else if(Game.hero.x>this.x && Game.hero.y<this.y){
        //     this.x += this.modX;
        //     this.y -= this.modY;
        // }else if(Game.hero.x<this.x && Game.hero.y>this.y){
        //     this.x -= this.modX;
        //     this.y += this.modY;
        // }else if(Game.hero.x<this.x && Game.hero.y==this.y){
        //     this.x -= this.modX;
        //     this.y = this.y;
        // }else if(Game.hero.x==this.x && Game.hero.y<this.y){
        //     this.x = this.x;
        //     this.y -= this.modY;
        // }else if(Game.hero.x>this.x && Game.hero.y==this.y){
        //     this.x += this.modX;
        //     this.y = this.y;
        // }else if(Game.hero.x==this.x && Game.hero.y>this.y){
        //     this.x = this.x;
        //     this.y += this.modY;
        // }else if(Game.hero.x==this.x && Game.hero.y==this.y){
        //     this.x = this.x;
        //     this.y = this.y;
        // }


        Game.ctx.beginPath();
        Game.ctx.fillStyle='red';
        Game.ctx.strokeStyle='red';
        Game.ctx.arc(this.x,this.y,this.r*SRC.d,0,2*Math.PI);
        Game.ctx.closePath();
        Game.ctx.fill();
        Game.ctx.stroke();

}
