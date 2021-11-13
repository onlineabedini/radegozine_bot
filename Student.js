const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  ChatId: Number,
  Username: String,
  Fullname: String,
  Field: String,
  Grade: String,
  MessageId: Number,
  MessageText: String,
});
module.exports = mongoose.model("Student", schema);
