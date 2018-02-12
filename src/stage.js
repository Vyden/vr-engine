const dependencies = require('./dependencies')
const PrimitiveObjects = require('./primitiveObjects')
const $ = dependencies.jquery

const StageController = {
    registerComponent() {
        AFRAME.registerComponent('stage', {
            init: function() {
                console.log(this)
                StageController.component = this
            },
        })
    },

    clearStage() {
        const videoPlane = $('#videoPlane');
        videoPlane.attr('visible','false')
        $('#stage').empty();
        $('#stage').append(videoPlane)
    }
}

module.exports = StageController