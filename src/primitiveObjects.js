const dependencies = require('./dependencies')
const $ = dependencies.jquery

const PrimitiveObjectsController = {
    getVideoPlane() {
        return $(`
            <a-box id="videoPlane" scale="32 18 0.1" position="0 10 8"></a-box>
        `)
    },

    getCircularStage() {
        return $(`
            <a-entity id="circularStage">
                <a-cylinder color="#455A64" radius="16" height="0.1"></a-cylinder>
                <a-cylinder color="#546E7A" radius="14" height="0.15"></a-cylinder>
            </a-entity>
        `)
    },

    getLoading() {
        return $(`
            <a-entity id="loadingIndicator">
                <a-text value="Loading..." position="0 5 0" align="center" width="36">
                <a-animation attribute="scale"
                    dur="800"
                    fill="forwards"
                    to="1.2 1.2 1.2"
                    direction="alternate"
                    delay="0"
                    easing="ease-in-out-sine"
                    repeat="indefinite"></a-animation>
                </a-text>
            </a-entity>
        `)
    },

    getText(text,width) {
        return $(`
            <a-text value="${text}" position="0 8 0" width="${width}" align="center"></a-text>
        `)
    },

    getCursor() {
        return $(`
            <a-entity cursor="fuse: true; fuseTimeout: 500"
            position="0 0 -1"
            geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
            material="color: #B3E5FC; shader: flat">
        `)
    }
}

module.exports = PrimitiveObjectsController