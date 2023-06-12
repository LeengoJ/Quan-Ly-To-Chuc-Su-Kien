const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

var RollUser = new mongoose.Schema({
  idRoll: String,
  idAccount: String,
});

module.exports = mongoose.model("RollUser", RollUser);
