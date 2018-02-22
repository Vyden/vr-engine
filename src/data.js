const GetURLParam = require('get-url-param')
const Firebase = require('firebase')
const Secrets = require('./secrets')

const DataController = {
    intializeFirebase() {
        Firebase.initializeApp(Secrets.firebaseConfig)
        this.database = Firebase.database()
    },

    getLectureIDFromURL() {
        this.lectureID = GetURLParam(window.location.href,'id')
    },

    getTimelineFromFirebase(callback) {

    },

    getQuizFromTimelineItem(callback) {

    }
}

module.exports = DataController