const Admin = require("../Admin")
const Adviser = require("../Adviser")
const Student = require("../Student")
const Users = require("../User")
let question

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
        if (ctx.message) {
            const AdminUserName = ctx.message.text
            ctx.session.stateData = {...ctx.session.stateData, AdminUserName}
            ctx.session.state = STATE_LIST.GETADMINFULLNAME
            ctx.reply("لطفا نام و نام خانوادگی ادمین را وارد نمایید:")
        } else next()
    }, [STATE_LIST.GETADMINFULLNAME]: (ctx, next) => {
        ctx.session.state = undefined
        if (ctx.message) {
            const AdminFullName = ctx.message.text
            ctx.session.stateData = {...ctx.session.stateData, AdminFullName}
            AddNewAdmin()

            function AddNewAdmin() {
                const admin = new Admin({
                    Username: ctx.session.stateData.AdminUserName,
                    Fullname: ctx.session.stateData.AdminFullName,
                })
                admin.save()
            }

            ctx.session.stateData = undefined
            ctx.reply("ادمین با موفقیت ثبت گردید.")
        } else next()
    },
    [STATE_LIST.ADDADVISER]: (ctx, next) => {
        ctx.session.state = undefined
        if (ctx.message) {
            const AdviserUsername = ctx.message.text
            ctx.session.stateData = {...ctx.session.stateData, AdviserUsername}
            ctx.session.state = STATE_LIST.GETADVISERFULLNAME
            ctx.reply("لطفا نام و نام خانوادگی مشاور را وارد نمایید:")
        } else next()
    }, [STATE_LIST.GETADVISERFULLNAME]: (ctx, next) => {
        ctx.session.state = undefined
        if (ctx.message) {
            const AdviserFullname = ctx.message.text
            ctx.session.stateData = {...ctx.session.stateData, AdviserFullname}
            AddNewAdviser()

            function AddNewAdviser() {
                const adviser = new Adviser({
                    Username: ctx.session.stateData.AdviserUsername,
                    Fullname: ctx.session.stateData.AdviserFullname,
                })
                adviser.save()
            }

            ctx.session.stateData = undefined
            ctx.reply("مشاور جدید با موفقیت ثبت گردید.")
        } else next()
    },
    [STATE_LIST.SENDMESSAGEFORADVISERS]: async (ctx, next) => {
        ctx.session.state = undefined
        const AdviserData = await Adviser.find()
        const AdvisersChatIds = AdviserData.map(element => element.ChatId)
        if (ctx.message) {
            const MessageId = ctx.message.message_id
            for (item in AdvisersChatIds) {
                await ctx.telegram.copyMessage(AdvisersChatIds[item], ctx.message.chat.id, MessageId)
            }
            ctx.reply("پیام شما برای مشاوران با موفقیت ارسال شد")
        } else next()
    },
    [STATE_LIST.SENDMESSAGEFORSTUDENTS]: async (ctx, next) => {
        ctx.session.state = undefined
        const UserData = await Users.find()
        const UsersChatIds = UserData.map(element => element.ChatId)
        if (ctx.message) {
            const MessageId = ctx.message.message_id
            for (item in UsersChatIds) {
                await ctx.telegram.copyMessage(UsersChatIds[item], ctx.message.chat.id, MessageId)
            }
            ctx.reply("پیام شما برای دانش آموزان با موفقیت ارسال شد")
        } else next()
    }, [STATE_LIST.SENDMESSAGEFORADMINS]: async (ctx, next) => {
        ctx.session.state = undefined
        if (ctx.message) {
            const chatId = ctx.message.chat.id
            const username = ctx.message.chat.username
            const messageId = ctx.message.message_id
            let adviser = await Adviser.findOne({ChatId: chatId})
            adviser.Username = username
            adviser.MessageId = messageId
            adviser.save()
            ctx.reply("پیام شما با موفقیت ارسال شد")
        }else next()
    }, [STATE_LIST.GETSTUDENTFULLNAME]: async (ctx, next) => {
        ctx.session.state = undefined
        if (ctx.message) {
            const Fullname = ctx.message.text
            ctx.session.stateData = {...ctx.session.stateData, Fullname}
            ctx.session.state = STATE_LIST.GETSTUDENTFIELD
            ctx.reply("لطفا رشته ی تحصیلی خود را وارد نمایید:")
        } else next()
    }
    , [STATE_LIST.GETSTUDENTFIELD]: async (ctx, next) => {
        ctx.session.state = undefined
        if (ctx.message) {
            const Field = ctx.message.text
            ctx.session.stateData = {...ctx.session.stateData, Field}
            ctx.session.state = STATE_LIST.GETSTUDENTGRADE
            ctx.reply("لطفا پایه ی خود را وارد نمایید:")
        } else next()
    }, [STATE_LIST.GETSTUDENTGRADE]: async (ctx, next) => {
        ctx.session.state = undefined
        if (ctx.message) {
            const Grade = ctx.message.text
            ctx.session.stateData = {...ctx.session.stateData, Grade}
            ctx.session.state = STATE_LIST.ASKQUESTION
            ctx.reply("سوال خود را وارد نمایید:")
        } else next()
    }, [STATE_LIST.ASKQUESTION]: async (ctx, next) => {
        ctx.session.state = undefined
        if (ctx.message) {
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

                ctx.reply("سوال شما ثبت گردید و دراسرع وقت توسط مشاوران پاسخ داده خواهد شد.")
            } else {
                StudentFile.Fullname = ctx.session.stateData.Fullname
                StudentFile.Field = ctx.session.stateData.Field
                StudentFile.Grade = ctx.session.stateData.Grade
                StudentFile.Username = username
                StudentFile.MessageId = messageId
                StudentFile.MessageText = messageText
                await StudentFile.save()
                ctx.reply("سوال شما ثبت گردید و در اسرع وقت توسط مشاوران پاسخ داده خواهد شد.")
            }
        } else next()
    }, [STATE_LIST.ANSWER]: (ctx, next) => {
        ctx.session.state = undefined
        if (ctx.message) {
            ctx.telegram.sendVoice(-1001704168213, ctx.message.voice.file_id, {caption: question[0]})
        } else next()
    }
}

module.exports.STATE_LIST = STATE_LIST