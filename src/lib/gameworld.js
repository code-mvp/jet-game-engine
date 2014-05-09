(function(){

GameWorld = function(canvasId){
  this.canvasId = canvasId;
  this.canvas = document.getElementById(canvasId);
  this.ctx = this.canvas.getContext('2d');
  this.entities = [];
  this.w = this.canvas.width;
  this.h = this.canvas.height;
  
  this.keyState = {};
  
  var that = this;
  
  this.mouse = GameWorld.captureMouse(this.canvas);
     
  // Capture keystrokes
  var captureKeys = function(element){
      element.addEventListener("keydown", function(e){
          that.keyState[e.keyCode] = e.keyCode;
          e.preventDefau-lt();
          
      },false);
    
     element.addEventListener("keyup", function(e){
          delete that.keyState[e.keyCode];
          e.preventDefault();
      },false);
  };
  
  captureKeys(this.canvas);
  
}; 

GameWorld.Keys =  {
  "left": 37,
  "up":38,
  "right":39,
  "down":40
};
  
GameWorld.prototype.getKey = function (keyCode) {
  if (this.keyState && this.keyState[keyCode]) return true;
  return false;
};
  
  
/**
 * Keeps track of the current mouse position, relative to an element.
 * @param {HTMLElement} element
 * @return {object} Contains properties: x, y, event
 */
GameWorld.captureMouse = function (element) {
  var mouse = {x: 0, y: 0, event: null},
      body_scrollLeft = document.body.scrollLeft,
      element_scrollLeft = document.documentElement.scrollLeft,
      body_scrollTop = document.body.scrollTop,
      element_scrollTop = document.documentElement.scrollTop,
      offsetLeft = element.offsetLeft,
      offsetTop = element.offsetTop;
  
  element.addEventListener('mousemove', function (event) {
    var x, y;
    event.preventDefault();
    if (event.pageX || event.pageY) {
      x = event.pageX;
      y = event.pageY;
    } else {
      x = event.clientX + body_scrollLeft + element_scrollLeft;
      y = event.clientY + body_scrollTop + element_scrollTop;
    }
    x -= offsetLeft;
    y -= offsetTop;
    
    mouse.x = x;
    mouse.y = y;
    mouse.event = event;
    
    //console.log("mouse: ", mouse);
  }, false);
  
  return mouse;
};
  
GameWorld.prototype = {
  group: function(){
      var group = new Group(this);
      this.add(group);
      return group;
  },
  sprite: function(x,y,w,h,fillStyle){
     var sprite = new Sprite(this,x,y,w,h,fillStyle);
     this.add(sprite);
     return sprite;
  },
  getKey: function (keyCode) {
   if (this.keyState && this.keyState[keyCode]) return true;
   return false;
  },
  add: function(entity){
    entity.world = this;
    this.entities.push(entity);
  },
  clear: function(){
    var that = this;
    that.ctx.clearRect(0,0,that.w,that.h);
  },
  draw: function(){
    var that = this;
    that.entities.forEach(function(e){
      e.draw(that.ctx);
    });
  },
  start: function(){
    this.loop();
  },
  loop: function(dt){
    var that = this;
    that.update();
    that.clear();
    that.draw();  window.requestAnimationFrame(that.loop.bind(this));
  },
  update: function(){
    var that = this;
    that.entities.forEach(function(e){
      e.update();
      //that.clamp(e,"x",10,220);
    });
  },
  clamp: function(e,p,min,max){
      if (e[p] < min) e[p] = min;
      if (e[p] > max) e[p] = max;
  },
};
  
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
  
Group = function (game){
  this.game = game;
};
Group.prototype = {
  createMultiple: function(quantity, key){
      this.quantity = quantity;
      this.key = key;
  
      for(var i = 0; i < quantity; i++){
         this.game.sprite(0,0,30,40,"blue");
      }
  },
  update: function(){
    
  },
  draw: function(ctx){
  }
};
}());




