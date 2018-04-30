var port = process.env.PORT || 3000;

 <audio id="nature-audio" src="audio/nature1.mp3" preload="auto"></audio>

   <a-plane static-body material="src: #ground-img; repeat: 4 4;"  height="200" width="200" position="0 -0.706 0" rotation="-90 0 0"></a-plane>

  <a-entity id="interface" sound="src: #nature-audio; autoplay: true; loop: true; volume: 4"  position="-0.189 2.455 -5">


automove, 

<!--       <a-entity id="maincamera" position="0 0.467 0" rotation="-2.693 1.031 0.057" camera look-controls>

        <a-entity cursor="fuse: true; fuseTimeout: 1000"
            position="0 0 -1"
            geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
            material="color: black; shader: flat">
        </a-entity>
      </a-entity> -->

var aScene       = document.querySelector("a-scene");
var assetList    = document.createElement("a-assets");
aScene.appendChild(assetList);


var img = document.createElement("a-image");
aScene.appendChild(img);

img.setAttribute("src", "#img"+(i-1));

//Position calculation for each image
var pos = new THREE.Vector3(0, 0.4, 0);
var rot = new THREE.Vector3(0, 0, 0);

[...]

img.setAttribute('position', pos);
img.setAttribute("rotation", rot);


var galleryOBJ = document.createElement("a-asset-item");
galleryOBJ.setAttribute("id", "gallery-obj");
galleryOBJ.setAttribute("src", "assets/cavanagh.obj");
assetList.appendChild(galleryOBJ);

var galleryMTL = document.createElement("a-asset-item");
galleryMTL.setAttribute("id", "gallery-mtl");
galleryMTL.setAttribute("src", "assets/cavanagh.mtl");
assetList.appendChild(galleryMTL);

assetList.addEventListener("loaded", onAssetLoaded);


//Load the gallery Mesh
var galleryMesh = document.createElement("a-entity");
galleryMesh.setAttribute("obj-model", "obj: #gallery-obj; mtl: #gallery-mtl");
galleryMesh.setAttribute("position", new THREE.Vector3(0, 0, 0));
aScene.appendChild(galleryMesh);




        // var elementToAdd = msg[1].substr(1);
        // console.log(elementToAdd);

        // var objectToAdd = "obj: #" + elementToAdd+ "-obj; mtl: #" + elementToAdd+ "-mtl";

        // var xPos = random();
        // var zPos = random();

        // // TODO: make sure the new postions don't clash with the UI interaction

        // // TODO: CREAT AN EMPTY MESSAGE EXEPTION

        // var aScene = document.querySelector("a-scene");

        // var galleryMesh = document.createElement("a-entity");
        // galleryMesh.setAttribute("obj-model", objectToAdd);
        // galleryMesh.setAttribute("id", "javascriptCreated");
        // galleryMesh.setAttribute("position", new THREE.Vector3(xPos, 1, zPos));
        // galleryMesh.setAttribute("scale", new THREE.Vector3(0.01, 0.01,0.01));
        // aScene.appendChild(galleryMesh);





            
            // socket.on('picked element', function(msg){
            //     var tempElement = document.getElementById(msg);
            //     tempElement.setAttribute('visible', false);
            //     console.log(msg);
            // });




	        // console.log('Server has disconnected');
         //    var browsersObject = chosenObj[socket.id];



         //    var i = inSceneArray.indexOf(browsersObject);

         //    elementArray.push(browsersObject);
         //    delete chosenObj[socket.id];
         //    io.emit('picked element', elementArray);