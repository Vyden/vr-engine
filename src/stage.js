const dependencies = require('./dependencies')
const $ = dependencies.jquery

const StageController = {
    registerComponent() {
        AFRAME.registerComponent('stage', {
            init: function() {
                console.log(this)
            }    
        })
    },

    presentEntity(entity) {
        
    }
}

module.exports = StageController