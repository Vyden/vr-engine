const dependencies = require('./dependencies')
const PrimitiveObjects = require('./primitiveObjects')
const $ = dependencies.jquery

const VideoController = {
    registerComponent() {
        AFRAME.registerComponent('video', {

            init: function() {
                console.log('video',this,this.el)
                VideoController.component = this                
            },

            play: function() {
                
            },

        })
    },
    
}

module.exports = VideoController