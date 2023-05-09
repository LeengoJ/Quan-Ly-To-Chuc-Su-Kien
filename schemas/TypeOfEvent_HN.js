// Import the mongoose module
const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

var TypeOfEvent_HN = new mongoose.Schema({
  listGuestStars: {
    CustomerInEvent: {
      name: String,
      phone: String,
      email: String,
      obj: {
        type: String,
        enum: [
          "Đại Lý",
          "Cơ Quan Nhà Nước",
          "Nhà Phân Phối",
          "Đối tác",
          "Bên Truyền Thông",
        ],
        default: "Đại Lý",
      },
    },
    numberOfCustomer: {
      type: Number,
      enum: [100, 300, 500, 1000],
      default: 100,
    },
  },
});

// Export model
module.exports = mongoose.model("TypeOfEvent_HN", TypeOfEvent_HN);
