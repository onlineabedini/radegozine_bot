const {
    MAIN_BUTTONS_TEXT,
    answerBtn ,
    cancelBtn,
    AdminsStartBtns,
    AdvisersStartBtns,
    StudentsStartBtns,
} = require("./ButtonManager")
const {
    adminInfoMessage,
    adviserInfoMessage,
    studentInfoMessage,
    ENTERADMINUSERNAME ,
    ENTERADVISERUSERNAME,
    ENTERMESSAGE,
    ENTERFULLNAME,
    ADMINSLIST,
    ADVISERSLIST,
    ADVISERSQUESTIONSLIST,
    STUDENTSQUESTIONSLIST,
    TIP,
} = require("./MessageHandler")
const {STATE_LIST} = require("./SessionMiddleware")

const Admin = require("../Admin")
const Adviser = require("../Adviser")
const Student = require("../Student")
const User = require("../User")

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
        ctx.reply(ENTERADMINUSERNAME , cancelBtn)
    },
    [MAIN_BUTTONS_TEXT.ADMINSLIST]: async (ctx) => {
        const AdminsData = await Admin.find()
        const AdminsId = AdminsData.map(element => element.id)
        let AdminsList = ""
        for (item in AdminsId) {
            let admin = await Admin.findOne({_id: AdminsId[item]})
            AdminsList += adminInfoMessage(admin)
        }
        ctx.reply(ADMINSLIST)
        ctx.reply(AdminsList)
    },
    [MAIN_BUTTONS_TEXT.ADDADVISER]: async (ctx) => {
        ctx.session.state = STATE_LIST.ADDADVISER
        ctx.reply(ENTERADVISERUSERNAME , cancelBtn)
    },
    [MAIN_BUTTONS_TEXT.ADVISERSLIST]: async (ctx) => {
        const AdvisersData = await Adviser.find()
        const AdvisersId = AdvisersData.map(element => element.id)
        let AdvisersList = ""
        for (item in AdvisersId) {
            let adviser = await Adviser.findOne({_id: AdvisersId[item]})
            AdvisersList += adviserInfoMessage(adviser)
        }
        ctx.reply(ADVISERSLIST)
        ctx.reply(AdvisersList)
    },
    [MAIN_BUTTONS_TEXT.SENDMESSAGEFORADVISERS]: async (ctx) => {
        ctx.session.state = STATE_LIST.SENDMESSAGEFORADVISERS
        ctx.reply(ENTERMESSAGE, cancelBtn)
    }, [MAIN_BUTTONS_TEXT.ASKQUESTIONS]: async (ctx) => {
        ctx.session.state = STATE_LIST.GETSTUDENTFULLNAME
        ctx.reply(TIP, cancelBtn)
        ctx.reply(ENTERFULLNAME)
        // ctx.session.stateData = undefined
    }, [MAIN_BUTTONS_TEXT.SENDMESSAGEFORSTUDENTS]: async (ctx) => {
        ctx.session.state = STATE_LIST.SENDMESSAGEFORSTUDENTS
        ctx.reply(ENTERMESSAGE, cancelBtn)
    }, [MAIN_BUTTONS_TEXT.SENDMESSAGEFORADMINS]: async (ctx) => {
        ctx.session.state = STATE_LIST.SENDMESSAGEFORADMINS
        ctx.reply(ENTERMESSAGE, cancelBtn)
    },
    [MAIN_BUTTONS_TEXT.QUESTIONSLISTFORADVISERS]: async (ctx) => {
        ctx.reply(STUDENTSQUESTIONSLIST)
        const StudentsData = await Student.find()
        const StudentsIds = StudentsData.map(element => element.id)
        for (item in StudentsIds) {
            let student = await Student.findOne({_id: StudentsIds[item]})
            await ctx.telegram.sendMessage(ctx.message.chat.id , studentInfoMessage(student), answerBtn)
            //await Student.findOneAndDelete({ChatId: student.ChatId})
        }
    },
    [MAIN_BUTTONS_TEXT.QUESTIONSLIST]: async (ctx) => {
        ctx.reply(ADVISERSQUESTIONSLIST)
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
    [MAIN_BUTTONS_TEXT.CANCEL]: async (ctx) => {
        ctx.session.state = undefined
        ctx.session.stateData = undefined
        const admin = await Admin.findOne({Username : ctx.message.chat.username})
        const adviser = await Adviser.findOne({Username : ctx.message.chat.username})
        if (admin || ctx.message.from.username === 'ALINPDEV'){
            ctx.reply("درخواست شما لغو شد",AdminsStartBtns)
        } else if (adviser){
            ctx.reply("درخواست شما لغو شد",AdvisersStartBtns)
        } else {
            ctx.reply("درخواست شما لغو شد",StudentsStartBtns)
        }
    },
}