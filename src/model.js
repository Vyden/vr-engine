const dependencies = require('./dependencies')
const $ = dependencies.jquery

const ModelController = {
    getModelEntity(assetID,scaleFactor,rotation,position) {
        const pos = position || "0 10 0"
        const rot = rotation || "0 0 0"
        const scale = scaleFactor * 0.01 || 0.01
        return $(`<a-entity gltf-model="#${assetID}" scale="${scale} ${scale} ${scale}" position="${position}" rotation="${rotation}"></a-entity>`)
    },
}

module.exports = ModelController