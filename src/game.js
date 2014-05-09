
(function() {
	var game = new GameWorld("sheet");
	

	//var e1 = game.sprite(200,250,30,40,"blue");
	//var e2 = game.sprite(400,250,30,40,"rgba(0,0,255,1)");

	//game.start();

	//
	game.state.add('Load', Game.Load);
	game.state.add('Play', Game.Play);
	game.state.add('End', Game.End);

	game.state.start('Load');
}());
