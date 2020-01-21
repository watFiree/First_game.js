window.onload = function() {
    Game.init();
    alert("Hello  \nWASD - move \nEnter - shoot  \nYellow boxes - extra ammo  \nRed boxes - extra health  \nHave fun !")
};

SRC = {

    fps:60,
    W:0,
    H:0,
    lastTime:0,
    phase:0,
    rand:function(min,max){
        return Math.floor(Math.random()*(max-min)+min);
    }
};


Game = {
    toDraw : {},
    init:function(){

        Game.canvas = document.createElement('canvas');
        Game.hit_canvas = document.createElement('canvas');
        Game.ctx = Game.canvas.getContext('2d');
        Game.layout();

        window.addEventListener('resize',Game.layout,false);
        document.body.appendChild(Game.canvas);
        
        Game.hero = new Hero();
        
        
        window.addEventListener('keydown',Game.onKey,false);
        window.addEventListener('keyup',Game.onKey,false); 

        Game.animation();
    },




    
    onKey:function(event){

        if(event.keyCode==87 || event.keyCode==83 || event.keyCode==68 || event.keyCode==65 || event.keyCode==13){
            event.preventDefault();

            if(event.type == 'keydown' && !Game['key_'+event.keyCode]){

                Game['key_' + event.keyCode]= true;

                if(event.keyCode==68){
                    Game.key_65=false;
                    
                }else if(event.keyCode==65){
                    Game.key_69=false;
                    
                }else if(event.keyCode==13){
                    if(Game.hero.ammo!=0){
                    new Bullet();
                    Game.hero.ammo--;
                    }
                }
            }
            if(event.type == 'keyup'){
                Game['key_'+event.keyCode] = false;
            }
        }
    },

    layout:function(){


        SRC.H = window.innerHeight-(window.innerHeight*0.1);
        SRC.W = window.innerWidth-(window.innerWidth*0.3);

        SRC.d = Math.min(SRC.H,SRC.W);

        Game.canvas.width = SRC.W;
        Game.canvas.height = SRC.H;


    },
    hub_draw: function(){
        
        let phases_text = `Phase nr. ${SRC.phase}`;
        Game.ctx.beginPath();
        Game.ctx.fillStyle='black';
        Game.ctx.strokeStyle='black';
        Game.ctx.font = 0.045*SRC.H+"px Impact";
        Game.ctx.textAlign = "center";
        Game.ctx.textBaseline = "top";
        Game.ctx.fillText(phases_text,SRC.W/2,0);
        Game.ctx.closePath();
        
        if(Hero.hp<=0){
            Hero.hp = 0;
        }
        let hp_text = `HP : ${Hero.hp}`;
        Game.ctx.beginPath();
        Game.ctx.fillStyle='red';
        Game.ctx.strokeStyle='red';
        Game.ctx.font = 0.065*SRC.H+"px Impact";
        Game.ctx.textAlign = "left";
        Game.ctx.textBaseline = "bottom";
        Game.ctx.fillText(hp_text,3,SRC.H);
        Game.ctx.closePath();
        
        let ammo_text = `Ammo: ${Game.hero.ammo}`;
        let magazine_text = `/${Game.hero.magazine}`;
        if(Game.hero.magazine<100) magazine_text = `/0${Game.hero.magazine}`;
        if(Game.hero.magazine<10)  magazine_text = `/00${Game.hero.magazine}`;
        if(Game.hero.magazine==0)  magazine_text = `/000`;
    
        Game.ctx.beginPath();
        Game.ctx.fillStyle = "rgba(224, 182, 23, 1)";
        Game.ctx.strokeStyle='red';
        Game.ctx.font = 0.065*SRC.H+"px Impact";
        Game.ctx.textAlign = "right";
        Game.ctx.textBaseline = "bottom";
        Game.ctx.fillText(ammo_text,SRC.W-0.08*SRC.H,SRC.H);
        Game.ctx.closePath();

        Game.ctx.beginPath();
        Game.ctx.fillStyle.fillStyle = "rgba(224, 182, 23, 0.3)";
        Game.ctx.strokeStyle='red';
        Game.ctx.font = 0.04*SRC.H+"px Impact";
        Game.ctx.textAlign = "right";
        Game.ctx.textBaseline = "bottom";
        Game.ctx.fillText(magazine_text,SRC.W,SRC.H-3);
        Game.ctx.closePath();
        
    },
    end_game:function(){

        window.removeEventListener('keydown',Game.onKey,false);
        window.removeEventListener('keyup',Game.onKey,false);

        Game.end = document.createElement('div');
        Game.end.style.position = "absolute";
        Game.end.style.width = 0.35*window.innerWidth+"px";
        Game.end.style.height = 0.5*window.innerHeight+"px";
        Game.end.style.backgroundColor = "#7A5C58";
        Game.end.style.borderRadius = "20px";
        Game.end.style.display = "flex";
        Game.end.style.flexDirection = "column";
        Game.end.style.alignItems = "center";
        Game.end.innerHTML = `<h1>You lose !</h1> <p>Phases survived : ${SRC.phase-1}</p> <p>Zombie killed : ${Hero.zombie_killed}</p> <button id="restart">Restart</button>`;
        
        document.body.appendChild(Game.end);
        
        let button = document.getElementById('restart');
        button.addEventListener('click',function(){ location.reload();},false);

    },
    animation:function(time){

        requestAnimationFrame(Game.animation);
            if(time-SRC.lastTime>=1000/SRC.fps){
                SRC.lastTime = time;
                
                Game.ctx.clearRect(0,0,SRC.W,SRC.H);
                
                for(var o in Game.toDraw){
                    Game.toDraw[o].draw();
                }
                Game.hero.draw();
                Ammo.draw();
                HP.draw();
                Bullet.draw();
                
                Game.hub_draw();
                if(Game.hero.ammo==0 && Game.hero.magazine !=0){
                    Game.hero.ammo_check();
                    
                }else if(Game.hero.ammo==0 && Game.hero.magazine ==0){
                    Game.hero.no_ammo();
                }
        }
    }
}