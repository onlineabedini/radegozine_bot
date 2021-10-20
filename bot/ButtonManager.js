MAIN_BUTTONS_TEXT = {
    ADDADMIN: "افزودن مدیر",
    ADMINSLIST: "نمایش لیست مدیران",
    ADDADVISER: "اضافه کردن مشاور",
    ADVISERSLIST: "نمایش لیست مشاوران",
    SENDMESSAGEFORADMINS: "ارسال پیام برای مدیران",
    SENDMESSAGEFORADVISERS: "ارسال پیام برای مشاوران",
    SENDMESSAGEFORSTUDENTS: "ارسال پیام برای دانش آموزان",
    QUESTIONSLIST: "لیست سوالات مشاوران",
    QUESTIONSLISTFORADVISERS: "لیست سوالات دانش آموزان",
    ASKQUESTIONS: "سوال از مشاورین",
    PLANS: "طرح ها",
    CONTACTWITHADMIN: "ارتباط با مدیر",
    BOTDEVELOPER: "طراح بات"
}

const AdminsStartBtns = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [
                {text: MAIN_BUTTONS_TEXT.ADMINSLIST},
                {text: MAIN_BUTTONS_TEXT.ADDADMIN},
            ],
            [
                {text: MAIN_BUTTONS_TEXT.ADVISERSLIST},
                {text: MAIN_BUTTONS_TEXT.ADDADVISER},
            ],
            [
                {text: MAIN_BUTTONS_TEXT.SENDMESSAGEFORSTUDENTS},
                {text: MAIN_BUTTONS_TEXT.SENDMESSAGEFORADVISERS},
            ],
            [
                {text: MAIN_BUTTONS_TEXT.QUESTIONSLISTFORADVISERS},
                {text: MAIN_BUTTONS_TEXT.QUESTIONSLIST},
            ],
            [
                {text: MAIN_BUTTONS_TEXT.BOTDEVELOPER}
            ],
        ]
    }
}

const AdvisersStartBtns = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [
                {text: MAIN_BUTTONS_TEXT.SENDMESSAGEFORSTUDENTS},
                {text: MAIN_BUTTONS_TEXT.SENDMESSAGEFORADMINS},
            ],
            [
                {text: MAIN_BUTTONS_TEXT.BOTDEVELOPER},
                {text: MAIN_BUTTONS_TEXT.QUESTIONSLISTFORADVISERS},
            ],
        ]
    }
}

const StudentsStartBtns = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [
                {text: MAIN_BUTTONS_TEXT.PLANS},
                {text: MAIN_BUTTONS_TEXT.ASKQUESTIONS}

            ],
            [
                {text: MAIN_BUTTONS_TEXT.BOTDEVELOPER},
                {text: MAIN_BUTTONS_TEXT.CONTACTWITHADMIN},
            ],
        ]
    }
}

const answerBtn = {
    reply_markup: {
        resize_keyboard: true,
        inline_keyboard: [
            [{text: "پاسخ به سوال", callback_data: `ANSWER`}],
        ]
    },
}

module.exports = {
    MAIN_BUTTONS_TEXT,
    AdminsStartBtns,
    AdvisersStartBtns,
    StudentsStartBtns,
    answerBtn
}