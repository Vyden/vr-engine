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
        if(timelineItem.rotation != -1 && timelineItem.rotation != 1) return null;
        if(!rotAxis) return null;
        const rotDir = parseInt(timelineItem.rotation)
        const rotAxis = timelineItem.rotateAxis
        const rotVal = rotDir * 360
        let rotStr = '';
        if(rotAxis == 'x') {
            rotStr = `${rotVal} 0 0`
        } else if(rotAxis == 'y') {
            rotStr = `0 ${rotVal} 0`
        } else {
            rotStr = `0 0 ${rotVal}`
        }
        let fill = 'forwards'
        if(rotDir == 1) {
            fill = 'backwards'
        }
        return $(`<a-animation attribute="rotation" dur="2000" to="${rotStr}" repeat="indefinite" easing="linear" fill="${fill}"></a-animation>`)
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