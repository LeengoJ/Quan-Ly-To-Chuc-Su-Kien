// Import the mongoose module
const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

var CustomerInEvent_HN = new mongoose.Schema({
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
});

// Export model
module.exports = mongoose.model("CustomerInEvent_HN", CustomerInEvent_HN);
