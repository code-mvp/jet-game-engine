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

        this.states[key] = newState;
        
	},
	start: function(key){
        console.log("Change state to: ", key);
        this._pendingState = key;
        this.setCurrentState(this._pendingState);
        this.update();
	},
    /**
    * Sets the current State. Should not be called directly (use StateManager.start)
    *
    * @method Phaser.StateManager#setCurrentState
    * @param {string} key - State key.
    * @private
    */
    setCurrentState: function (key) {
        console.log("setCurrentState: ", key);
        this.callbackContext = this.states[key];
        
        this.onUpdateCallback = this.states[key]['update'] || null;
        this.onCreateCallback = this.states[key]['create'] || null;
        
    },
    render: function(){

    },
    update: function(){
        
        if (!this._created){
            if (this.onCreateCallback){
                this._created = true;
                this.onCreateCallback.call(this.callbackContext, this.game);    
            }
        }
        if (this.onUpdateCallback){
            this.onUpdateCallback.call(this.callbackContext, this.game);
        }
    }
};