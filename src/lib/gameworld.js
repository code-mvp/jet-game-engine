(function(){

  GameWorld = function(canvasId){
    this.canvasId = canvasId;
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.entities = [];
    this.w = this.canvas.width;
    this.h = this.canvas.height;
    
    this.keyState = {};

    this.state = this.createState();


    var that = this;
    
    this.mouse = GameWorld.captureMouse(this.canvas);
       
    // Capture keystrokes
    var captureKeys = function(element){
        element.addEventListener("keydown", function(e){
            that.keyState[e.keyCode] = e.keyCode;
            e.preventDefault();
            console.log(that.keyState);
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
    "down":40,
    "space":32
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
    createState: function(){
       //var gameState = new GameState(this);
       //return gameState;
       return new StateManager(this, null);
    },
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
        if (e.visible){
          e.draw(that.ctx);
        }
      });
      that.state.render();
    },
    start: function(){
      this.loop();
    },
    loop: function(dt){
      var that = this;
      that.update();
      that.clear();
      that.draw();  
      window.requestAnimationFrame(that.loop.bind(this));
    },
    update: function(){
      var that = this;
      that.entities.forEach(function(e){
        e.update();
        //that.clamp(e,"x",10,220);
      });

      this.state.update();

    },
    clamp: function(e,p,min,max){
        if (e[p] < min) e[p] = min;
        if (e[p] > max) e[p] = max;
    },
  };
}());




