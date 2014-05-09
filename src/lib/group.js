 
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