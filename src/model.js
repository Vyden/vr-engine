const ModelController = {
    getModelEntity(assetID,scaleFactor) {
        const scale = scaleFactor * 0.01 || 0.01
        return $(`<a-entity gltf-model="#${assetID}" scale="${scale} ${scale} ${scale}"></a-entity>`)
    },
}