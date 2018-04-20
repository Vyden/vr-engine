const dependencies = require('./dependencies')
const Util = require('./util')
const Timeline = require('./timeline')
const Stage = require('./stage')
const Quiz = require('./quiz')
const PrimitiveObjects = require('./primitiveObjects')
const DataController = require('./data')
const Model = require('./model')
const Assets = require('./assets')
const Sky = require('./sky')
const SubtitleController = require('./subtitle')
const $ = dependencies.jquery

const SceneController = {
    initScene() {
        //will be dynamic, for now use sample video
        $('#videoPlane').attr('visible',false)
        $('#lecStart').attr('visible',false)

        this.DataController = DataController
        DataController.intializeFirebase()
        DataController.getLectureAndTimelineFromFirebase(function(timeline,lecture) {
            console.log("got lecture",lecture)
            console.log("got timeline",timeline)
            Sky.renderSky(lecture)
            this.timeline = timeline
            this.stage = document.getElementById('stage')
            //set video for the scene
            const videoURL = Timeline.getVideoFromTimeline(timeline)
            this.videoURL = videoURL
            $('#video').attr('src',this.videoURL)
            $('#loading').remove()
            //listen for user to start scene
            this.userInitialized = false
            document.addEventListener("click",function() {
                if (!this.userInitialized) {
                    document.getElementById('video').play()
                    document.getElementById('video').pause()
                    this.userStartScene()
                    SubtitleController.initialTime = new Date();
                }
            }.bind(this))
            if(!Util.isMobile()) {
                $('.a-enter-vr').remove()
                $('#lecStart').attr('value','Click anywhere to\n start the lecture...')
                $('#videoPlane').attr('position','0 10 16')
                $('#mainCamera').removeAttr('look-controls')
                $('a-scene').attr('cursor','rayOrigin: mouse')
                $(document).css('cursor','pointer !important')
                $('#pauseBtn').hide()
                $('#pauseBtn').click(() => {
                    this.toggleVideo()
                })
                $('#cameraContainer').attr('position','0 0 0')
            } else {
                $('#pauseBtn').remove()
                $('#pauseCube').attr('visible',false)
            }
            $('#exitBtn').click(function() {
                window.history.back()
            })
            $('#lecStart').attr('visible',true)

        }.bind(this))

        document.querySelector('a-scene').addEventListener('enter-vr', () => {
            $('#cameraContainer').attr('position','0 10 0')
         });

        //set properties for desktop viewing
    },

    userStartScene() {
        this.userInitialized = true
        $('#lecStart').remove()

        if(Util.isMobile()) {
            setTimeout(function() {
                this.presentNext()
            }.bind(this),100)
        } else {
            this.presentNext()
        }
    },

    toggleVideo() {
        if(this.isPaused) {
            this.resumeVideo()
            $('#pauseBtn').text("Pause")
            $('#pauseText').attr("Value","Pause")
        } else {
            this.pauseVideo()
            $('#pauseBtn').text("Resume")
            $('#pauseText').attr("Value","Resume")
        }
    },

    pauseVideo() {
        const currentTime = Date.now()
        const elapsed = currentTime - this.videoStart
        console.log("elapsed",elapsed)
        console.log("videoStart",this.videoStart,"currentTime",currentTime)
        const remainingTime = this.videoItemDuration - elapsed
        console.log("video item duration",this.videoItemDuration)
        console.log("remaining time",remainingTime)
        document.getElementById('video').pause()
        console.log("should pause")
        this.remainingTime = remainingTime
        this.isPaused = true
        clearTimeout(this.videoTimeout)
    },

    resumeVideo() {
        this.videoTimeout = setTimeout(function() {
            document.getElementById('video').pause()
            this.presentNext()
        }.bind(this),this.remainingTime)
        this.videoStart = Date.now()
        this.videoItemDuration = this.remainingTime
        document.getElementById('video').play()
        this.isPaused = false
    },

    presentNext() {
        //delta for handling time errors
        const delta = 500
        //clear the stage
        Stage.clearStage()
        //set the current item
        this.lastItem = this.currentItem
        this.currentItem = this.timeline.shift()
        this.nextItem = this.timeline[0]

        SubtitleController.onItemChange(this.currentItem)

        if(!Util.isMobile()) {
            $('#pauseBtn').hide()
        } else {
            $('#pauseCube').attr('visible',false)
        }

        if(!this.currentItem) {
            $(this.stage).append(PrimitiveObjects.getText('Presentation Done',36))
            return
        }
        let eventTimeout = 0
        if(this.nextItem) {
            eventTimeout = this.nextItem.eventTime - this.currentItem.eventTime
        } else {
            eventTimeout = Timeline.getEventTimeoutForLastItem(this.currentItem)
        }
        if(this.currentItem.type === 'video') {
            $('#videoPlane').attr('visible',true)

            if(!Util.isMobile()) {
                $('#pauseBtn').show()
            } else {
                $('#pauseCube').attr('visible',true)
            }

            $('#mainCamera').empty()
            $('#mainCamera').append(PrimitiveObjects.getInvisibleCursor())

            setTimeout(function() {
                document.getElementById('video').play()
                //set timeout for next item
                this.videoStart = Date.now()
                this.videoItemDuration = eventTimeout
                this.videoTimeout = setTimeout(function() {
                    document.getElementById('video').pause()
                    this.presentNext()
                }.bind(this),eventTimeout + delta)
            }.bind(this),1000)
        } else if(this.currentItem.type === 'quiz') {
            console.log('start quiz')
            DataController.getQuizFromTimelineItem(this.currentItem,function(quiz) {
                if(Util.isMobile()) {
                    $('#mainCamera').empty()
                    $('#mainCamera').append(PrimitiveObjects.getCursor())
                }
                console.log("quiz in callback",quiz)
                const quizEntity = Quiz.generateEntity(quiz)
                console.log(quizEntity.html())
                $(this.stage).append(quizEntity)
                this.currentItem.controller = Quiz
                this.currentItem.quiz = quiz
                Quiz.controlQuiz(this)
            }.bind(this))
        } else if(this.currentItem.type === 'model') {
            console.log('load model')
            const entity = Model.getModelEntityFromTimelineItem(this.currentItem)
            entity.append(Model.createRotationAnimation(this.currentItem))
            this.currentItem.duration *= 1000
            $(this.stage).append(entity)
            // setTimeout(function() {
            //     this.presentNext()
            // }.bind(this),this.currentItem.duration + delta)
            Model.controlModel(this)
        }
    }
}

AFRAME.registerComponent('pause-listener', {
    init: function () {
      this.el.addEventListener('click', function (event) {
        document.currentScene.toggleVideo()
      });
    }
  });

module.exports = SceneController