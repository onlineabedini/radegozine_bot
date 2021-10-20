const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    ChatId: Number,
})
module.exports = mongoose.model("User", schema)