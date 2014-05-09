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
		this.player = this.game.sprite(20,250,30,30,"gray");
		this.player.boundary = true;
		this.player.actor = true;

		this.cubes = this.game.group();
		this.cubes.createMultiple(20, 'cube');
		this.level = 0;
		this.loadLevel();
		this.game.start();
		console.log("play: create");
	},
	
	update: function(){
		console.log("play: update");
	    if (!this.player.actor) return;
	    
	    if (this.game.getKey(GameWorld.Keys.left) !== false){
	       if (this.player.vx > -this.player.speed){
	         this.player.vx--;
	       }
	       
	     }
	     if (this.game.getKey(GameWorld.Keys.right) !== false){
	       if (this.player.vx < this.player.speed) {
	         this.player.vx++;
	       }
	       
	     }
	     if (this.game.getKey(GameWorld.Keys.up) !== false || this.game.getKey(GameWorld.Keys.space)){
	       if(!this.player.jumping){
	         this.player.jumping = true;
	         this.player.vy = -this.player.speed*2;
	      }
	     }
	    
	     this.player.vx *= this.player.friction;
	     this.player.vy += this.player.gravity;
	    
	     this.player.x += this.player.vx;
	     this.player.y += this.player.vy;
	    
	     if(this.player.y >= 270){
	        this.player.y = 270; //this.world.h - this.height;
	        this.player.jumping = false;
	     }

	     this.game.collide(this.player, this.cubes.children, this.handleCollision, this);
  	},
  	handleCollision: function(){
  		this.player.visible = false;

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
				cube.reset(100+i*cube.w, 260);
				cube.visible = true;
				height = 1;
			}
		}
	}
};
