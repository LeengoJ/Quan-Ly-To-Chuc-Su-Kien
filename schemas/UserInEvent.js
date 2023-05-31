// Import the mongoose module
const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

var UserInEvent = new mongoose.Schema({
  nameEvent: String,
  idUser: String,
  idEvent: String,
  rool: String,
});
// Export model
module.exports = mongoose.model("UserInEvent", UserInEvent);
