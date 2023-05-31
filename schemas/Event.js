const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

var Event = new mongoose.Schema({
  nameEvent: String,
  idUserAdmin: String,
});
// Export model
module.exports = mongoose.model("UserInEvent", UserInEvent);
