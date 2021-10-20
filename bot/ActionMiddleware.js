const {STATE_LIST, sendQuestionText} = require("./SessionMiddleware")
let Question

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
        Question = studentQuestion.split('*')[1]
        sendQuestionText(Question)
        ctx.session.state = STATE_LIST.ANSWER
        ctx.reply("لطفا پاسخ خود را بصورت ویس وارد نمایید")
    }
}

