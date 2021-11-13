const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  Username: String,
  Fullname: String,
});
module.exports = mongoose.model("Admin", schema);
