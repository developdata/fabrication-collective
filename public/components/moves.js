AFRAME.registerComponent('move-listener', {

  update: function(){
      var moving = false
      this.el.addEventListener('click', function (evt) {
          var player = document.getElementById('player')

          if(!moving){
              player.setAttribute("universal-controls", "movementControls: automove,keyboard");
              moving = true;
          } else {
              player.setAttribute("universal-controls", "movementControls: keyboard");
              moving = false;
          }

      });
  }
});