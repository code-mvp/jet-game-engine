 
Group = function (game){
  this.game = game;
  this.children = [];
};
Group.prototype = {
  createMultiple: function(quantity, key){
      this.quantity = quantity;
      this.key = key;
  
      for(var i = 0; i < quantity; i++){
         var s = this.game.sprite(0,0,30,40,"blue");
         s.visible = false;
         this.children.push(s);
      }
  },
  update: function(){
    
  },
  draw: function(ctx){
  }
};