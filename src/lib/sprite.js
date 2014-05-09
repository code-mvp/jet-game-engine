Sprite = function(game,x,y,w,h,fillStyle){
  this.game = game;
  this.visible = true;
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

/**
* Resets the Sprite. This places the Sprite at the given x/y world coordinates and then
* sets alive, exists, visible and renderable all to true. Also resets the outOfBounds state and health values.
* If the Sprite has a physics body that too is reset.
*
* @method Phaser.Sprite#reset
* @memberof Phaser.Sprite
* @param {number} x - The x coordinate (in world space) to position the Sprite at.
* @param {number} y - The y coordinate (in world space) to position the Sprite at.
* @param {number} [health=1] - The health to give the Sprite.
* @return (Phaser.Sprite) This instance.
*/
Sprite.prototype.reset = function(x, y, health) {

    if (typeof health === 'undefined') { health = 1; }

    this.x = x; //this.position.x = x;
    this.y = y;
    this.alive = true;
    this.exists = true;
    this.visible = true;
    this.renderable = true;
    this._outOfBoundsFired = false;

    this.health = health;
    //return this;

};
