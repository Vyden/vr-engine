const dependencies = require('./dependencies')
const StageController = require('./stage')
const VideoController = require('./video')
const SceneController = require('./scene')
const $ = dependencies.jquery

StageController.registerComponent()
VideoController.registerComponent()

const playing = false;

$(() => {
    SceneController.initScene()
})


/*
$(document).click(function() {
    //alert( "Handler for .click() called." );
    if(!playing) {
        document.getElementById('matter').play();
        playing = true;
    } 
});

setInterval(()=> {
    if(document.getElementById('matter').paused) {
        document.getElementById('matter').play();
    } else {
        document.getElementById('matter').pause();
    }
},3000)
*/