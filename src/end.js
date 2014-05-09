
Game.End = function(game){
	this.game = game;

};

Game.End.prototype = {
	update: function(){
		this.text = this.game.text("THE END", 30,70);
		this.text.draw();
	}
};