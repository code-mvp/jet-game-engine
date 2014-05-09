TextSprite = function(game,text, x, y){
	this.game = game;
	this.text = text;
	this.x = x;
	this.y = y;
};

TextSprite.prototype = {
   update: function(){},
   draw: function (){
   		this.game.ctx.save();
   		this.game.ctx.fillStyle = "black";
   		this.game.ctx.strokeText(this.text, this.x, this.y);
   		this.game.ctx.fill(this.text, this.x, this.y);
   		this.game.ctx.restore();
   }
};