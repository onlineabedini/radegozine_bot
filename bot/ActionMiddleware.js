const Student = require("../Student");
const {
  STATE_LIST,
  sendQuestionText,
  sendMessageDetails,
} = require("./SessionMiddleware");
const { confidenceBtn, cancelAdviserAnswerBtn } = require("./ButtonManager");
const {
  ENTERANSWER,
  DELETEMESSAGEWASSUCCESSFUL,
  DELETEMESSAGEREQUESTCANCELED,
  DELETEMESSAGECONFIDENCE,
  THISMESSAGEHASBEENDELETED,
  DELETETIP,
} = require("./MessageHandler");

const ActionMap = {
  ANSWER: /^ANSWER/,
  DELETE: /^DELETE/,
  YES: /^YES/,
  NO: /^NO/,
  CANCEL: /^CANCEL/,
};

let MessageId;
let ChatId;
let StudentQuestion;

module.exports = (ctx, next) => {
  if (!ctx.update.callback_query) return next();
  const callback_data = ctx.update.callback_query.data;
  if (callback_data) {
    const actionValues = Object.values(ActionMap);
    for (let i = 0; i < actionValues.length; i++) {
      const isMatch = callback_data.match(actionValues[i]);
      if (isMatch && EventListener[Object.keys(ActionMap)[i]])
        return EventListener[Object.keys(ActionMap)[i]](ctx, isMatch);
    }
  }
  next();
};

const EventListener = {
  ANSWER: async (ctx) => {
    const tempMessage = await ctx.reply(ENTERANSWER, cancelAdviserAnswerBtn);
    sendQuestionText(ctx.update.callback_query.message.text.split("❓")[1]);
    sendMessageDetails(
      ctx.update.callback_query.message.chat.id,
      ctx.update.callback_query.message.message_id,
      tempMessage.message_id
    );
    ctx.session.state = STATE_LIST.ANSWER;
  },
  DELETE: async (ctx) => {
    MessageId = ctx.update.callback_query.message.message_id;
    ChatId = ctx.update.callback_query.message.chat.id;
    StudentQuestion = ctx.update.callback_query.message.text;
    ctx.reply(DELETEMESSAGECONFIDENCE, confidenceBtn);
  },
  YES: async (ctx) => {
    if (StudentQuestion) {
      await Student.findOneAndDelete({
        MessageText: StudentQuestion.split("❓")[1].split(":")[1],
      });
      try {
        await ctx.telegram.deleteMessage(ChatId, MessageId);
        await ctx.telegram.deleteMessage(
          ctx.update.callback_query.message.chat.id,
          ctx.update.callback_query.message.message_id
        );
        const tempMessage = await ctx.reply(DELETEMESSAGEWASSUCCESSFUL);
        setTimeout(() => {
          ctx.telegram.deleteMessage(
            tempMessage.chat.id,
            tempMessage.message_id
          );
        }, 3000);
      } catch (err) {
        console.log(err);
        await ctx.telegram.deleteMessage(
          ctx.update.callback_query.message.chat.id,
          ctx.update.callback_query.message.message_id
        );
        const tempMessage = await ctx.reply(THISMESSAGEHASBEENDELETED);
        setTimeout(() => {
          ctx.telegram.deleteMessage(
            tempMessage.chat.id,
            tempMessage.message_id
          );
        }, 3000);
      }
    } else {
      await ctx.telegram.deleteMessage(
        ctx.update.callback_query.message.chat.id,
        ctx.update.callback_query.message.message_id
      );
      const tempMessage = await ctx.reply(DELETETIP);
      setTimeout(() => {
        ctx.telegram.deleteMessage(tempMessage.chat.id, tempMessage.message_id);
      }, 3000);
    }
  },
  NO: async (ctx) => {
    await ctx.telegram.deleteMessage(
      ctx.update.callback_query.message.chat.id,
      ctx.update.callback_query.message.message_id
    );
    const tempMessage = await ctx.reply(DELETEMESSAGEREQUESTCANCELED);
    setTimeout(() => {
      ctx.telegram.deleteMessage(tempMessage.chat.id, tempMessage.message_id);
    }, 3000);
  },
  CANCEL: async (ctx) => {
    await ctx.telegram.deleteMessage(
      ctx.update.callback_query.message.chat.id,
      ctx.update.callback_query.message.message_id
    );
  },
};
