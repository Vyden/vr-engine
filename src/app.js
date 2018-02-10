const dependencies = require('./dependencies')
const StageController = require('./stage')
const VideoController = require('./video')
const $ = dependencies.jquery

StageController.registerComponent()
VideoController.registerComponent()

const playing = false;

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
