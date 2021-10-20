const {MAIN_BUTTONS_TEXT, answerBtn} = require("./ButtonManager")
const {adminInfoMessage, adviserInfoMessage, studentInfoMessage} = require("./MessageHandler")
const {STATE_LIST} = require("./SessionMiddleware")

const Admin = require("../Admin")
const Adviser = require("../Adviser")
const Student = require("../Student")

module.exports = (ctx, next) => {
    if (!ctx.message)
        return next()
    const text = ctx.message.text
    if (text)
        if (Object.values(MAIN_BUTTONS_TEXT).includes(text) && EventListener[text]) {
            return EventListener[text](ctx)
        }
    next()
}
EventListener = {
    [MAIN_BUTTONS_TEXT.ADDADMIN]: async (ctx) => {
        ctx.session.state = STATE_LIST.ADDADMIN
        ctx.reply(" لطفا یوزر نیم مدیر جدید را وارد نمایید : ")
    },
    [MAIN_BUTTONS_TEXT.ADMINSLIST]: async (ctx) => {
        const AdminsData = await Admin.find()
        const AdminsId = AdminsData.map(element => element.id)
        let AdminsList = ""
        for (item in AdminsId) {
            let admin = await Admin.findOne({_id: AdminsId[item]})
            AdminsList += adminInfoMessage(admin)
        }
        ctx.reply("لیست مدیران")
        ctx.reply(AdminsList)
    },
    [MAIN_BUTTONS_TEXT.ADDADVISER]: async (ctx) => {
        ctx.session.state = STATE_LIST.ADDADVISER
        ctx.reply(" لطفا یوزرنیم مشاور جدید را وارد نمایید : ")
    },
    [MAIN_BUTTONS_TEXT.ADVISERSLIST]: async (ctx) => {
        const AdvisersData = await Adviser.find()
        const AdvisersId = AdvisersData.map(element => element.id)
        let AdvisersList = ""
        for (item in AdvisersId) {
            let adviser = await Adviser.findOne({_id: AdvisersId[item]})
            AdvisersList += adviserInfoMessage(adviser)
        }
        ctx.reply("لیست مشاوران")
        ctx.reply(AdvisersList)
    },
    [MAIN_BUTTONS_TEXT.SENDMESSAGEFORADVISERS]: async (ctx) => {
        ctx.session.state = STATE_LIST.SENDMESSAGEFORADVISERS
        ctx.reply("لطفا پیام خود را وارد نمایید : ")
    }, [MAIN_BUTTONS_TEXT.ASKQUESTIONS]: async (ctx) => {
        ctx.session.state = STATE_LIST.GETSTUDENTFULLNAME
        ctx.reply("دانش آموز گرامی جهت پرسش از مشاورین باید مشخصات خواسته شده را وارد نمایید")
        ctx.reply("لطفا نام و نام خانوادگی خود را وارد نمایید:")
        // ctx.session.stateData = undefined
    }, [MAIN_BUTTONS_TEXT.SENDMESSAGEFORSTUDENTS]: async (ctx) => {
        ctx.session.state = STATE_LIST.SENDMESSAGEFORSTUDENTS
        ctx.reply("لطفا پیام خود را وارد نمایید:")
    }, [MAIN_BUTTONS_TEXT.SENDMESSAGEFORADMINS]: async (ctx) => {
        ctx.session.state = STATE_LIST.SENDMESSAGEFORADMINS
        ctx.reply("لطفا پیام خود را وارد نمایید:")
    },
    [MAIN_BUTTONS_TEXT.QUESTIONSLISTFORADVISERS]: async (ctx) => {
        ctx.reply("لیست سوالات دانش آموزان")
        const StudentsData = await Student.find()
        const StudentsIds = StudentsData.map(element => element.id)
        for (item in StudentsIds) {
            let student = await Student.findOne({_id: StudentsIds[item]})
            await ctx.telegram.sendMessage(ctx.message.chat.id, studentInfoMessage(student), answerBtn)
            //await Student.findOneAndDelete({ChatId: student.ChatId})
        }
    },
    [MAIN_BUTTONS_TEXT.QUESTIONSLIST]: async (ctx) => {
        ctx.reply("لیست سوالات مشاوران")
        const AdvisersData = await Adviser.find()
        const AdvisersIds = AdvisersData.map(element => element.id)
        for (item in AdvisersIds) {
            let adviser = await Adviser.findOne({_id: AdvisersIds[item]})
            await ctx.telegram.forwardMessage(ctx.message.chat.id , adviser.ChatId , adviser.MessageId)
        }
    }, [MAIN_BUTTONS_TEXT.CONTACTWITHADMIN]: async (ctx) => {

    }, [MAIN_BUTTONS_TEXT.BOTDEVELOPER]: async (ctx) => {
        ctx.reply("این بات توسط  تیم آی آر نود توسعه داده شده است")
    },
}