const dependencies = require('./dependencies')
const DataController = require('./data')
const parseSRT = require('parse-srt')
const $ = dependencies.jquery
const Firebase = firebase

const subtitleController = {
    loadSubtitles() {
        DataController.getLectureAndTimelineFromFirebase((timeline, lecture) => {
            if (lecture['subtitleURL']) {
                fetch(lecture['subtitleURL'])
                    .then(function (response) {
                        return response.blob()
                    })
                    .then(function (blob) {
                        let reader = new FileReader();
                        reader.addEventListener("loadend", function () {
                            subtitleController.subs = parseSRT(reader.result);
                            subtitleController.subIndex = 0;
                            console.log('subtitles: ', subtitleController.subs);
                        });
                        reader.readAsText(blob);
                    })
            }
        })
    },

    startSubtitles() {
        // console.log('INITIAL TIME: ', ((new Date()) - this.initialTime) / 1000);
        if (this.subs && this.subIndex < this.subs.length) {
            const endTime = new Date();
            if ((endTime - this.initialTime) / 1000 >= this.subs[this.subIndex].start) {
                const subText = this.subs[this.subIndex].text.replace('<br />', '\n');
                document.querySelector('#subtitle').setAttribute('value', subText);
                clearTimeout(this.timeoutRef);
                this.timeoutRef = setTimeout(() => {
                    this.startTime = new Date();
                    this.startSubtitles()
                }, (this.subs[this.subIndex].end - this.subs[this.subIndex].start) * 1000);
                this.subIndex++;
            } else {
                const elapsedTime = ((new Date()) - this.initialTime) / 1000;
                this.timeoutRef = setTimeout(() => {
                    this.startTime = new Date();
                    this.startSubtitles();
                }, (this.subs[this.subIndex].start - elapsedTime) * 1000);
            }

        } else {
            document.querySelector('#subtitle').setAttribute('value', '');
        }
    },

    onItemChange(timelineItem) {
        if (timelineItem) {
            if (timelineItem.type === 'video') {
                const pauseEnd = new Date();
                const pauseTime = pauseEnd - this.pauseStart;
                this.initialTime -= pauseTime;
                this.startSubtitles();
            } else {
                this.pauseStart = new Date();
                if (this.timeoutRef) {
                    clearTimeout(this.timeoutRef);
                    this.subIndex--;
                    //Get elapsed time since start of subtitle and modify subtitle
                    const endTime = new Date();
                    const elapsedTime = (endTime - this.startTime) / 1000;
                    this.subs[this.subIndex].start = this.subs[this.subIndex].end - elapsedTime;
                    document.querySelector('#subtitle').setAttribute('value', '');
                }
            }
        } else {
            document.querySelector('#subtitle').setAttribute('value', '');
        }
    }
}

module.exports = subtitleController