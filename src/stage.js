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