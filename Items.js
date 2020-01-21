Ammo.all = {};
Ammo.count = 0;

function Ammo(){
    
    Ammo.count++;
    this.r = 0.02;
    this.id = Ammo.count.toString();
    Ammo.all[this.id] = this;
    this.x = SRC.rand(0.08*SRC.d,SRC.W-0.08*SRC.d);
    this.y = SRC.rand(0.08*SRC.d,SRC.H-0.08*SRC.d);

    
}


Ammo.draw = function(){
    


            
        if(Ammo.count !=0){
            for(i in Ammo.all){
            Game.ctx.beginPath();
            Game.ctx.strokeStyle='black';
            Game.ctx.fillStyle='yellow';
            Game.ctx.rect(Ammo.all[i].x-(Ammo.all[i].r*SRC.d)/2,Ammo.all[i].y-(Ammo.all[i].r*SRC.d)/2,Ammo.all[i].r*SRC.d,Ammo.all[i].r*SRC.d);
            Game.ctx.fill();
            Game.ctx.stroke();
            Game.ctx.closePath();
        }
    }
}

///////////////////////////////////////////////////////////////////////////////////

HP.all = {};
HP.count = 0;

function HP(){
    
    HP.count++;
    this.r = 0.02;
    this.id = HP.count.toString();
    HP.all[this.id] = this;
    this.x = SRC.rand(0.08*SRC.d,SRC.W-0.08*SRC.d);
    this.y = SRC.rand(0.08*SRC.d,SRC.H-0.08*SRC.d);

    
}


HP.draw = function(){
    
    

            
        if(HP.count !=0){
            for(i in HP.all){
            Game.ctx.beginPath();
            Game.ctx.strokeStyle='black';
            Game.ctx.fillStyle='darkred';
            Game.ctx.rect(HP.all[i].x-(HP.all[i].r*SRC.d)/2,HP.all[i].y-(HP.all[i].r*SRC.d)/2,HP.all[i].r*SRC.d,HP.all[i].r*SRC.d);
            Game.ctx.fill();
            Game.ctx.stroke();
            Game.ctx.closePath();

            Game.ctx.beginPath();
            Game.ctx.strokeStyle='white';
            Game.ctx.moveTo(HP.all[i].x,HP.all[i].y-(HP.all[i].r*SRC.d)/3);
            Game.ctx.lineTo(HP.all[i].x,HP.all[i].y+(HP.all[i].r*SRC.d)/3);
            Game.ctx.moveTo(HP.all[i].x-(HP.all[i].r*SRC.d)/3,HP.all[i].y);
            Game.ctx.lineTo(HP.all[i].x+(HP.all[i].r*SRC.d)/3,HP.all[i].y);
            Game.ctx.moveTo(HP.all[i].x,HP.all[i].y-(HP.all[i].r*SRC.d)/3);
            Game.ctx.lineTo(HP.all[i].x,HP.all[i].y+(HP.all[i].r*SRC.d)/3);
            Game.ctx.moveTo(HP.all[i].x-(HP.all[i].r*SRC.d)/3,HP.all[i].y);
            Game.ctx.lineTo(HP.all[i].x+(HP.all[i].r*SRC.d)/3,HP.all[i].y);
            Game.ctx.stroke();
            Game.ctx.closePath();

        }
    }
}