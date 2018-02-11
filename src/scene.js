const dependencies = require('./dependencies')
const Util = require('./util')
const $ = dependencies.jquery

const SceneController = {
    initScene() {
        //will be dynamic, for now use sample video
        $('#videoPlane').attr('visible',false);
        this.videoURL = 'https://vyden.nyc3.digitaloceanspaces.com/videos/do_u_know_da_way_(original_video).mp4'
        $('#video').attr('src',this.videoURL)
        this.userInitialized = false
        $(document).click(function() {
            if(!this.userInitialized) this.userStartScene()
        }.bind(this))
        if(!Util.isMobile()) {
            $('#lecStart').attr('value','Click anywhere to\n start the lecture...')
            $('.a-enter-vr').hide()
            $('#videoPlane').attr('position','0 10 16')
            $('#mainCamera').removeAttr('look-controls')
        }
        
    },

    userStartScene() {
        this.userInitialized = true
        $('#lecStart').remove()
        $('#videoPlane').attr('visible',true)
        document.getElementById('video').play()
        setTimeout(()=>{
            document.getElementById('video').pause()
        },200)
        setTimeout(()=>{
            document.getElementById('video').play()
        },5000)
    }
}

module.exports = SceneController