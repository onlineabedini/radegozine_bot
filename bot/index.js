const {Telegraf} = require('telegraf')
const LocalSession = require('telegraf-session-local')
const SessionMiddleware = require('./SessionMiddleware')
const KeyboardMiddleware = require('./KeyboardMiddleware')
const ActionMiddleware = require('./ActionMiddleware')
//const Middleware = require("./Middleware")
const {AdminsStartBtns, AdvisersStartBtns, StudentsStartBtns} = require("./ButtonManager")
const {
    STARTMESSAGEFORADMIN,
    STARTMESSAGEFORADVISER,
    STARTMESSAGEFORSTUDENT,
} = require("./MessageHandler")
const Admin = require("../Admin")
const Adviser = require("../Adviser")
const User = require("../User")
let bot

async function startBot() {
    bot = new Telegraf(process.env.BOT_TOKEN)
    await bot.launch()
    bot.use(new LocalSession({database: "session.json"}))

    //bot.use(Middleware)
    bot.use(KeyboardMiddleware)
    bot.use(SessionMiddleware)
    bot.use(ActionMiddleware)

    bot.start(ctx => {
        RoleSelector()
        async function RoleSelector() {
            const AdminData = await Admin.find()
            const AdminUsernames = AdminData.map(element => element.Username)
            const AdviserData = await Adviser.find()
            const AdviserUsernames = AdviserData.map(element => element.Username)
            // ALINPDEV IS THE MAIN ADMIN
            if (ctx.message.from.username === 'ALINPDEV' || AdminUsernames.includes(ctx.message.from.username)) {
                ctx.reply(STARTMESSAGEFORADMIN, AdminsStartBtns)
            } else if (AdviserUsernames.includes(ctx.message.from.username)) {
                let adviser = await Adviser.findOne({Username: ctx.message.from.username})
                adviser.ChatId = ctx.message.chat.id
                await adviser.save();
                ctx.reply(STARTMESSAGEFORADVISER, AdvisersStartBtns)
            } else {
                const UserData = await User.findOne({ChatId: ctx.message.chat.id})
                if (!UserData) {
                    AddUser()
                    function AddUser() {
                        const user = new User({
                            ChatId:ctx.message.chat.id
                        })
                        user.save()
                    }
                    ctx.reply(STARTMESSAGEFORSTUDENT, StudentsStartBtns)
                } else ctx.reply(STARTMESSAGEFORSTUDENT, StudentsStartBtns)

            }
        }

    })

}

module.exports.startBot = startBot
