Hero.hp = 100;
Hero.zombie_killed = 0;
function Hero(){

    this.r = 0.02;
    this.rear_a = 50;
    this.ammo = 30;
    this.magazine = 300;
    this.a = 0;
    this.x = SRC.W/2;
    this.y = SRC.H/2;    

    this.modX = 0;
    this.modY = 0;
    this.acc = 0.0003;
    this.acc_back = 0.00015;
    

    this.maxMod = 0.0040;
    this.points = [{},{},{},{},{},{},{},{},{}];
}

Hero.prototype.hitTest = function(){
    for(i=0;i<7;i++){
        for(var a in Game.toDraw){
            if(Game.toDraw[a].hitTest(this.points[i].x,this.points[i].y)){
               if(SRC.phase<5){ 
               Hero.hp -= 0.75;
               }else{
                Hero.hp -= 0.5;
               }   
            }
        }
    }

    if(Ammo.count != 0){
        for(i in Ammo.all){

            for(a=0;a<9;a++){
            if(this.points[a].x>Ammo.all[i].x-Ammo.all[i].r/2*SRC.d && this.points[a].x<Ammo.all[i].x+Ammo.all[i].r/2*SRC.d && this.points[a].y>Ammo.all[i].y-Ammo.all[i].r/2*SRC.d && this.points[a].y<Ammo.all[i].y+Ammo.all[i].r/2*SRC.d){
                Ammo.count--;
                this.magazine +=30;
                delete Ammo.all[i];
                break;
            }
        }
    }
}

    if(HP.count != 0){
        for(i in HP.all){

            for(a=0;a<9;a++){
            if(this.points[a].x>HP.all[i].x-HP.all[i].r/2*SRC.d && this.points[a].x<HP.all[i].x+HP.all[i].r/2*SRC.d && this.points[a].y>HP.all[i].y-HP.all[i].r/2*SRC.d && this.points[a].y<HP.all[i].y+HP.all[i].r/2*SRC.d){
                HP.count--;
                Hero.hp + 50 > 100 ? Hero.hp=100 : Hero.hp +=50;
                delete HP.all[i];
                break;
            }
        }
    }
}
}

Hero.prototype.ammo_check = function(){

    
    Game.ctx.beginPath();
    Game.ctx.fillStyle='black';
    Game.ctx.strokeStyle='black';
    Game.ctx.font = 0.013*SRC.d+"px Impact";
    Game.ctx.fillText("Reloading...",Game.hero.x+0.034*SRC.d,Game.hero.y+0.039*SRC.d);
    Game.ctx.closePath();
    
    setTimeout(function(){
        if(Game.hero.ammo==0 && Game.hero.ammo<=30){ 
        Game.hero.ammo+=30;
        Game.hero.magazine-=30;
        }
    },3000)
      
}

Hero.prototype.no_ammo = function(){

    
    Game.ctx.beginPath();
    Game.ctx.fillStyle='black';
    Game.ctx.strokeStyle='black';
    Game.ctx.font = 0.013*SRC.d+"px Impact";
    Game.ctx.fillText("NO AMMO",Game.hero.x+0.026*SRC.d,Game.hero.y+0.039*SRC.d);
    Game.ctx.closePath();
      
}

Hero.prototype.draw = function(){
    
    //rules
    if(Zombie.count==0){
        SRC.phase++;
        
        let n = Math.floor(3.5*SRC.phase);
        for(i=0;i<n;i++){
            new Zombie();
        }

        if(SRC.phase % 2 == 0 && HP.count==0){
            new HP();
        }
        if(Ammo.count==0){
        new Ammo();  
        }
    }

    if(SRC.phase >= 4 && SRC.phase <= 6){
        Bullet.speed = 0.018;
        Zombie.acc =  0.0017;
    }else if(SRC.phase > 6){
        Bullet.speed = 0.02;
        Zombie.acc =  0.002;
    }
    //

    if(Game.key_68 || Game.key_65){

    this.a = Game.key_68 ? this.a + 5 : this.a-5;
    }

    if(Game.key_87){

        this.modX = Math.max(-this.maxMod*SRC.d, Math.min(this.maxMod*SRC.d, this.modX+Math.sin(Math.PI/180*this.a)*this.acc*SRC.d));
		this.modY = Math.max(-this.maxMod*SRC.d, Math.min(this.maxMod*SRC.d, this.modY-Math.cos(Math.PI/180*this.a)*this.acc*SRC.d));
    }else if(Game.key_83){

        this.modX = Math.max(-this.maxMod*SRC.d, Math.min(this.maxMod*SRC.d, this.modX-Math.sin(Math.PI/180*this.a)*this.acc_back*SRC.d));
		this.modY = Math.max(-this.maxMod*SRC.d, Math.min(this.maxMod*SRC.d, this.modY+Math.cos(Math.PI/180*this.a)*this.acc_back*SRC.d));

    }
    else{

        this.modX = this.modX*0.92;
        this.modX = Math.abs(this.modX)<0.0001 ? 0 : this.modX;
        this.modY = this.modY*0.92;
        this.modY = Math.abs(this.modY)<0.0001 ? 0 : this.modY;
    }

        this.x += this.modX;
        this.y += this.modY;
    

    
    this.hitTest();
    
     

    if(Hero.hp>0){
    Game.ctx.fillStyle='black';
    Game.ctx.beginPath();
    Game.ctx.strokeStyle='black';
    Game.ctx.arc(this.x,this.y,this.r*SRC.d,0,2*Math.PI);
    Game.ctx.stroke();
    Game.ctx.fill();
    Game.ctx.closePath();
    

    Game.ctx.beginPath();
    Game.ctx.strokeStyle='black';
    for (var i = 0; i < 3; i++) {
        
        this.tmp_a = i===0 ? this.a : (this.a+180 + (i==1 ? this.rear_a : -this.rear_a));
        
        this.tmp_r = this.r;
       
        this.points[i].x = (Math.sin(Math.PI/180*this.tmp_a)*this.tmp_r*SRC.d)+this.x;
        this.points[i].y = (-Math.cos(Math.PI/180*this.tmp_a)*this.tmp_r*SRC.d)+this.y;
        
        Game.ctx[i===0?'moveTo':'lineTo'](this.points[i].x,this.points[i].y);
    }
    Game.ctx.closePath()
    Game.ctx.stroke();
    
    Game.ctx.beginPath();
    Game.ctx.strokeStyle='black';
    for (var i = 3; i <6; i++) {
        
        this.tmp_a = i===3 ? this.a : (this.a+180 + (i==4 ? this.rear_a : -this.rear_a));
        
        this.tmp_r = this.r;
       
        this.points[i].x = (Math.sin(Math.PI/180*this.tmp_a)*this.tmp_r*SRC.d)+this.x;
        this.points[i].y = (Math.cos(Math.PI/180*this.tmp_a)*this.tmp_r*SRC.d)+this.y;
        
        Game.ctx[i===0?'moveTo':'lineTo'](this.points[i].x,this.points[i].y);
    }
    Game.ctx.closePath()
    Game.ctx.stroke();

    Game.ctx.beginPath();
    Game.ctx.strokeStyle='#625951';
    for (var i = 7; i < 9; i++) {
        
        this.tmp_a = i===8 ? this.a : this.a+180;
        
        this.tmp_r = this.r+0.007;
       
        if(i==7){
            this.points[i].x = (Math.sin(Math.PI/180*this.tmp_a)*this.r*SRC.d)+this.x;
            this.points[i].y = (-Math.cos(Math.PI/180*this.tmp_a)*this.r*SRC.d)+this.y;

        }else{
        this.points[i].x = (Math.sin(Math.PI/180*this.tmp_a)*this.tmp_r*SRC.d)+this.x;  
        this.points[i].y = (-Math.cos(Math.PI/180*this.tmp_a)*this.tmp_r*SRC.d)+this.y;
        } 
        
        Game.ctx[i===6?'moveTo':'lineTo'](this.points[i].x,this.points[i].y);
    }
    Game.ctx.closePath()
    Game.ctx.stroke();    
    
    this.points[6].x = this.x;
    this.points[6].y = this.y;

    



    if(Game.hero.x>SRC.W-Game.hero.r*SRC.d){
        Game.hero.x = SRC.W-Game.hero.r*SRC.d;
    }
    if(Game.hero.x<0+Game.hero.r*SRC.d){
        Game.hero.x=0+Game.hero.r*SRC.d;
    }
    if(Game.hero.y<0+Game.hero.r*SRC.d){
        Game.hero.y=0+Game.hero.r*SRC.d;
    }
    if(Game.hero.y>SRC.H-Game.hero.r*SRC.d){
        Game.hero.y=SRC.H-Game.hero.r*SRC.d;;
    }


    }

    if(Hero.hp<=0){
        SRC.lastTime = 1000000;
        Game.end_game();
    }


    }
