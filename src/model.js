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

    createRotationAnimation(timelineItem) {
        console.log("create rotation",timelineItem)
        if(timelineItem.rotate != -1 && timelineItem.rotate != 1) return null;
        if(!timelineItem.rotateAxis) return null;
        const rotDir = parseInt(timelineItem.rotate)
        console.log("rotDir",rotDir)
        const rotAxis = timelineItem.rotateAxis
        const rotVal = rotDir * 360
        let rotStr = '';
        if(rotAxis == 'x') {
            rotStr = `${rotVal} ${timelineItem.angleY} ${timelineItem.angleZ}`
        } else if(rotAxis == 'y') {
            rotStr = `${timelineItem.angleX} ${rotVal} ${timelineItem.angleZ}`
        } else {
            rotStr = `${timelineItem.angleX} ${timelineItem.angleY} ${rotVal}`
        }
        let fill = 'forwards'
        if(rotDir == 1) {
            fill = 'backwards'
        }
        const tag = `<a-animation attribute="rotation" dur="2000" to="${rotStr}" repeat="indefinite" easing="linear" fill="${fill}"></a-animation>`
        console.log("create tag",tag);
        return $(tag)
    },

    controlModel(scene) {
        this.scene = scene
        this.model = scene.currentItem
        console.log("control model:",this.model)
        this.timeout = setTimeout(function() {
            console.log("timeout reached")
            this.finishModel()
        }.bind(this),this.model.duration)
    },

    finishModel() {
        const video = document.getElementById('video')
        if((video.duration - video.currentTime) > 1 && this.scene.timeline.length == 0) {
            this.scene.timeline.push({
                id: "tempVideo",
                type: "video",
                resource: this.scene.videoURL
            })
        }
        console.log("remaining timeline",this.scene.timeline)
        this.scene.presentNext()
    }
}

module.exports = ModelController