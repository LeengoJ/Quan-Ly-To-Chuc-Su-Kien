// Import the mongoose module
const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const CustomerInEvent_AN = require("CustomerInEvent_AN");

var TypeOfEvent_AN = new mongoose.Schema({
  listGuestStars: {
    type: CustomerInEvent_AN,
    numberOfCustomer: {
      type: Number,
      enum: [100, 300, 500, 1000],
      default: 100,
    },
  },
  ageUser: {
    type: Number,
    min: {
      type: Number,
      enum: [0, 14, 16, 18],
      default: 0,
    },
  },
  purpose: {
    type: String,
    maxlength: 200,
    enum: ["Quyên góp từ thiện", "Sân chơi giải trí", "Debut", "bán vé"],
    default: "bán vé",
  },
});

// Export model
module.exports = mongoose.model("TypeOfEvent_AN", TypeOfEvent_AN);
