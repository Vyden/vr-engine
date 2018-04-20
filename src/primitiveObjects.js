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
            <a-entity id="mobileCursor" cursor="fuse: true; fuseTimeout: 2000"
            position="0 0 -1"
            geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
            material="color: #B3E5FC; shader: flat">
                <a-animation begin="cursor-fusing" easing="ease-in" attribute="scale" dur="2000" 
                fill="backwards" from="1 1 1" to="0.1 0.1 0.1"></a-animation>
            </a-entity>
        `)
    },

    getInvisibleCursor() {
        return $(`
            <a-entity id="mobileCursor" cursor="fuse: true; fuseTimeout: 500"
            position="0 0 -1">
            </a-entity>
        `)
    },

    getPauseBox() {
        return $(`
        <a-box id="pauseBox" position="0 1 -12" scale="4.5 1.8 2.7" rotation="-45 0 0" color="#0097A7" pause-listener
          event-set__enter="_event: mouseenter; scale: 5 2 3"
          event-set__click="_event: click; scale: 4.5 1.8 2.7"
          >
            <a-text id="pauseText" value="Pause" scale="0.75 2 1" position="0 0.05 1" align="center"></a-text>
        </a-box>
        `)
    }
}

module.exports = PrimitiveObjectsController