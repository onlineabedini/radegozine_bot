MAIN_BUTTONS_TEXT = {
  MANAGEADMINS: "👤  مدیریت مدیران",
  MANAGEADVISERS: "🗣  مدیریت مشاوران",
  ADDADMIN: "➕  افزودن مدیر",
  REMOVEADMIN: "❌  حذف مدیر",
  ADMINSLIST: "👤  نمایش لیست مدیران",
  ADDADVISER: "➕  افزودن مشاور",
  REMOVEADVISER: "❌  حذف مشاور",
  ADVISERSLIST: "🗣  نمایش لیست مشاوران",
  SENDMESSAGEFORADMINS: "📤  ارسال پیام برای مدیران",
  SENDMESSAGEFORADVISERS: "📤  ارسال پیام برای مشاوران",
  SENDMESSAGEFORSTUDENTS: "📤  ارسال پیام برای دانش آموزان",
  ADVISERSQUESTIONSLIST: "📥  پیام های مشاوران",
  STUDENTSQUESTIONSLIST: "📥  لیست سوالات دانش آموزان",
  ASKQUESTIONS: "⁉️  سوال از مشاورین  ⁉️",
  PLANS: "🗂  طرح ها  🗂",
  CONTACTWITHADMIN: "👤  ارتباط با مدیر  👤",
  BOTDEVELOPERS: "👨🏻‍💻  تیم توسعه و طراحی بات  👨🏻‍💻",
  CANCEL: "❌        لغو        ❌",
  ADDADMINCANCEL: "❌        لغو افزودن مدیر        ❌",
  REMOVEADMINCANCEL: "❌        لغو حذف مدیر        ❌",
  ADDADVISERCANCEL: "❌        لغو افزودن مشاور        ❌",
  REMOVEADVISERCANCEL: "❌        لغو حذف مشاور        ❌",
  BACK: "↩️  بازگشت",
};

const AdminsStartBtns = {
  reply_markup: {
    resize_keyboard: true,
    keyboard: [
      [
        { text: MAIN_BUTTONS_TEXT.MANAGEADVISERS },
        { text: MAIN_BUTTONS_TEXT.MANAGEADMINS },
      ],
      [
        { text: MAIN_BUTTONS_TEXT.SENDMESSAGEFORSTUDENTS },
        { text: MAIN_BUTTONS_TEXT.SENDMESSAGEFORADVISERS },
      ],
      [
        { text: MAIN_BUTTONS_TEXT.STUDENTSQUESTIONSLIST },
        { text: MAIN_BUTTONS_TEXT.ADVISERSQUESTIONSLIST },
      ],
      [{ text: MAIN_BUTTONS_TEXT.BOTDEVELOPERS }],
    ],
  },
};

const AdvisersStartBtns = {
  reply_markup: {
    resize_keyboard: true,
    keyboard: [
      [{ text: MAIN_BUTTONS_TEXT.STUDENTSQUESTIONSLIST }],
      [{ text: MAIN_BUTTONS_TEXT.SENDMESSAGEFORADMINS }],
      [{ text: MAIN_BUTTONS_TEXT.BOTDEVELOPERS }],
    ],
  },
};

const StudentsStartBtns = {
  reply_markup: {
    resize_keyboard: true,
    keyboard: [
      [{ text: MAIN_BUTTONS_TEXT.ASKQUESTIONS }],
      [
        { text: MAIN_BUTTONS_TEXT.CONTACTWITHADMIN },
        { text: MAIN_BUTTONS_TEXT.PLANS },
      ],
      [{ text: MAIN_BUTTONS_TEXT.BOTDEVELOPERS }],
    ],
  },
};

const manageAdminsBtns = {
  reply_markup: {
    resize_keyboard: true,
    keyboard: [
      [{ text: MAIN_BUTTONS_TEXT.ADMINSLIST }],
      [
        { text: MAIN_BUTTONS_TEXT.REMOVEADMIN },
        { text: MAIN_BUTTONS_TEXT.ADDADMIN },
      ],
      [{ text: MAIN_BUTTONS_TEXT.BACK }],
    ],
  },
};

const manageAdvisersBtns = {
  reply_markup: {
    resize_keyboard: true,
    keyboard: [
      [{ text: MAIN_BUTTONS_TEXT.ADVISERSLIST }],
      [
        { text: MAIN_BUTTONS_TEXT.REMOVEADVISER },
        { text: MAIN_BUTTONS_TEXT.ADDADVISER },
      ],
      [{ text: MAIN_BUTTONS_TEXT.BACK }],
    ],
  },
};

const answerBtn = {
  reply_markup: {
    resize_keyboard: true,
    inline_keyboard: [
      [{ text: "پاسخ به سوال", callback_data: `ANSWER` }],
      [{ text: "حذف سوال", callback_data: `DELETE` }],
    ],
  },
};

const confidenceBtn = {
  reply_markup: {
    resize_keyboard: true,
    inline_keyboard: [
      [
        { text: "خیر", callback_data: `NO` },
        { text: "بله", callback_data: `YES` },
      ],
    ],
  },
};

const cancelAdviserAnswerBtn = {
  reply_markup: {
    resize_keyboard: true,
    inline_keyboard: [[{ text: "لغو", callback_data: "CANCEL" }]],
  },
};

const addAdminCancelBtn = {
  reply_markup: {
    resize_keyboard: true,
    keyboard: [[{ text: MAIN_BUTTONS_TEXT.ADDADMINCANCEL }]],
  },
};

const removeAdminCancelBtn = {
  reply_markup: {
    resize_keyboard: true,
    keyboard: [[{ text: MAIN_BUTTONS_TEXT.REMOVEADMINCANCEL }]],
  },
};

const addAdviserCancelBtn = {
  reply_markup: {
    resize_keyboard: true,
    keyboard: [[{ text: MAIN_BUTTONS_TEXT.ADDADVISERCANCEL }]],
  },
};

const removeAdviserCancelBtn = {
  reply_markup: {
    resize_keyboard: true,
    keyboard: [[{ text: MAIN_BUTTONS_TEXT.REMOVEADVISERCANCEL }]],
  },
};

const cancelBtn = {
  reply_markup: {
    resize_keyboard: true,
    keyboard: [[{ text: MAIN_BUTTONS_TEXT.CANCEL }]],
  },
};

const backBtn = {
  reply_markup: {
    resize_keyboard: true,
    keyboard: [[{ text: MAIN_BUTTONS_TEXT.BACK }]],
  },
};

const plansBtn = {
  reply_markup: {
    resize_keyboard: true,
    inline_keyboard: [
      [{ text: "مشاهده ی طرح ها", url: "https://t.me/radegozine_services" }],
    ],
  },
};

const contactWithAdminBtn = {
  reply_markup: {
    resize_keyboard: true,
    inline_keyboard: [
      [{ text: "ارتباط با مدیر", url: "https://t.me/onlineabedini" }],
    ],
  },
};

module.exports = {
  MAIN_BUTTONS_TEXT,
  AdminsStartBtns,
  AdvisersStartBtns,
  StudentsStartBtns,
  manageAdminsBtns,
  manageAdvisersBtns,
  answerBtn,
  confidenceBtn,
  cancelAdviserAnswerBtn,
  cancelBtn,
  backBtn,
  plansBtn,
  contactWithAdminBtn,
  addAdminCancelBtn,
  removeAdminCancelBtn,
  addAdviserCancelBtn,
  removeAdviserCancelBtn,
};
