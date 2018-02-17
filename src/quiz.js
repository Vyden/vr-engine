const dependencies = require('./dependencies')
const Util = require('./util')
const $ = dependencies.jquery

const QuizController = {

    getQuiz(callback) {
        callback({
            question: "What's a computer?",
            answers: {
                0: 'It depends',
                1: 'Some of the above',
                2: 'None of the above',
                3: 'All of the above'
            }
        })
    },

    generateText(quiz) {
        let text = quiz.question
        let ansLetterASCII = 97;
        Object.keys(quiz.answers).forEach((index) => {
            text += '\n'
            text += String.fromCharCode(ansLetterASCII)
            text += '.) '
            text += quiz.answers[index]
        })
        return text
    },

    generateEntity(quiz) {
        const numAnswers = Object.keys(quiz.answers).length
        const leftmostPos = -6*((numAnswers/2)-1)
        const entity = $('a-entity',{
            id: 'quiz'
        })
        const entitySrc = `
            <a-text value="${this.generateText(quiz)}" align="left" width="40" position="${leftmostPos} 16 0"></a-text>
        `
        let currentPos = leftmostPos
        Object.keys(quiz.answers).forEach((index) => {
            const ansLetter = String.fromCharCode(ansLetterASCII)
            const ansCircle = `
            <a-circle id="ans-${ansLetter}" position="${currentPos} 6 0" rotation="0 0 0" radius="2" color="${Util.colorForIndex(index)}">
                <a-text value="${ansLetter}" width="50" align="center">
            </a-circle>
            `
        })
    }

}

module.exports = QuizController