const dependencies = require('./dependencies')
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