// Import the mongoose module
const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

var TypeOfEvent_AN = new mongoose.Schema({
  listGuestStars: {
    CustomerInEvent_AN: {
      name: String,
      phone: String,
      email: String,
      obj: {
        type: String,
        enum: ["Sinh Viên", "Người đã đi làm", "Khách mời"],
        default: "Sinh Viên",
      },
    },
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
