AFRAME.registerComponent('cursor-listener2', {
    init: function () {
      this.el.addEventListener('click', function (evt) {

            var getElement = this.id + 's';

            var elementArray = ["uitrees", "uidays", "uiweathers"];

            var gotElement = document.getElementById(getElement);

            if(gotElement !== null){
                elementArray.forEach(function(element){

                var tempElement = document.getElementById(element);
                tempElement.setAttribute('visible', false);
            })

                gotElement.setAttribute('visible', true);
            }
      });
    }
});