const Admin = require("../Admin");
const Adviser = require("../Adviser");
const Student = require("../Student");
const Users = require("../User");
const config = require("config");
let QuestionText;
let MessageDatails;

const {
  MAIN_BUTTONS_TEXT,
  AdminsStartBtns,
  AdvisersStartBtns,
  StudentsStartBtns,
  manageAdminsBtns,
  manageAdvisersBtns,
} = require("./ButtonManager");
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
  ENTERTEXTONLY,
  TEXTMESSAGEONLY,
  ADMINNOTFOUND,
  ADVISERNOTFOUND,
  STUDENTNOTFOUND,
  ANSWERREGISTERED,
  YOURQUESTIONHASBEENANSWERED,
  VOICEMESSAGEONLY,
  NOADVISERADDED,
  ADMINREMOVED,
  ADVISERREMOVED,
  voiceCaption,
  SOMETHINGWENTWORNG,
  INVALIDUSERNAME,
} = require("./MessageHandler");

const STATE_LIST = {
  ADDADMIN: "addadmin",
  REMOVEADMIN: "removeadmin",
  ADDADVISER: "addadviser",
  REMOVEADVISER: "removeadviser",
  GETADMINFULLNAME: "getadminfullname",
  GETADVISERFULLNAME: "getadviserfullname",
  SENDMESSAGEFORADMINS: "sendmessageforadmins",
  SENDMESSAGEFORADVISERS: "sendmessageforadvisers",
  SENDMESSAGEFORSTUDENTS: "sendmessageforstudents",
  GETSTUDENTFULLNAME: "getstudentfullname",
  GETSTUDENTFIELD: "getstudentfield",
  GETSTUDENTGRADE: "getstudentgrade",
  ASKQUESTION: "askquestion",
  ANSWER: "answer",
};

module.exports = (ctx, next) => {
  if (!ctx.session.state) return next();
  const state = ctx.session.state;
  const values = Object.values(STATE_LIST);
  if (values.includes(state) && EventListener[state])
    return EventListener[state](ctx, next);
  next();
};

module.exports.sendQuestionText = (StudentQuestionText) => {
  QuestionText = [];
  QuestionText.push(StudentQuestionText);
};

module.exports.sendMessageDetails = (chatId, messageId1, messageId2) => {
  MessageDatails = [];
  MessageDatails.push(chatId, messageId1, messageId2);
};

const EventListener = {
  [STATE_LIST.ADDADMIN]: async (ctx, next) => {
    ctx.session.state = undefined;
    if (ctx.message && ctx.message.text !== MAIN_BUTTONS_TEXT.ADDADMINCANCEL) {
      if (ctx.message.text) {
        const InputText = ctx.message.text;
        const AdminUsername = InputText.split("@")[1];
        if (AdminUsername) {
          ctx.session.stateData = { ...ctx.session.stateData, AdminUsername };
          ctx.session.state = STATE_LIST.GETADMINFULLNAME;
          await ctx.reply(ENTERADMINFULLNAME);
        } else {
          ctx.reply(INVALIDUSERNAME, manageAdminsBtns);
        }
      } else {
        await ctx.reply(ENTERTEXTONLY, manageAdminsBtns);
      }
    } else next();
  },
  [STATE_LIST.REMOVEADMIN]: async (ctx, next) => {
    ctx.session.state = undefined;
    if (
      ctx.message &&
      ctx.message.text !== MAIN_BUTTONS_TEXT.REMOVEADMINCANCEL
    ) {
      if (ctx.message.text) {
        const InputText = ctx.message.text;
        const AdminUsername = InputText.split("@")[1];
        const admin = await Admin.findOne({ Username: AdminUsername });
        if (admin) {
          await Admin.findOneAndDelete({ Username: AdminUsername });
          await ctx.reply(ADMINREMOVED, manageAdminsBtns);
        } else {
          await ctx.reply(ADMINNOTFOUND, manageAdminsBtns);
        }
      } else {
        await ctx.reply(ENTERTEXTONLY, manageAdminsBtns);
      }
    } else next();
  },
  [STATE_LIST.GETADMINFULLNAME]: async (ctx, next) => {
    ctx.session.state = undefined;
    if (ctx.message && ctx.message.text !== MAIN_BUTTONS_TEXT.CANCEL) {
      if (ctx.message.text) {
        const AdminFullname = ctx.message.text;
        ctx.session.stateData = { ...ctx.session.stateData, AdminFullname };
        const AdminData = await Admin.findOne({
          Username: ctx.session.stateData.AdminUsername,
        });
        if (!AdminData) {
          AddNewAdmin();
          await ctx.reply(ADMINCONFIRMMESSAGE, AdminsStartBtns);
        } else {
          await ctx.reply(DUPLICATEADMIN, AdminsStartBtns);
        }

        function AddNewAdmin() {
          const admin = new Admin({
            Username: ctx.session.stateData.AdminUsername,
            Fullname: ctx.session.stateData.AdminFullname,
          });
          admin.save();
        }

        ctx.session.stateData = undefined;
      } else {
        await ctx.reply(ENTERTEXTONLY, manageAdminsBtns);
      }
    } else next();
  },
  [STATE_LIST.ADDADVISER]: async (ctx, next) => {
    ctx.session.state = undefined;
    if (
      ctx.message &&
      ctx.message.text !== MAIN_BUTTONS_TEXT.ADDADVISERCANCEL
    ) {
      if (ctx.message.text) {
        const InputText = ctx.message.text;
        const AdviserUsername = InputText.split("@")[1];
        if (AdviserUsername) {
          ctx.session.stateData = { ...ctx.session.stateData, AdviserUsername };
          ctx.session.state = STATE_LIST.GETADVISERFULLNAME;
          await ctx.reply(ENTERADVISERFULLNAME);
        } else {
          ctx.reply(INVALIDUSERNAME, manageAdvisersBtns);
        }
      } else {
        await ctx.reply(ENTERTEXTONLY, manageAdvisersBtns);
      }
    } else next();
  },
  [STATE_LIST.REMOVEADVISER]: async (ctx, next) => {
    ctx.session.state = undefined;
    if (
      ctx.message &&
      ctx.message.text !== MAIN_BUTTONS_TEXT.REMOVEADVISERCANCEL
    ) {
      if (ctx.message.text) {
        const InputText = ctx.message.text;
        const AdviserUsername = InputText.split("@")[1];
        const adviser = await Adviser.findOne({ Username: AdviserUsername });
        if (adviser) {
          await Adviser.findOneAndDelete({ Username: AdviserUsername });
          await ctx.reply(ADVISERREMOVED, manageAdvisersBtns);
        } else {
          await ctx.reply(ADVISERNOTFOUND, manageAdvisersBtns);
        }
      } else {
        await ctx.reply(ENTERTEXTONLY, manageAdvisersBtns);
      }
    } else next();
  },
  [STATE_LIST.GETADVISERFULLNAME]: async (ctx, next) => {
    ctx.session.state = undefined;
    if (ctx.message && ctx.message.text !== MAIN_BUTTONS_TEXT.CANCEL) {
      if (ctx.message.text) {
        const AdviserFullname = ctx.message.text;
        ctx.session.stateData = { ...ctx.session.stateData, AdviserFullname };
        const AdviserData = await Adviser.findOne({
          Username: ctx.session.stateData.AdviserUsername,
        });

        if (!AdviserData) {
          AddNewAdviser();
          await ctx.reply(ADVISERCONFIRMMESSAGE, AdminsStartBtns);
        } else {
          await ctx.reply(DUPLICATEADVISER, AdminsStartBtns);
        }

        function AddNewAdviser() {
          const adviser = new Adviser({
            Username: ctx.session.stateData.AdviserUsername,
            Fullname: ctx.session.stateData.AdviserFullname,
          });
          adviser.save();
        }

        ctx.session.stateData = undefined;
      } else {
        await ctx.reply(ENTERTEXTONLY, manageAdvisersBtns);
      }
    } else next();
  },
  [STATE_LIST.SENDMESSAGEFORADVISERS]: async (ctx, next) => {
    ctx.session.state = undefined;
    if (ctx.message && ctx.message.text !== MAIN_BUTTONS_TEXT.CANCEL) {
      const AdvisersData = await Adviser.find();
      const AdvisersId = AdvisersData.map((element) => element.id);
      if (AdvisersId.length !== 0) {
        for (item in AdvisersId) {
          let adviser = await Adviser.findOne({ _id: AdvisersId[item] });
          const ChatId = adviser.ChatId;
          if (ChatId) {
            const MessageId = ctx.message.message_id;
            await ctx.telegram.forwardMessage(
              ChatId,
              ctx.message.chat.id,
              MessageId
            );
          } else {
            console.log(
              `the username (${adviser.Username}) has not started the bot or does not exist`
            );
          }
        }
        await ctx.reply(SENDMESSAGEFORADVISERSWASSUCCESSFUL, AdminsStartBtns);
      } else {
        await ctx.reply(NOADVISERADDED, AdminsStartBtns);
      }
    } else next();
  },
  [STATE_LIST.SENDMESSAGEFORSTUDENTS]: async (ctx, next) => {
    ctx.session.state = undefined;
    if (ctx.message && ctx.message.text !== MAIN_BUTTONS_TEXT.CANCEL) {
      const UserData = await Users.find();
      const UsersChatIds = UserData.map((element) => element.ChatId);
      if (UsersChatIds.length !== 0) {
        const MessageId = ctx.message.message_id;
        for (item in UsersChatIds) {
          await ctx.telegram.forwardMessage(
            UsersChatIds[item],
            ctx.message.chat.id,
            MessageId
          );
        }
        ctx.reply(SENDMESSAGEFORSTUDENTSWASSUCCESSFUL, AdminsStartBtns);
      } else {
        await ctx.reply(STUDENTNOTFOUND, AdminsStartBtns);
      }
    } else next();
  },
  [STATE_LIST.SENDMESSAGEFORADMINS]: async (ctx, next) => {
    ctx.session.state = undefined;
    if (ctx.message && ctx.message.text !== MAIN_BUTTONS_TEXT.CANCEL) {
      let adviser = await Adviser.findOne({ ChatId: ctx.message.chat.id });
      adviser.Username = ctx.message.chat.username;
      adviser.MessageId.push(ctx.message.message_id);
      adviser.save();
      await ctx.reply(SENDMESSAGEWASSUCCESSFUL, AdvisersStartBtns);
    } else next();
  },
  [STATE_LIST.GETSTUDENTFULLNAME]: async (ctx, next) => {
    ctx.session.state = undefined;
    if (ctx.message && ctx.message.text !== MAIN_BUTTONS_TEXT.CANCEL) {
      if (ctx.message.text) {
        const Fullname = ctx.message.text;
        ctx.session.stateData = { ...ctx.session.stateData, Fullname };
        ctx.session.state = STATE_LIST.GETSTUDENTFIELD;
        await ctx.reply(ENTERFIELD);
      } else {
        await ctx.reply(ENTERTEXTONLY, StudentsStartBtns);
      }
    } else next();
  },
  [STATE_LIST.GETSTUDENTFIELD]: async (ctx, next) => {
    ctx.session.state = undefined;
    if (ctx.message && ctx.message.text !== MAIN_BUTTONS_TEXT.CANCEL) {
      if (ctx.message.text) {
        const Field = ctx.message.text;
        ctx.session.stateData = { ...ctx.session.stateData, Field };
        ctx.session.state = STATE_LIST.GETSTUDENTGRADE;
        await ctx.reply(ENTERGRADE);
      } else {
        ctx.session.stateData = undefined;
        await ctx.reply(ENTERTEXTONLY, StudentsStartBtns);
      }
    } else next();
  },
  [STATE_LIST.GETSTUDENTGRADE]: async (ctx, next) => {
    ctx.session.state = undefined;
    if (ctx.message && ctx.message.text !== MAIN_BUTTONS_TEXT.CANCEL) {
      if (ctx.message.text) {
        const Grade = ctx.message.text;
        ctx.session.stateData = { ...ctx.session.stateData, Grade };
        ctx.session.state = STATE_LIST.ASKQUESTION;
        await ctx.reply(ENTERQUESTION);
      } else {
        ctx.session.stateData = undefined;
        await ctx.reply(ENTERTEXTONLY, StudentsStartBtns);
      }
    } else next();
  },
  [STATE_LIST.ASKQUESTION]: async (ctx, next) => {
    ctx.session.state = undefined;
    if (ctx.message && ctx.message.text !== MAIN_BUTTONS_TEXT.CANCEL) {
      if (ctx.message.text) {
        const Fullname = ctx.session.stateData.Fullname;
        const Field = ctx.session.stateData.Field;
        const Grade = ctx.session.stateData.Grade;
        const chatId = ctx.message.chat.id;
        const username = ctx.message.chat.username;
        const messageId = ctx.message.message_id;
        const messageText = ctx.message.text;
        AddNewStudent();
        function AddNewStudent() {
          const student = new Student({
            ChatId: chatId,
            Username: username,
            Fullname: Fullname,
            Field: Field,
            Grade: Grade,
            MessageId: messageId,
            MessageText: messageText,
          });
          student.save();
        }
        ctx.session.stateData = undefined;
        await ctx.reply(QUESTIONREGISTERED, StudentsStartBtns);
      } else {
        ctx.session.stateData = undefined;
        await ctx.reply(TEXTMESSAGEONLY, StudentsStartBtns);
      }
    } else next();
  },
  [STATE_LIST.ANSWER]: async (ctx, next) => {
    ctx.session.state = undefined;
    if (
      ctx.update.callback_query?.data &&
      ctx.update.callback_query.data !== "CANCEL"
    ) {
      const tempMessage = await ctx.reply(SOMETHINGWENTWORNG);
      await ctx.telegram.deleteMessage(MessageDatails[0], MessageDatails[2]);
      setTimeout(() => {
        ctx.telegram.deleteMessage(tempMessage.chat.id, tempMessage.message_id);
      }, 3000);
    } else if (ctx.update.callback_query?.data === "CANCEL") {
      await ctx.telegram.deleteMessage(
        ctx.update.callback_query.message.chat.id,
        ctx.update.callback_query.message.message_id
      );
    } else if (ctx.message?.voice) {
      await ctx.telegram.sendVoice(
        config.get("ChannelChatId"),
        ctx.message.voice.file_id,
        { caption: voiceCaption(QuestionText[0]) }
      );
      const tempMessage = await ctx.reply(ANSWERREGISTERED);
      const student = await Student.findOne({
        MessageText: QuestionText[0].split(":")[1],
      });
      await ctx.telegram.sendMessage(
        student.ChatId,
        YOURQUESTIONHASBEENANSWERED
      );
      await ctx.telegram.deleteMessage(
        ctx.message.chat.id,
        ctx.message.message_id
      );
      await ctx.telegram.deleteMessage(MessageDatails[0], MessageDatails[2]);
      await ctx.telegram.deleteMessage(MessageDatails[0], MessageDatails[1]);
      setTimeout(() => {
        ctx.telegram.deleteMessage(tempMessage.chat.id, tempMessage.message_id);
      }, 3000);
      await Student.findOneAndDelete({
        MessageText: QuestionText[0].split(":")[1],
      });
    } else {
      await ctx.reply(VOICEMESSAGEONLY);
      next();
    }
  },
};

module.exports.STATE_LIST = STATE_LIST;
