(function(window, document, undefined){

    var buildOptions = {
        itree1: {
            numberOfElements: 22,
            yAxis: -0.479,
            allScale: 0.035,
        },
        itree2: {
            numberOfElements: 22,
            yAxis: -0.6,
            allScale: 0.025,
        },
        itree3: {
            numberOfElements: 10,
            yAxis: -1,
            allScale: 0.015
        },
        iday1: {
            numberOfElements: 1,
            yAxis: 1,
        },
        iday2: {
            numberOfElements: 1,
            yAxis: 1,
        },
        iweather1: {
            numberOfElements: 10,
            yAxis: 1,
        },
        iweather2: {
            numberOfElements: 1,
            yAxis: 1,
        },
        iweather3: {
            numberOfElements: 10,
            yAxis: 1,
        }
    }

    var socket = io();

    socket.on('picked element', function(msg){

        var inSceneArray = msg[2];

        var zMin = -5.692;
        var zMax = -3.615;

        var aScene = document.querySelector("a-scene");

        msg[1].forEach(function(element){

            var elementToAdd = element.substr(1);
            var stripedElement = elementToAdd.substring(0, elementToAdd.length - 1);

            //IF A DAY HAS BEEN CHOSEN
            if(stripedElement === "day"){

                if((inSceneArray.includes("iday1")) && (inSceneArray.includes("iday2"))){
                    var objectToAdd = "#day3-img";
                } else {
                    var objectToAdd = "#" + elementToAdd + "-img";
                }
                
                var aSky = document.querySelector("a-sky");
                aSky.setAttribute("src", objectToAdd);
            }//END OF DAY BEEN CHOSEN


            //IF A WEATHER HAS BEEN CHOSEN
            if(stripedElement === "weather"){
                var isIn = document.getElementsByClassName(elementToAdd);

                if(isIn.length === 0){

                    var objectToAdd = "obj: #" + elementToAdd + "-obj; mtl: #" + elementToAdd+ "-mtl";

                    var howManyElements = buildOptions[element].numberOfElements;

                    for(var i = 0; i<howManyElements; i++){
                        var xPos = random(150, 75);
                        var zPos = random(150, 75);
                        var yPos = 47;
                        var allScale = 0.02;

                        if(element === "iweather1"){
                       
                        var xPosPlus = Number(xPos) + 20;
                        var zPosPlus = Number(zPos) + 20;
                        var duration = random(60000, -20000)


                        var test = "'" + xPos + " 47 " + zPos + "'";
                        var test2 = xPosPlus + " " + 47 + " " + zPos;

                        var newMesh = addElementToScene(objectToAdd, elementToAdd, xPos, zPos, yPos, allScale);

                        var newAnimaiton = document.createElement("a-animation");

                        newAnimaiton.setAttribute("attribute","position");
                        newAnimaiton.setAttribute("to", test2);
                        newAnimaiton.setAttribute("dur",duration);
                        newAnimaiton.setAttribute("repeat","1");
                        newAnimaiton.setAttribute("easing", "linear")

                        newMesh.appendChild(newAnimaiton);
                        aScene.appendChild(newMesh); 

                        } else{
                            var xPos = random(200, 100);
                            var zPos = random(200, 100);
                            var yPos = 50;
                            var newMesh = addElementToScene(objectToAdd, elementToAdd, xPos, zPos, yPos, allScale);
                            aScene.appendChild(newMesh); 
                        }

                    }
                }

                if(element === "iweather2"){
                    aScene.setAttribute("fog", "type: exponential; color: #848484; density: 0.02;")
                }
            }//END OF IF ELEMENT IS A TREE

            //IF A TREE HAS BEEN CHOSEN
            if(stripedElement === "tree"){

                var isIn = document.getElementsByClassName(elementToAdd);

                if(isIn.length === 0){
    
                    var objectToAdd = "obj: #" + elementToAdd+ "-obj; mtl: #" + elementToAdd+ "-mtl";

                    var howManyElements = buildOptions[element].numberOfElements;


                    for(var i = 0; i<howManyElements; i++){
                
                        var xPos = random();
                        var zPos = random();
                        var yPos = buildOptions[element].yAxis;
                        var allScale = buildOptions[element].allScale;

                        var newMesh = addElementToScene(objectToAdd, elementToAdd, xPos, zPos, yPos, allScale);

                        aScene.appendChild(newMesh);

                    }
                }
            }//END OF IF ELEMENT IS A TREE
        })
    });

    function addElementToScene(objectToAdd,elementToAdd, xPos, zPos, yPos, allScale){

        var newMesh = document.createElement("a-entity");
        newMesh.setAttribute("obj-model", objectToAdd);
        newMesh.setAttribute("class", elementToAdd);
        newMesh.setAttribute('id', 'addedtoscene');
        newMesh.setAttribute("position", new THREE.Vector3(xPos, yPos, zPos));
        newMesh.setAttribute("scale", new THREE.Vector3(allScale, allScale,allScale));
        newMesh.setAttribute("rotate", new THREE.Vector3(0, 0,0));
        

        return newMesh;
    }

    socket.on('remove element', function(msg){

        var elementToRemove = msg[0].substr(1);
        var stripedElement = elementToRemove.substring(0, elementToRemove.length - 1);
        var inSceneArray = msg[1];
        
        var allElementsToRemove = document.getElementsByClassName(msg[0].substr(1));

        var aScene = document.querySelector("a-scene");

        var temp = allElementsToRemove.length;
        
        if(stripedElement==="tree"){
            for(i=0; i<temp; i++){
                allElementsToRemove[0].parentNode.removeChild(allElementsToRemove[0]);
            }            
        }

        if(stripedElement==="weather"){
            for(i=0; i<temp; i++){
                allElementsToRemove[0].parentNode.removeChild(allElementsToRemove[0]);
            } 

            if(msg[0] === "iweather2"){
               
                aScene.setAttribute("fog", "type: exponential; color: #61D0EA; density: 0;")

            }           
        }

        if(stripedElement==="day"){

            if(inSceneArray.includes("iday1")){
              
                var objectToAdd = "#day1-img";
            } else if(inSceneArray.includes("iday2")){
                
                var objectToAdd = "#day2-img";
            } else {
                
                var objectToAdd = "#daynone-img";
            }
            var aSky = document.querySelector("a-sky");
            aSky.setAttribute("src", objectToAdd);          
        }

    });

    function random(bigNumber, smallNumber){

        bigNumber = bigNumber || 101;
        smallNumber = smallNumber || 50;
        var randomNumber = ((Math.random() * bigNumber) - smallNumber).toFixed(2);
        return randomNumber;
    }

})(this, document);