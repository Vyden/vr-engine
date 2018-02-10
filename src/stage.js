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

            clear() {
                $(this.el).empty()
            },

            presentEntity(entity) {
                
            }
        })
    }
}

module.exports = StageController