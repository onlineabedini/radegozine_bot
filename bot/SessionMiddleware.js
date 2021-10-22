const Admin = require("../Admin")
const Adviser = require("../Adviser")
const Student = require("../Student")
const Users = require("../User")
let question
const {
    MAIN_BUTTONS_TEXT,
    answerBtn,
    cancelBtn,
    AdminsStartBtns,
    AdvisersStartBtns,
    StudentsStartBtns,
} = require("./ButtonManager")
const {
    ENTERADMINFULLNAME,
    ENTERADVISERFULLNAME,
    ENTERFIELD,
    ENTERGRADE,
    ENTERQUESTION,
    ADMINCONFIRMMESSAGE,
    ADVISERCONFIRMMESSAGE,
    DUPLICATEADMIN,
    DUPLICATEADVISER,
    SENDMESSAGEWASSUCCESSFUL,
    SENDMESSAGEFORADVISERSWASSUCCESSFUL,
    SENDMESSAGEFORSTUDENTSWASSUCCESSFUL,
    QUESTIONREGISTERED,
} = require("./MessageHandler")
const STATE_LIST = {
    ADDADMIN: "addadmin",
    GETADMINFULLNAME: "getadminfullname",
    ADDADVISER: "addadviser",
    GETADVISERFULLNAME: "getadviserfullname",
    SENDMESSAGEFORADMINS: "sendmessageforadmins",
    SENDMESSAGEFORADVISERS: "sendmessageforadvisers",
    SENDMESSAGEFORSTUDENTS: "sendmessageforstudents",
    GETSTUDENTFULLNAME: "getstudentfullname",
    GETSTUDENTFIELD: "getstudentfield",
    GETSTUDENTGRADE: "getstudentgrade",
    ASKQUESTION: "askquestion",
    ANSWER: "answer"
}

module.exports = (ctx, next) => {
    if (!ctx.session.state)
        return next()
    const state = ctx.session.state
    const values = Object.values(STATE_LIST)
    if (values.includes(state) && EventListener[state])
        return EventListener[state](ctx, next)
    next()
}

module.exports.sendQuestionText = (Question) => {
    question = []
    question.push(Question)
}

const EventListener = {
    [STATE_LIST.ADDADMIN]: (ctx, next) => {
        ctx.session.state = undefined
        if (ctx.message && ctx.message.text !== MAIN_BUTTONS_TEXT.CANCEL) {
            const AdminUsername = ctx.message.text
            ctx.session.stateData = {...ctx.session.stateData, AdminUsername}
            ctx.session.state = STATE_LIST.GETADMINFULLNAME
            ctx.reply(ENTERADMINFULLNAME)
        } else next()
    }, [STATE_LIST.GETADMINFULLNAME]: async (ctx, next) => {
        ctx.session.state = undefined
        if (ctx.message && ctx.message.text !== MAIN_BUTTONS_TEXT.CANCEL) {
            const AdminFullname = ctx.message.text
            ctx.session.stateData = {...ctx.session.stateData, AdminFullname}
            const AdminData = await Admin.findOne({Username: ctx.session.stateData.AdminUsername})
            if (!AdminData) {
                AddNewAdmin()
                ctx.reply(ADMINCONFIRMMESSAGE, AdminsStartBtns)
            } else {
                ctx.reply(DUPLICATEADMIN, AdminsStartBtns)
            }

            function AddNewAdmin() {
                const admin = new Admin({
                    Username: ctx.session.stateData.AdminUsername,
                    Fullname: ctx.session.stateData.AdminFullname,
                })
                admin.save()
            }

            ctx.session.stateData = undefined
        } else next()
    },
    [STATE_LIST.ADDADVISER]: (ctx, next) => {
        ctx.session.state = undefined
        if (ctx.message && ctx.message.text !== MAIN_BUTTONS_TEXT.CANCEL) {
            const AdviserUsername = ctx.message.text
            ctx.session.stateData = {...ctx.session.stateData, AdviserUsername}
            ctx.session.state = STATE_LIST.GETADVISERFULLNAME
            ctx.reply(ENTERADVISERFULLNAME)
        } else next()
    }, [STATE_LIST.GETADVISERFULLNAME]: async (ctx, next) => {
        ctx.session.state = undefined
        if (ctx.message && ctx.message.text !== MAIN_BUTTONS_TEXT.CANCEL) {
            const AdviserFullname = ctx.message.text
            ctx.session.stateData = {...ctx.session.stateData, AdviserFullname}
            const AdviserData = await Adviser.findOne({Username: ctx.session.stateData.AdviserUsername})

            if (!AdviserData) {
                AddNewAdviser()
                ctx.reply(ADVISERCONFIRMMESSAGE, AdminsStartBtns)
            } else {
                ctx.reply(DUPLICATEADVISER, AdminsStartBtns)
            }

            function AddNewAdviser() {
                const adviser = new Adviser({
                    Username: ctx.session.stateData.AdviserUsername,
                    Fullname: ctx.session.stateData.AdviserFullname,
                })
                adviser.save()
            }

            ctx.session.stateData = undefined
        } else next()
    },
    [STATE_LIST.SENDMESSAGEFORADVISERS]: async (ctx, next) => {
        ctx.session.state = undefined
        const AdvisersData = await Adviser.find()
        const AdvisersChatIds = AdvisersData.map(element => element.ChatId)
        if (ctx.message && ctx.message.text !== MAIN_BUTTONS_TEXT.CANCEL) {
            const MessageId = ctx.message.message_id
            for (item in AdvisersChatIds) {
                await ctx.telegram.forwardMessage(AdvisersChatIds[item], ctx.message.chat.id, MessageId)
            }
            ctx.reply(SENDMESSAGEFORADVISERSWASSUCCESSFUL, AdminsStartBtns)
        } else next()
    },
    [STATE_LIST.SENDMESSAGEFORSTUDENTS]: async (ctx, next) => {
        ctx.session.state = undefined
        const UserData = await Users.find()
        const UsersChatIds = UserData.map(element => element.ChatId)
        if (ctx.message && ctx.message.text !== MAIN_BUTTONS_TEXT.CANCEL) {
            const MessageId = ctx.message.message_id
            for (item in UsersChatIds) {
                await ctx.telegram.copyMessage(UsersChatIds[item], ctx.message.chat.id, MessageId)
            }

            const admin = await Admin.findOne({Username: ctx.message.chat.username})
            if (ctx.message.chat.username === 'ALINPDEV' || admin) {
                ctx.reply(SENDMESSAGEFORSTUDENTSWASSUCCESSFUL, AdminsStartBtns)
            } else {
                ctx.reply(SENDMESSAGEFORSTUDENTSWASSUCCESSFUL, AdvisersStartBtns)
            }
        } else next()
    }, [STATE_LIST.SENDMESSAGEFORADMINS]: async (ctx, next) => {
        ctx.session.state = undefined
        if (ctx.message && ctx.message.text !== MAIN_BUTTONS_TEXT.CANCEL) {
            const chatId = ctx.message.chat.id
            const username = ctx.message.chat.username
            const messageId = ctx.message.message_id
            let adviser = await Adviser.findOne({ChatId: chatId})
            adviser.Username = username
            adviser.MessageId = messageId
            adviser.save()
            ctx.reply(SENDMESSAGEWASSUCCESSFUL , AdvisersStartBtns)
        } else next()
    }, [STATE_LIST.GETSTUDENTFULLNAME]: async (ctx, next) => {
        ctx.session.state = undefined
        if (ctx.message && ctx.message.text !== MAIN_BUTTONS_TEXT.CANCEL) {
            const Fullname = ctx.message.text
            ctx.session.stateData = {...ctx.session.stateData, Fullname}
            ctx.session.state = STATE_LIST.GETSTUDENTFIELD
            ctx.reply(ENTERFIELD)
        } else next()
    }
    , [STATE_LIST.GETSTUDENTFIELD]: async (ctx, next) => {
        ctx.session.state = undefined
        if (ctx.message && ctx.message.text !== MAIN_BUTTONS_TEXT.CANCEL) {
            const Field = ctx.message.text
            ctx.session.stateData = {...ctx.session.stateData, Field}
            ctx.session.state = STATE_LIST.GETSTUDENTGRADE
            ctx.reply(ENTERGRADE)
        } else next()
    }, [STATE_LIST.GETSTUDENTGRADE]: async (ctx, next) => {
        ctx.session.state = undefined
        if (ctx.message && ctx.message.text !== MAIN_BUTTONS_TEXT.CANCEL) {
            const Grade = ctx.message.text
            ctx.session.stateData = {...ctx.session.stateData, Grade}
            ctx.session.state = STATE_LIST.ASKQUESTION
            ctx.reply(ENTERQUESTION)
        } else next()
    }, [STATE_LIST.ASKQUESTION]: async (ctx, next) => {
        ctx.session.state = undefined
        if (ctx.message && ctx.message.text !== MAIN_BUTTONS_TEXT.CANCEL) {
            const messageText = ctx.message.text
            const messageId = ctx.message.message_id
            const userChatId = ctx.message.chat.id
            const username = ctx.message.chat.username
            let StudentFile = await Student.findOne({ChatId: userChatId})
            if (!StudentFile) {
                const chatId = ctx.message.from.id
                AddNewStudent()
                function AddNewStudent() {
                    const student = new Student({
                        ChatId: chatId,
                        Username: username,
                        Fullname: ctx.session.stateData.Fullname,
                        Field: ctx.session.stateData.Field,
                        Grade: ctx.session.stateData.Grade,
                        MessageId: messageId,
                        MessageText: messageText
                    })
                    student.save()
                }
                ctx.session.stateData = undefined
                ctx.reply(QUESTIONREGISTERED, StudentsStartBtns)
            } else {
                StudentFile.Fullname = ctx.session.stateData.Fullname
                StudentFile.Field = ctx.session.stateData.Field
                StudentFile.Grade = ctx.session.stateData.Grade
                StudentFile.Username = username
                StudentFile.MessageId = messageId
                StudentFile.MessageText = messageText
                await StudentFile.save()
                ctx.session.stateData = undefined
                ctx.reply(QUESTIONREGISTERED, StudentsStartBtns)
            }
        } else next()
    }, [STATE_LIST.ANSWER]: (ctx, next) => {
        ctx.session.state = undefined
        if (ctx.message) {
            const ChannelChatId = -1001704168213
            ctx.telegram.sendVoice(ChannelChatId, ctx.message.voice.file_id, {caption: question[0]})
        } else next()
    }
}

module.exports.STATE_LIST = STATE_LIST