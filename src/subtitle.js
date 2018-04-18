const dependencies = require('./dependencies')
const DataController = require('./data')
const parseSRT = require('parse-srt')
const $ = dependencies.jquery
const Firebase = firebase

const subtitleController = {
    loadSubtitles() {
        DataController.getLectureAndTimelineFromFirebase(function (timeline, lecture) {
            fetch(lecture['subtitleURL'])
                .then(function (response) {
                    return response.blob()
                })
                .then(function (blob) {
                    let reader = new FileReader();
                    reader.addEventListener("loadend", function() {
                        console.log('before parse')
                        this.subs = parseSRT(reader.result);
                     });
                    reader.readAsText(blob);
                })
        })
    },



    onItemChange(timelineItem) {

    }
}

module.exports = subtitleController