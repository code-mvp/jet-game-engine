StateManager = function(game, pendingState){
	this.game = game;
	this.states = {};

	if (typeof pendingState !== 'undefined' && pendingState !== null)
    {
        this._pendingState = pendingState;
    }

}

StateManager.prototype = {
	add: function(key, state){  // state could be object, function

 		var newState;
        if (state instanceof State)
        {
            newState = state;
        }
        else if (typeof state === 'object')
        {
            newState = state;
            newState.game = this.game;
        }
        else if (typeof state === 'function')
        {
            newState = new state(this.game);
        }

        console.log("newState: ", newState);
        this.states[key] = newState;
	},
	start: function(key){
		console.log("state: ", key);
		console.log(this.game.state);
		//this.game.gamestate[state](this.game);	
	}
};