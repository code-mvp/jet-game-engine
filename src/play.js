var map = [
	[0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 5, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

	[0, 0, 5, 5, 5, 0, 0, 0, 0, 2, 3, 0, 0, 0, 0, 0, 2, 3, 0, 0, 0, 0],
	[0, 0, 0, 0, 2, 0, 0, 0, 5, 0, 0, 0, 0, 2, 0, 0, 0, 5, 0, 0, 0, 3],
	[0, 0, 0, 0, 2, 3, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 2, 2, 0, 0],
	[0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 2, 3, 0, 0, 0],
	[0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2],

	[0, 0, 5, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 2],
	[0, 0, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 5, 0, 0, 0, 2, 2, 2, 0, 0, 5],
	[0, 0, 0, 0, 2, 3, 2, 0, 0, 0, 5, 5, 0, 0, 0, 2, 3, 2, 0, 0, 0, 0],
	[0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 3, 0, 0, 0, 5, 0, 0, 0, 0, 2],
	[0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0],

	[0, 0, 0, 0, 4, 0, 0, 0, 0, 5, 0, 0, 0, 3, 3, 0, 0, 0, 0, 5, 0, 0],
	[0, 0, 0, 0, 0, 5, 0, 0, 2, 2, 0, 0, 0, 0, 5, 5, 0, 0, 0, 4, 0, 0],
	[0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 1, 4, 1],
	[0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 2, 0, 0]];


Game.Play = function(game){
	this.game = game;
};

Game.Play.prototype = {
	create: function(){
		this.p1 = this.game.sprite(20,250,30,30,"gray");
		this.p1.boundary = true;
		this.p1.actor = true;

		this.cubes = this.game.group();
		this.cubes.createMultiple(20, 'cube');
		this.level = 0;
		this.loadLevel();
		this.game.start();
		console.log("play: create");
	},
	
	update: function(){
		console.log("play: update");
	    if (!this.p1.actor) return;
	    
	    if (this.game.getKey(GameWorld.Keys.left) !== false){
	       if (this.p1.vx > -this.p1.speed){
	         this.p1.vx--;
	       }
	       
	     }
	     if (this.game.getKey(GameWorld.Keys.right) !== false){
	       if (this.p1.vx < this.p1.speed) {
	         this.p1.vx++;
	       }
	       
	     }
	     if (this.game.getKey(GameWorld.Keys.up) !== false){
	       if(!this.p1.jumping){
	         this.p1.jumping = true;
	         this.p1.vy = -this.p1.speed*2;
	      }
	     }
	    
	     this.p1.vx *= this.p1.friction;
	     this.p1.vy += this.p1.gravity;
	    
	     this.p1.x += this.p1.vx;
	     this.p1.y += this.p1.vy;
	    
	     if(this.p1.y >= 260){
	        this.p1.y = 260; //this.world.h - this.height;
	        this.p1.jumping = false;
	    }
  },
	
	loadLevel: function(){
		console.log("Level: ", this.level);
		this.drawLevel(map[this.level]);
		this.level++;
	},

	drawLevel: function(maap){
		var cube, height;
		var h = 300;
		for (var i = 0; i < maap.length; i++) {
			cube = this.cubes.children[i];
			if (maap[i] == 2) {
				cube.reset(100+i*cube.w, h*2/3);
				cube.visible = true;
				height = 1;
			}
		}
	}
};
