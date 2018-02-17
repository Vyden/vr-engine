const Utilities = {
    isMobile() {
        return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    },

    colorForIndex(index) {
        const colors = [
            '#F4511E',
            '#FFB300',
            '#7CB342',
            '#00ACC1',
            '#5E35B1',
        ]
        return colors[index]
    }
}

module.exports = Utilities