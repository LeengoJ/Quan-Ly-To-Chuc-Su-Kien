// Import the mongoose module
const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

var UserInEvent = new mongoose.Schema({
  idUser: String,
  idEvent: String,
  role: String,
});
// Export model
module.exports = mongoose.model("UserInEvent", UserInEvent);
