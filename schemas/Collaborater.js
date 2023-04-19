// Import the mongoose module
const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

var Collaborater = new mongoose.Schema({
  NameCB: String,
  fields: String,
  email: String,
  phoneNumber: String,
});
// Export model
module.exports = mongoose.model("Collaborater", Collaborater);
