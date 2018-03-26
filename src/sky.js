const dependencies = require('./dependencies')
const $ = dependencies.jquery

const SkyController = {
    renderSky(lecture) {
        if(lecture.sky.charAt(0) === '#') {
            $('a-sky').removeAttr('src')
            $('a-sky').attr('color',lecture.sky)
            $('#ground').remove()
        } else if(lecture.sky.includes('http')) {
            $('a-sky').attr('src',lecture.sky)
            $('#ground').remove()
        } else if(lecture.sky === "default") {
            $('a-sky').attr('theta-length','90')
        }
    }
}

module.exports = SkyController