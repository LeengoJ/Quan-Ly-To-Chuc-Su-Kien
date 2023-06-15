const mongoose = require("mongoose");

var Roll = new mongoose.Schema({
  Roll: {
    type: String,
    enum: ["admin", "user", "Collaborater"],
  },
});

module.exports = mongoose.model("Roll", Roll);
