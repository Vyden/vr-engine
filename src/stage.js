const dependencies = require('./dependencies')
const PrimitiveObjects = require('./primitiveObjects')
const $ = dependencies.jquery

const StageController = {
    registerComponent() {
        AFRAME.registerComponent('stage', {
            init: function() {
                console.log(this)
                $(this.el).append(PrimitiveObjects.getCircularStage())
                $(this.el).append(PrimitiveObjects.getLoading())
                StageController.stage = this
            },

            clear() {
                $(this.el).empty();
            }
        })
    },

    presentEntity(entity) {
        
    }
}

module.exports = StageController