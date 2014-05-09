Sprite = function(game,x,y,w,h,fillStyle){
  this.game = game;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.vx = 0;
  this.vy = 0;
  this.speed = 3;
  this.friction = 0.8;
  this.gravity = 0.2;
  this.jumping = false;
  
  this.fillStyle = fillStyle;
  
  
};

Sprite.prototype = {
 
  update: function(){
     
    if (!this.actor) return;
    
    if (this.world.getKey(GameWorld.Keys.left) !== false){
       if (this.vx > -this.speed){
         this.vx--;
       }
       
     }
     if (this.world.getKey(GameWorld.Keys.right) !== false){
       if (this.vx < this.speed) {
         this.vx++;
       }
       
     }
     if (this.world.getKey(GameWorld.Keys.up) !== false){
       if(!this.jumping){
         this.jumping = true;
         this.vy = -this.speed*2;
      }
     }
    
     this.vx *= this.friction;
     this.vy += this.gravity;
    
     this.x += this.vx;
     this.y += this.vy;
    
     if(this.y >= 260){
        this.y = 260; //this.world.h - this.height;
        this.jumping = false;
    }
    
  },
  draw: function(ctx) {
     ctx.save();
     ctx.fillStyle = this.fillStyle;
     ctx.strokeRect(this.x,this.y,this.w,this.h);
     ctx.fillRect(this.x,this.y,this.w,this.h);
     ctx.restore();
  },
  destroy: function(ctx){
     alert('destroy');
  }
};
