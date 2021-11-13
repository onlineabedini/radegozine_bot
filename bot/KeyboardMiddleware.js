const {
  MAIN_BUTTONS_TEXT,
  AdminsStartBtns,
  AdvisersStartBtns,
  StudentsStartBtns,
  manageAdminsBtns,
  manageAdvisersBtns,
  answerBtn,
  cancelBtn,
  addAdminCancelBtn,
  removeAdminCancelBtn,
  addAdviserCancelBtn,
  removeAdviserCancelBtn,
  plansBtn,
  contactWithAdminBtn,
} = require("./ButtonManager");

const {
  adminInfoMessage,
  adviserInfoMessage,
  studentInfoMessage,
  ENTERADMINUSERNAME,
  ENTERADVISERUSERNAME,
  ENTERMESSAGE,
  ENTERFULLNAME,
  ADMINSLIST,
  ADVISERSLIST,
  ADVISERSQUESTIONSLIST,
  STUDENTSQUESTIONSLIST,
  TIP,
  ADMINNOTFOUND,
  ADVISERNOTFOUND,
  SELECTANITEM,
  EMPTYLIST,
  REQUESTCANCELED,
  SEEPLANS,
  CONTACTWITHADMIN,
  BOTDEVELOPERSCAPTION,
  ADVISERSAUTHENTICATION,
} = require("./MessageHandler");
const { STATE_LIST } = require("./SessionMiddleware");

const Admin = require("../Admin");
const Adviser = require("../Adviser");
const Student = require("../Student");
const config = require("config");
let MessageIds;

module.exports = (ctx, next) => {
  if (!ctx.message) return next();
  const text = ctx.message.text;
  if (text)
    if (
      Object.values(MAIN_BUTTONS_TEXT).includes(text) &&
      EventListener[text]
    ) {
      return EventListener[text](ctx);
    }
  next();
};
EventListener = {
  [MAIN_BUTTONS_TEXT.ADDADMIN]: async (ctx) => {
    ctx.session.state = STATE_LIST.ADDADMIN;
    await ctx.reply(ENTERADMINUSERNAME, addAdminCancelBtn);
  },
  [MAIN_BUTTONS_TEXT.REMOVEADMIN]: async (ctx) => {
    ctx.session.state = STATE_LIST.REMOVEADMIN;
    await ctx.reply(ENTERADMINUSERNAME, removeAdminCancelBtn);
  },
  [MAIN_BUTTONS_TEXT.ADMINSLIST]: async (ctx) => {
    ctx.session.state = undefined;
    const AdminsData = await Admin.find();
    const AdminsId = AdminsData.map((element) => element.id);
    if (AdminsId.length !== 0) {
      let AdminsList = "";
      for (item in AdminsId) {
        const admin = await Admin.findOne({ _id: AdminsId[item] });
        AdminsList += adminInfoMessage(admin);
      }
      await ctx.reply(ADMINSLIST);
      await ctx.reply(AdminsList);
    } else {
      await ctx.reply(ADMINNOTFOUND);
    }
  },
  [MAIN_BUTTONS_TEXT.ADDADVISER]: async (ctx) => {
    ctx.session.state = STATE_LIST.ADDADVISER;
    await ctx.reply(ENTERADVISERUSERNAME, addAdviserCancelBtn);
  },
  [MAIN_BUTTONS_TEXT.REMOVEADVISER]: async (ctx) => {
    ctx.session.state = STATE_LIST.REMOVEADVISER;
    await ctx.reply(ENTERADVISERUSERNAME, removeAdviserCancelBtn);
  },
  [MAIN_BUTTONS_TEXT.ADVISERSLIST]: async (ctx) => {
    ctx.session.state = undefined;
    const AdvisersData = await Adviser.find();
    const AdvisersId = AdvisersData.map((element) => element.id);
    if (AdvisersId.length !== 0) {
      let AdvisersList = "";
      for (item in AdvisersId) {
        let adviser = await Adviser.findOne({ _id: AdvisersId[item] });
        AdvisersList += adviserInfoMessage(adviser);
      }
      await ctx.reply(ADVISERSLIST);
      await ctx.reply(AdvisersList);
    } else {
      await ctx.reply(ADVISERNOTFOUND);
    }
  },
  [MAIN_BUTTONS_TEXT.MANAGEADMINS]: async (ctx) => {
    ctx.session.state = undefined;
    await ctx.reply(SELECTANITEM, manageAdminsBtns);
  },
  [MAIN_BUTTONS_TEXT.MANAGEADVISERS]: async (ctx) => {
    ctx.session.state = undefined;
    await ctx.reply(SELECTANITEM, manageAdvisersBtns);
  },
  [MAIN_BUTTONS_TEXT.SENDMESSAGEFORADMINS]: async (ctx) => {
    let adviser = await Adviser.findOne({ ChatId: ctx.message.chat.id });
    if (adviser) {
      ctx.session.state = STATE_LIST.SENDMESSAGEFORADMINS;
      await ctx.reply(ENTERMESSAGE, cancelBtn);
    } else {
      ctx.reply(ADVISERSAUTHENTICATION, StudentsStartBtns);
    }
  },
  [MAIN_BUTTONS_TEXT.SENDMESSAGEFORADVISERS]: async (ctx) => {
    ctx.session.state = STATE_LIST.SENDMESSAGEFORADVISERS;
    await ctx.reply(ENTERMESSAGE, cancelBtn);
  },
  [MAIN_BUTTONS_TEXT.SENDMESSAGEFORSTUDENTS]: async (ctx) => {
    ctx.session.state = STATE_LIST.SENDMESSAGEFORSTUDENTS;
    await ctx.reply(ENTERMESSAGE, cancelBtn);
  },
  [MAIN_BUTTONS_TEXT.ASKQUESTIONS]: async (ctx) => {
    ctx.session.state = STATE_LIST.GETSTUDENTFULLNAME;
    await ctx.reply(TIP, cancelBtn);
    await ctx.reply(ENTERFULLNAME);
    // ctx.session.stateData = undefined
  },
  [MAIN_BUTTONS_TEXT.STUDENTSQUESTIONSLIST]: async (ctx) => {
    ctx.session.state = undefined;
    const StudentsData = await Student.find();
    const StudentsIds = StudentsData.map((element) => element.id);
    let adviser = await Adviser.findOne({
      Username: ctx.message.chat.username,
    });
    let admin = await Admin.findOne({ Username: ctx.message.chat.username });
    if (admin || adviser) {
      if (StudentsIds.length !== 0) {
        await ctx.reply(STUDENTSQUESTIONSLIST);
        for (item in StudentsIds) {
          let student = await Student.findOne({ _id: StudentsIds[item] });
          await ctx.telegram.sendMessage(
            ctx.message.chat.id,
            studentInfoMessage(student),
            answerBtn
          );
        }
      } else {
        await ctx.reply(EMPTYLIST);
      }
    } else {
      ctx.reply(ADVISERSAUTHENTICATION, StudentsStartBtns);
    }
  },
  [MAIN_BUTTONS_TEXT.ADVISERSQUESTIONSLIST]: async (ctx) => {
    ctx.session.state = undefined;
    const AdvisersData = await Adviser.find();
    const AdvisersIds = AdvisersData.map((element) => element.id);
    if (AdvisersIds.length !== 0) {
      MessageIds = [];
      await ctx.reply(ADVISERSQUESTIONSLIST);
      for (item in AdvisersIds) {
        let adviser = await Adviser.findOne({ _id: AdvisersIds[item] });
        let MessageId = adviser.MessageId;
        if (MessageId.length !== 0) {
          MessageIds.push(MessageId);
          for (item in MessageId) {
            await ctx.telegram.forwardMessage(
              ctx.message.chat.id,
              adviser.ChatId,
              MessageId[item]
            );
          }
        }
      }
      if (MessageIds.length === 0) {
        await ctx.reply(EMPTYLIST);
      }
    } else {
      await ctx.reply(EMPTYLIST);
    }
  },
  [MAIN_BUTTONS_TEXT.CANCEL]: async (ctx) => {
    ctx.session.state = undefined;
    ctx.session.stateData = undefined;
    const admin = await Admin.findOne({ Username: ctx.message.chat.username });
    const adviser = await Adviser.findOne({
      Username: ctx.message.chat.username,
    });
    if (
      admin ||
      ctx.message.from.username === config.get("MainAdminUsername")
    ) {
      await ctx.reply(REQUESTCANCELED, AdminsStartBtns);
    } else if (adviser) {
      await ctx.reply(REQUESTCANCELED, AdvisersStartBtns);
    } else {
      await ctx.reply(REQUESTCANCELED, StudentsStartBtns);
    }
  },
  [MAIN_BUTTONS_TEXT.ADDADMINCANCEL]: async (ctx) => {
    ctx.session.state = undefined;
    await ctx.reply(REQUESTCANCELED, manageAdminsBtns);
  },
  [MAIN_BUTTONS_TEXT.REMOVEADMINCANCEL]: async (ctx) => {
    ctx.session.state = undefined;
    await ctx.reply(REQUESTCANCELED, manageAdminsBtns);
  },
  [MAIN_BUTTONS_TEXT.ADDADVISERCANCEL]: async (ctx) => {
    ctx.session.state = undefined;
    await ctx.reply(REQUESTCANCELED, manageAdvisersBtns);
  },
  [MAIN_BUTTONS_TEXT.REMOVEADVISERCANCEL]: async (ctx) => {
    ctx.session.state = undefined;
    await ctx.reply(REQUESTCANCELED, manageAdvisersBtns);
  },
  [MAIN_BUTTONS_TEXT.BACK]: async (ctx) => {
    ctx.session.state = undefined;
    await ctx.reply(SELECTANITEM, AdminsStartBtns);
  },
  [MAIN_BUTTONS_TEXT.PLANS]: async (ctx) => {
    ctx.session.state = undefined;
    await ctx.reply(SEEPLANS, plansBtn);
  },
  [MAIN_BUTTONS_TEXT.CONTACTWITHADMIN]: async (ctx) => {
    ctx.session.state = undefined;
    await ctx.reply(CONTACTWITHADMIN, contactWithAdminBtn);
  },
  [MAIN_BUTTONS_TEXT.BOTDEVELOPERS]: async (ctx) => {
    ctx.session.state = undefined;
    await ctx.replyWithPhoto(
      { source: "./img/irnode.jpg" },
      {
        caption: BOTDEVELOPERSCAPTION,
      }
    );
  },
};
