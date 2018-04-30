var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);

var port = process.env.PORT || 3000;

//an array that holds all the element names, they will be removed when the element is in the scene
var elementArray = ["itree1", "itree2", "itree3", "iday1", "iday2", "iweather1", "iweather2"];

//an array for all the elements in the scene
var inSceneArray = [];
//an object that holds the id of the connected browser and the element it has picked
var chosenObj ={};

var numberOfTrees = 0;

app.engine('ejs', require('ejs').__express)
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
  res.render('index')
});

io.on('connection', function(socket){ 
    console.log('Connection to client established');

    io.emit('picked element', [elementArray, inSceneArray, inSceneArray]);

    socket.on('picked element', function(msg){

        var browserid = socket.id;
        //check that the element is not already in the scene. It will be removed from elementArray when it is added in the browser
    	var i = elementArray.indexOf(msg);
        var tempElementId = "";
        var addPreviousElement = 0;

        //check if the browser has already picked an element if it has keep a copy of that element and change addPreviousElement to true;
        if(browserid in chosenObj){
            tempElementId = chosenObj[browserid];
            addPreviousElement = 1;
        } 

        //check the element is not already in the scene
    	if(i > -1){
            //remove it from the ElementArray
    		elementArray.splice(i, 1);
            //add it to the inSceneArray
            inSceneArray.push(msg);
            //use the browser id as a key with the elment the browser is showing as the value
            chosenObj[browserid] = msg;

            //if there was a previous element that has to be removed from the scene and the inSceneArray and the elementArray updated
            if(addPreviousElement === 1){
                elementArray.push(tempElementId);
                var indexOfRemoveElement = inSceneArray.indexOf(tempElementId);
               
                inSceneArray.splice(indexOfRemoveElement, 1);
                //remove the element from the scene
                io.emit('remove element', [tempElementId, inSceneArray]);
                addPreviousElement = 0;

            }
            //add the picked element to the browser
            io.emit('picked element', [elementArray, [msg], inSceneArray]);
    	}
    });
    
	socket.on('disconnect',function(){
            console.log('Server has disconnected');

            //if the browser has a picked object it needs to be removed when shut down
            if(socket.id in chosenObj){

                var objectInBrowser = chosenObj[socket.id];

                var browsersObject = chosenObj[socket.id];

                elementArray.push(i+browsersObject);
                delete chosenObj[socket.id];

                var i = inSceneArray.indexOf(objectInBrowser);

                inSceneArray.splice(i, 1);
                elementArray.push(objectInBrowser);
                io.emit('remove element', [browsersObject, inSceneArray]);
                io.emit('picked element', [elementArray, []]);
            }
	    });
});


server.listen(port, function() {
  console.log('Listening on port 3000...')
})