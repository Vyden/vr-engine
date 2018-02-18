const TimelineController = {
    getTimeline(lectureId,callback) {
        //retrieve timeline from Firebase

        //return fake timeline for now
        callback([
        {
            id: "abc123",
            lecture: "5678",
            type: "video",
            eventTime: 0,
            resource: 'https://vyden.nyc3.digitaloceanspaces.com/videos/Sequence_01_3.mp4',
        },
        {
            id: "abc123",
            lecture: "5678",
            type: "quiz",
            eventTime: 10000,
            quizTime: 10000,
            resource: 'quizID',
        },
        {
            id: "abc123",
            lecture: "5678",
            type: "video",
            eventTime: 20000,
            resource: 'https://vyden.nyc3.digitaloceanspaces.com/videos/Sequence_01_3.mp4',
        }]) 
    },

    getVideoFromTimeline(timeline) {
        for(let i = 0; i < timeline.length; i++) {
            const timelineItem = timeline[i];
            if(timelineItem.type === 'video') return timelineItem.resource
        }
    },

    getEventTimeoutForLastItem(lastItem) {
        if(lastItem.type === 'video') {
            const video = document.getElementById('video')
            return 1000 * (video.duration - video.currentTime)
        } else if(lastItem.type === 'quiz') {
            //will be the time from the actual quiz object
            return lastItem.quizTime
        }
    }
}

module.exports = TimelineController