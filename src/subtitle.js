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
        if (this.subs && this.subIndex < this.subs.length) {
            const subText = this.subs[this.subIndex].text.replace('<br />', '\n');

            document.querySelector('#subtitle').setAttribute('value', subText);
            this.timeoutRef = setTimeout(() => {
                this.startTime = new Date();
                this.startSubtitles()
            }, (this.subs[this.subIndex].end - this.subs[this.subIndex].start) * 1000);
            this.subIndex++;
        } else {
            document.querySelector('#subtitle').setAttribute('value', '');
        }
    },

    onItemChange(timelineItem) {
        if (timelineItem) {
            if (timelineItem.type === 'video') {
                this.startSubtitles();
            } else {
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