Bullet.all = {};

Bullet.max = 30;
Bullet.speed = 0.014;

Bullet.count = 0;
Bullet.active_count = 0;

Bullet.life =50;
function Bullet(){

    if(Bullet.active_count<Bullet.max){
        Bullet.count++;
        Bullet.active_count++;

        this.id = Bullet.count.toString(); 
        Bullet.all[this.id] = this;

        this.life = 0;
        this.a = Game.hero.a;

        this.x = Game.hero.points[8].x;
        this.y = Game.hero.points[8].y;

        this.modX = Math.sin(Math.PI/180*this.a)*Bullet.speed*SRC.d;
        this.modY = -Math.cos(Math.PI/180*this.a)*Bullet.speed*SRC.d;
    }

}

Bullet.draw = function(){

    for( i in Bullet.all){

        for(a in Game.toDraw){
            if(Game.toDraw[a].hitTest(Bullet.all[i].x,Bullet.all[i].y)){
                Bullet.all[i].life += Bullet.life;
                Game.toDraw[a].remove();
                break;
            }
        }

        if(Bullet.all[i].life<Bullet.life){
            
            Bullet.all[i].life++;

            Bullet.all[i].x += Bullet.all[i].modX;
            Bullet.all[i].y += Bullet.all[i].modY;

            Game.ctx.beginPath();
            Game.ctx.fillStyle = "#D7B649";
            Game.ctx.arc(Bullet.all[i].x,Bullet.all[i].y,0.0025*SRC.H,0,2*Math.PI);
            Game.ctx.closePath();
            Game.ctx.fill();

        }else{
            delete Bullet.all[i];
            Bullet.active_count--;
        }
    }
    
}