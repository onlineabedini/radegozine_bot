module.exports.STARTMESSAGEFORADMIN = "سلام مدیر گرامی به ربات رد گزینه خوش آمدید"
module.exports.STARTMESSAGEFORADVISER = "سلام مشاور گرامی به ربات رد گزنیه خوش آمدید"
module.exports.STARTMESSAGEFORSTUDENT = "سلام دانش آموز گرامی به ربات رد گزینه خوش آمدید"
module.exports.ENTERADMINUSERNAME = " لطفا یوزر نیم مدیر جدید را وارد نمایید : "
module.exports.ENTERADVISERUSERNAME = " لطفا یوزر نیم مشاور جدید را وارد نمایید : "
module.exports.ADMINSLIST = "لیست مدیران"
module.exports.ADVISERSLIST = "لیست مشاوران"
module.exports.ADVISERSQUESTIONSLIST = "لیست سوالات مشاوران"
module.exports.STUDENTSQUESTIONSLIST = "لیست سوالات دانش آموزان"
module.exports.ENTERMESSAGE = "لطفا پیام خود را وارد نمایید : "
module.exports.ENTERFULLNAME = "لطفا نام و نام خانوادگی خود را وارد نمایید : "
module.exports.ENTERFIELD = "لطفا رشته ی تحصیلی خود را وارد نمایید : "
module.exports.ENTERGRADE = "لطفا پایه ی تحصیلی خود را وارد نمایید : "
module.exports.ENTERQUESTION = "لطفا سوال خود را وارد نمایید : "
module.exports.ENTERADMINFULLNAME = "لطفا نام و نام خانوادگی مدیر جدید را وارد نمایید : "
module.exports.ENTERADVISERFULLNAME = "لطفا نام و نام خانوادگی مشاور جدید را وارد نمایید : "
module.exports.ENTERANSWER = "لطفا پاسخ خود را بصورت ویس وارد نمایید : "
module.exports.ADMINCONFIRMMESSAGE = "مدیر جدید با موفقیت ثبت گردید."
module.exports.ADVISERCONFIRMMESSAGE = "مشاور جدید با موفقیت ثبت گردید."
module.exports.DUPLICATEADMIN = "این ادمین قبلا ثبت شده است."
module.exports.DUPLICATEADVISER = "این ادمین قبلا ثبت شده است."
module.exports.SENDMESSAGEFORADVISERSWASSUCCESSFUL = "پیام شما برای مشاوران با موفقیت ارسال شد."
module.exports.SENDMESSAGEFORSTUDENTSWASSUCCESSFUL = "پیام شما برای دانش آموزان با موفقیت ارسال شد."
module.exports.SENDMESSAGEWASSUCCESSFUL = "پیام شما با موفقیت ارسال شد."
module.exports.QUESTIONREGISTERED = "سوال شما ثبت گردید و دراسرع وقت توسط مشاوران پاسخ داده خواهد شد."
module.exports.TIP = "دانش آموز گرامی جهت پرسش از مشاورین باید مشخصات خواسته شده را وارد نمایید"

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
module.exports.studentInfoMessage = (Student) =>`
*سوال :${Student.MessageText}*
👨‍🎓مشخصات دانش آموز :
🔹نام و نام خانوادگی :${Student.Fullname}
🔹رشته ی تحصیلی :${Student.Field}
🔹پایه ی تحصیلی :${Student.Grade}
🔹یوزنیم دانش آموز :@${Student.Username}
@radegozine`
