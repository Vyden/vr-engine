const dependencies = require('./dependencies')
const GetURLParam = require('get-url-param')
const Firebase = firebase
const Secrets = require('./secrets')

const DataController = {
    intializeFirebase() {
        this.getLectureIDFromURL()
        this.getCourseIDFromURL()
        Firebase.initializeApp(Secrets.firebaseConfig)
        this.database = Firebase.database()
    },

    getLectureIDFromURL() {
        this.lectureID = GetURLParam(window.location.href,'lecture')
    },

    getCourseIDFromURL() {
        this.courseID = GetURLParam(window.location.href,'course')
    },

    getTimelineFromFirebase(callback) {
        if(this.lectureID === 'test') {
            const timeline = [{
                id: "abc123",
                lecture: "5678",
                type: "video",
                eventTime: 0,
                resource: 'https://vyden.nyc3.digitaloceanspaces.com/videos/ad8c2091-ff26-4a12-bf64-bf4fe8cd75c5',
            },
            {
                id: "abc123",
                lecture: "5678",
                type: "quiz",
                eventTime: 10000,
                quizTime: 10000,
                resource: 'test',
            },
            /*{
                id: "abc123",
                lecture: "5678",
                type: "model",
                eventTime: 5000,
                scale: 0.05,
                angleX: 90,
                offsetY: 5,
                resource: 'https://vyden.nyc3.digitaloceanspaces.com/models/knuckles/scene.gltf',
            },*/
            {
                id: "abc123",
                lecture: "5678",
                type: "video",
                eventTime: 7000,
                resource: 'https://vyden.nyc3.digitaloceanspaces.com/videos/ad8c2091-ff26-4a12-bf64-bf4fe8cd75c5',
            }]

            return callback(timeline)
        }
        this.database.ref('/Courses/' + this.courseID + '/lectures/' + this.lectureID).once('value').then(function(snapshot) {
            const lecture = snapshot.val()
            let timeline = []
            Object.keys(lecture.timeline).forEach((key) => {
                lecture.timeline[key].eventTime *= 1000
                timeline.push(lecture.timeline[key])
            })
            callback(timeline)
        })
    },

    getQuizFromTimelineItem(timelineItem,callback) {
        if(timelineItem.resource === 'test') {
            //return fake quiz
            return callback({
                question: "Is JavaScript a good language?",
                answers: ["Yes", "No"],
                time: 10000
            })
        }
        this.database.ref('/Courses/' + this.courseID + '/quizzes/' + timelineItem.resource + '/').once('value').then(function(snapshot) {
            console.log("the quiz id:",timelineItem.resource)
            const quiz = snapshot.val()
            quiz.time = parseInt(quiz.time) * 1000
            console.log("about to send quiz",quiz)
            callback(quiz)
        })
    },

    submitAnswerForQuiz(quizID,answer) {
        const responseID = this.database.ref('Courses/' + this.courseID +'/lectures/lectureQuizResponses/' + this.lectureID).push().key
        console.log("this database",this.database)
        this.database.ref('Courses/' + this.courseID + '/lectureQuizResponses/' + this.lectureID + '/' + responseID).set({
            selection: answer,
            date: Date.now(),
            quiz: quizID,
            user: Firebase.auth().currentUser.uid,
            lecture: this.lectureID,
            course: this.courseID,
            correct: -1
        })
    },

    preloadAssetsForTimeline(timeline,callback) {
        
    }
}

module.exports = DataController