const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    ChatId : Number,
    Username : String,
    Fullname : String,
    MessageId : Number,
})
module.exports = mongoose.model("Adviser", schema)