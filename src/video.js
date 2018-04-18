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

    getVideoAssetTag(url) {
        return $(`<video id="video" src="${url}"></video>`)
    },

    getVideoPlane() {
        return $(`
        <a-video src="#video" width="16" height="9" position="0 10 8"></a-video>
        `)
    }

}

module.exports = VideoController