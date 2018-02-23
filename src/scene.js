const dependencies = require('./dependencies')
const Util = require('./util')
const Timeline = require('./timeline')
const Stage = require('./stage')
const Quiz = require('./quiz')
const PrimitiveObjects = require('./primitiveObjects')
const DataController = require('./data')
const $ = dependencies.jquery

const SceneController = {
    initScene() {
        //will be dynamic, for now use sample video
        $('#videoPlane').attr('visible',false);

        DataController.intializeFirebase()
        DataController.getTimelineFromFirebase(function(timeline) {
            console.log("got timeline",timeline)
            this.timeline = timeline
            this.stage = document.getElementById('stage')
            //set video for the scene
            const videoURL = Timeline.getVideoFromTimeline(timeline)
            this.videoURL = videoURL
            $('#video').attr('src',this.videoURL)

            //listen for user to start scene
            this.userInitialized = false
            $(document).click(function() {
                if(!this.userInitialized) this.userStartScene()
            }.bind(this))

            if(!Util.isMobile()) {
                $('#lecStart').attr('value','Click anywhere to\n start the lecture...')
                $('.a-enter-vr').hide()
                $('#videoPlane').attr('position','0 10 16')
                $('#mainCamera').removeAttr('look-controls')
                $(document).css('cursor','pointer !important')
            }
        }.bind(this))

        // Data.getTimeline('<lectureID>',function(timeline){
        //     //set the scene timeline
        //     this.timeline = timeline
        //     this.stage = document.getElementById('stage')
        //     //set video for the scene
        //     const videoURL = Timeline.getVideoFromTimeline(timeline)
        //     this.videoURL = videoURL
        //     $('#video').attr('src',this.videoURL)

        //     //listen for user to start scene
        //     this.userInitialized = false
        //     $(document).click(function() {
        //         if(!this.userInitialized) this.userStartScene()
        //     }.bind(this))

        // }.bind(this))

        //set properties for desktop viewing
    },

    loadData() {
        

    },

    userStartScene() {
        this.userInitialized = true
        $('#lecStart').remove()

        document.getElementById('video').play()
        document.getElementById('video').pause()

        if(Util.isMobile()) {
            setTimeout(function() {
                this.presentNext()
            }.bind(this),10000)
        } else {
            this.presentNext()
        }
    },

    presentNext() {
        //delta for handling time errors
        const delta = 500;
        //clear the stage
        Stage.clearStage()
        //set the current item
        this.lastItem = this.currentItem
        this.currentItem = this.timeline.shift()
        this.nextItem = this.timeline[0]
        if(!this.currentItem) {
            $(this.stage).append(PrimitiveObjects.getText('Presentation Done',36))
            return
        }
        let eventTimeout = 0
        if(this.nextItem) {
            eventTimeout = this.nextItem.eventTime - this.currentItem.eventTime;
        } else {
            eventTimeout = Timeline.getEventTimeoutForLastItem(this.currentItem)
        } 
        if(this.currentItem.type === 'video') {
            $('#videoPlane').attr('visible',true)
            setTimeout(function() {
                document.getElementById('video').play()
                //set timeout for next item
                setTimeout(function() {
                    document.getElementById('video').pause()
                    this.presentNext()
                }.bind(this),eventTimeout + delta)
            }.bind(this),1000)
        } else if(this.currentItem.type === 'quiz') {
            console.log('start quiz')
            DataController.getQuizFromTimelineItem(this.currentItem,function(quiz) {
                if(Util.isMobile()) {
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
        }
    }
}

module.exports = SceneController