const dependencies = require('./dependencies')
const $ = dependencies.jquery

const SkyController = {
    renderSky(lecture) {
        if(lecture.sky.charAt(0) === '#') {
            $('a-sky').removeAttr('src')
            $('a-sky').attr('color',lecture.sky)
            $('ground').remove()
        }
    }
}

module.exports = SkyController