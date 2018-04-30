AFRAME.registerComponent('image-listener', {
  init: function () {
    this.el.addEventListener('click', function (evt) {
      var socket = io();
          var getElement = this.id;

          var gotElement = document.getElementById(getElement);
          socket.emit('picked element', this.id);
    });
  }
});