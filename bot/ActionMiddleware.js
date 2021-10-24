const {STATE_LIST, sendQuestionText} = require("./SessionMiddleware")
const {
    ENTERANSWER
} = require("./MessageHandler")

const ActionMap = {
    ANSWER: /^ANSWER/,
}

module.exports = (ctx, next) => {
    if (!ctx.update.callback_query)
        return next();
    const callback_data = ctx.update.callback_query.data;
    if (callback_data) {
        const actionValues = Object.values(ActionMap)
        for (let i = 0; i < actionValues.length; i++) {
            const isMatch = callback_data.match(actionValues[i])
            if (isMatch && EventListener[Object.keys(ActionMap)[i]])
                return EventListener[Object.keys(ActionMap)[i]](ctx, isMatch);
        }
    }
    next();
}

const EventListener = {
    ANSWER: async (ctx) => {
        const studentQuestion = ctx.update.callback_query.message.text
        let QuestionText = studentQuestion.split('*')[1]
        sendQuestionText(QuestionText)
        ctx.session.state = STATE_LIST.ANSWER
        await ctx.reply(ENTERANSWER)
    }
}

