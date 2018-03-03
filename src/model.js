const dependencies = require('./dependencies')
const $ = dependencies.jquery

const ModelController = {
    getModelEntity(assetID,scaleFactor) {
        const scale = scaleFactor * 0.01 || 0.01
        return $(`<a-entity gltf-model="#${assetID}" scale="${scale} ${scale} ${scale}" position="0 10 0"></a-entity>`)
    },
}

module.exports = ModelController