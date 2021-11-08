const Student = require("../Student")
const {STATE_LIST, sendQuestionText} = require("./SessionMiddleware")
const {confidenceBtn, cancelAdviserAnswerBtn} = require("./ButtonManager")
const {
    ENTERANSWER,
    DELETEMESSAGEWASSUCCESSFUL,
    DELETEMESSAGEREQUESTCANCELED,
    DELETEMESSAGECONFIDENCE
} = require("./MessageHandler")

const ActionMap = {
    ANSWER: /^ANSWER/,
    DELETE: /^DELETE/,
    YES: /^YES/,
    NO: /^NO/,
}

let MessageId
let ChatId
let StudentQuestion

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
        await ctx.reply(ENTERANSWER, cancelAdviserAnswerBtn)
    },
    DELETE: async (ctx) => {
        MessageId = ctx.update.callback_query.message.message_id
        ChatId = ctx.update.callback_query.message.chat.id
        StudentQuestion = ctx.update.callback_query.message.text
        ctx.reply(DELETEMESSAGECONFIDENCE, confidenceBtn)
    },
    YES: async (ctx) => {
        let QuestionText = StudentQuestion.split('*')[1].split(":")[1]
        await Student.findOneAndDelete({MessageText: QuestionText})
        await ctx.telegram.deleteMessage(ChatId, MessageId)
        await ctx.telegram.deleteMessage(ctx.update.callback_query.message.chat.id, ctx.update.callback_query.message.message_id)
        await ctx.reply(DELETEMESSAGEWASSUCCESSFUL)
    },
    NO: async (ctx) => {
        await ctx.telegram.deleteMessage(ctx.update.callback_query.message.chat.id, ctx.update.callback_query.message.message_id)
        await ctx.reply(DELETEMESSAGEREQUESTCANCELED)
    }
}
