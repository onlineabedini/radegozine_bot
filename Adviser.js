const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    ChatId : Number,
    Username : String,
    Fullname : String,
    MessageId : [],
})
module.exports = mongoose.model("Adviser", schema)