AFRAME.registerComponent('cursor-color', {
  init: function () {

    this.el.addEventListener('mouseenter', function (evt) {

          var cursorVar = document.getElementById('maincursor');

          cursorVar.setAttribute('material', 'color: #09c01a');
    });

  this.el.addEventListener('mouseleave', function (evt) {

          var cursorVar = document.getElementById('maincursor');
      
          cursorVar.setAttribute('material', 'color: white');
    });
  }
});