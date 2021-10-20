module.exports.adminInfoMessage = (admin) => `
یوزرنیم : ${admin.Username}
نام و نام خانوادگی مدیر : ${admin.Fullname}
`
module.exports.adviserInfoMessage = (adviser) => `
یوزرنیم : ${adviser.Username}
نام و نام خانوادگی مشاور : ${adviser.Fullname}
`
module.exports.studentInfoMessage = (Student) =>`
*سوال :${Student.MessageText}*
👨‍🎓مشخصات دانش آموز :
🔹نام و نام خانوادگی :${Student.Fullname}
🔹رشته ی تحصیلی :${Student.Field}
🔹پایه ی تحصیلی :${Student.Grade}
🔹یوزنیم دانش آموز :@${Student.Username}
@radegozine`
