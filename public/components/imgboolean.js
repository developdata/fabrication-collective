AFRAME.registerComponent('image-boolean', {
    init: function(){
        var elementArray = ["itree1", "itree2", "itree3", "iday1", "iday2", "iweather1", "iweather2"];
        var socket = io();

        socket.on('picked element', function(msg){
            elementArray.forEach(function(element){
                var i = msg[0].indexOf(element);
                var tempElement = document.getElementById(element);
                if(i > -1){
                    tempElement.setAttribute('visible', true);
                }else{
                    tempElement.setAttribute('visible', false);
                }
            })
        });
    }

});