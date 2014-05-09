
(function() {
	var game = new GameWorld("sheet");
	var p1 = game.sprite(20,250,30,30,"gray");
	p1.boundary = true;
	p1.actor = true;


	var e1 = game.sprite(200,250,30,40,"blue");
	var e2 = game.sprite(400,250,30,40,"rgba(0,0,255,1)");

	var cubes = game.group();
	cubes.createMultiple(20, 'cube');

	game.start();
}());
