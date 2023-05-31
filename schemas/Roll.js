const mongoose = require("mongoose");

var Roll = new mongoose.Schema({
  Roll: String,
});

module.exports = mongoose.model("Roll", Roll);
