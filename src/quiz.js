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
    }

}