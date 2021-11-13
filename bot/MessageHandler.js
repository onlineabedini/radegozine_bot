module.exports.STARTMESSAGEFORADMIN = `
🌺 سلام مدیر گرامی به ربات رد گزینه خوش آمدید 🌺
🔹 برای بهره مندی از خدمات این بات لطفا از منوی زیر یک گزینه را به دلخواه
        انتخاب نمایید:
 @radegozine_bot
 `
module.exports.STARTMESSAGEFORADVISER = `
🌺 سلام مشاور گرامی به ربات رد گزینه خوش آمدید 🌺
🔹 برای بهره مندی از خدمات این بات لطفا از منوی زیر یک گزینه را به دلخواه
        انتخاب نمایید:
 @radegozine_bot
 `
module.exports.STARTMESSAGEFORSTUDENT = `
🌺 سلام دانش آموز گرامی به ربات رد گزینه خوش آمدید 🌺
🔹 برای بهره مندی از خدمات این بات لطفا از منوی زیر یک گزینه را به دلخواه
        انتخاب نمایید:
 @radegozine_bot
 `
module.exports.adminInfoMessage = (admin) => `
🔹یوزرنیم : @${admin.Username}
🔸نام و نام خانوادگی مدیر : ${admin.Fullname}

                〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️
    
`
module.exports.adviserInfoMessage = (adviser) => `
🔹یوزرنیم : @${adviser.Username}
🔸نام و نام خانوادگی مشاور : ${adviser.Fullname}

                〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️

`
module.exports.studentInfoMessage = (Student) => `
❓سوال :${Student.MessageText}❓

👨‍🎓مشخصات دانش آموز :

🔹نام و نام خانوادگی : ${Student.Fullname}

🔹رشته ی تحصیلی : ${Student.Field}

🔹پایه ی تحصیلی : ${Student.Grade}

🔹یوزنیم دانش آموز : @${Student.Username}

@radegozine_bot`

module.exports.voiceCaption = (QuestionText) => `
🟢 سوالات مشاوره ای
⁉️ ${QuestionText}


🟢 ردگزینه
🔵 مشاور - پشتیبانی - تدریس موفقیت کنکور
❤️ برای مشاوره ( ۱۰۰٪  رایگان ) به ما پیام بدید 


🌹👇 سوال خود را از طریق ربات بپرسید
✅ @radegozine_bot

        @radegozine
╰┄┅◇◇◇◇◇┅┄╯
`

module.exports.ENTERADMINUSERNAME = ` 🔹 لطفا یوزر نیم مدیر جدید را به فرم 'nemoone@' وارد نمایید : 
🔸 توجه : در صورت اشتباه وارد نمودن یوزر نیم ، مدیر جدید قادر به بهره مندی از خدمات بات نخواهد بود. `

module.exports.ENTERADVISERUSERNAME = ` 🔹 لطفا یوزر نیم مشاور جدید را به فرم 'nemoone@' وارد نمایید : 
🔸 توجه : در صورت اشتباه وارد نمودن یوزر نیم ، مشاور جدید قادر به بهره مندی از خدمات بات نخواهد بود. `

module.exports.REMOVEADMIN = "🔹 لطفا یوزر نیم مدیری که قصد حذف آنرا دارید به فرم 'nemoone@' وارد نمایید : "
module.exports.REMOVEADVISER = "🔹 لطفا یوزر نیم مشاوری که قصد حذف آنرا دارید به فرم 'nemoone@' وارد نمایید : "
module.exports.ENTERADMINFULLNAME = "لطفا نام و نام خانوادگی مدیر جدید را وارد نمایید : "
module.exports.ENTERADVISERFULLNAME = "لطفا نام و نام خانوادگی مشاور جدید را وارد نمایید : "
module.exports.ADMINCONFIRMMESSAGE = "✅ مدیر جدید با موفقیت ثبت گردید"
module.exports.ADVISERCONFIRMMESSAGE = "✅ مشاور جدید با موفقیت ثبت گردید"
module.exports.ADMINREMOVED = "✅ ادمین با موفقیت حذف شد"
module.exports.ADVISERREMOVED = "✅ مشاور با موفقیت حذف شد"
module.exports.DUPLICATEADMIN = "این مدیر قبلا ثبت شده است❗️ "
module.exports.DUPLICATEADVISER = "این مشاور قبلا ثبت شده است❗️ "
module.exports.ADMINNOTADD = "مدیری افزوده نشده است❗️"
module.exports.NOADVISERADDED = "مشاوری افزوده نشده است❗️"
module.exports.ADMINNOTFOUND = "مدیری یافت نشد❗️"
module.exports.ADVISERNOTFOUND = "مشاوری یافت نشد❗️"
module.exports.STUDENTNOTFOUND = "دانش آموزی یافت نشد❗️"
module.exports.ADMINSLIST = "🔻 لیست مدیران 🔻"
module.exports.ADVISERSLIST = "🔻 لیست مشاوران 🔻"
module.exports.ADVISERSQUESTIONSLIST = "🔻 لیست پیام های مشاوران 🔻"
module.exports.STUDENTSQUESTIONSLIST = "🔻 لیست سوالات دانش آموزان 🔻"
module.exports.TIP = "دانش آموز گرامی جهت پرسش از مشاورین باید مشخصات خواسته شده را وارد نمایید❗️"
module.exports.ENTERMESSAGE = "لطفا پیام خود را وارد نمایید : "
module.exports.ENTERFULLNAME = "لطفا نام و نام خانوادگی خود را وارد نمایید : "
module.exports.ENTERFIELD = "لطفا رشته ی تحصیلی خود را وارد نمایید : "
module.exports.ENTERGRADE = "لطفا پایه ی تحصیلی خود را وارد نمایید : "
module.exports.ENTERQUESTION = "لطفا سوال خود را را بصورت متنی وارد نمایید : "
module.exports.ENTERANSWER = "لطفا پاسخ خود را بصورت ویس وارد نمایید : "
module.exports.ENTERTEXTONLY = "لطفااطلاعات خواسته شده را فقط به صورت متنی وارد نمایید❗️"
module.exports.TEXTMESSAGEONLY = "لطفا پیام خود را فقط به صورت متنی وارد نمایید❗️"
module.exports.VOICEMESSAGEONLY = "لطفا پیام خود را فقط به صورت ویس وارد نمایید❗️"
module.exports.SENDMESSAGEFORADVISERSWASSUCCESSFUL = "✅ پیام شما برای مشاوران با موفقیت ارسال شد."
module.exports.SENDMESSAGEFORSTUDENTSWASSUCCESSFUL = "✅ پیام شما برای دانش آموزان با موفقیت ارسال شد."
module.exports.SENDMESSAGEWASSUCCESSFUL = "✅ پیام شما با موفقیت ارسال شد."
module.exports.DELETEMESSAGEWASSUCCESSFUL = "✅ پیام شما با موفقیت حذف شد."
module.exports.DELETEMESSAGEREQUESTCANCELED = "✅ درخواست حذف پیام لغو شد."
module.exports.DELETEMESSAGECONFIDENCE = "آیا از حذف این پیام اطمینان دارید؟"
module.exports.SOMETHINGWENTWORNG = "خطایی پیش آمده است لطفا مجددا امتحان نمایید❗️"
module.exports.QUESTIONREGISTERED = "✅ سوال شما ثبت گردید و دراسرع وقت توسط مشاوران پاسخ داده خواهد شد."
module.exports.ANSWERREGISTERED = "✅ پاسخ شما ثبت شد و در کانال رد گزینه قرار گرفت."
module.exports.THISMESSAGEHASBEENDELETED = "این پیام قبلا حذف شده است❗️"
module.exports.DELETETIP = "اگر در حال حاظر این سوال حذف نشده است مجددا بر روی دکمه ی 'حذف سوال' کلیک نمایید."
module.exports.YOURQUESTIONHASBEENANSWERED = "✅ سوال شما پاسخ داده شد و در کانال رد گزینه قرار گرفت."
module.exports.SELECTANITEM = "لطفا از لیست زیر یک مورد را انتخاب نمایید ⬇️"
module.exports.SEEPLANS = "برای دیدن طرح ها بر روی دکمه ی زیر کلیک کنید ⬇️"
module.exports.CONTACTWITHADMIN = "برای ارتباط با مدیر بر روی کلید زیر کلیک کنید ⬇️"
module.exports.REQUESTCANCELED = "❎ درخواست شما لغو شد ❎"
module.exports.EMPTYLIST = "لیست خالی است❗️"
module.exports.ADVISERSAUTHENTICATION = "شما از لیست مشاوران حذف شده اید ❗️ لطفا مجددا از مدیر بخواهید تا شما را به لیست مشاوران اضافه نماید و سپس مجددا بات رااستارت نمایید."
module.exports.INVALIDUSERNAME = "فرم یوزرنیم وارد شده نامعتبر است ❗️ لطفا مطابق الگوی ذکر شده یوزرنیم خود را وارد نمایید."
module.exports.BOTDEVELOPERSCAPTION = `🌹✅  تیم توسعه دهندگان آی آر نود
طراحی بات ( اختصاصی - خصوصی )

🟢 طراحی انواع وبسایت، وب اپلیکیشن و  بات تلگرام + خدمات سئو  + مارکتینگ و برندسازی اختصاصی
 
🔻شخصی
🔻 شرکتی
🔻 فروشگاهی
🔻 آموزشی
🔻 فیلم و سرگرمی 
🔻 خدماتی
🔻 خبری و مقاله
🔻 وبلاگ 

▫️ ir - node
 (https://t.me/ir_node)🔸 irnode.com
🔹 @onlineabedini  👈  ارتباط با ما ~~`