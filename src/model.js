const dependencies = require('./dependencies')
const Assets = require('./assets')
const $ = dependencies.jquery

const ModelController = {
    getModelEntityFromTimelineItem(timelineItem) {
        const angleX = timelineItem.angleX || 0
        const angleY = timelineItem.angleY || 0
        const angleZ = timelineItem.angleZ || 0
        const rotation = `${angleX} ${angleY} ${angleZ}`
        const posX = timelineItem.offsetX || 0
        const posY = timelineItem.offsetY || 10
        const posZ = timelineItem.offsetZ || 0
        const position = `${posX} ${posY} ${posZ}`
        //load assets on event for now, do preloading later
        const assetID = Assets.addAssetFromURL(timelineItem.resource)
        const scale = timelineItem.scale || 1
        this.modelEntity = this.getModelEntity(assetID,scale,rotation,position)
        return this.modelEntity
    },

    getModelEntity(assetID,scaleFactor,rotation,position) {
        const pos = position || "0 10 0"
        const rot = rotation || "0 0 0"
        const scale = scaleFactor * 0.01 || 0.01
        return $(`<a-entity gltf-model="#${assetID}" scale="${scale} ${scale} ${scale}" position="${position}" rotation="${rotation}"></a-entity>`)
    },
}

module.exports = ModelController