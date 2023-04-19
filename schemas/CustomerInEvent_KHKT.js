// Import the mongoose module
const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

var CustomerInEvent_KHKT = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  obj: {
    type: String,
    enum: ["Giáo Sư", "Tiến sĩ", "Sinh Viên", "Bên Truyền Thông"],
    default: "Đại Lý",
  },
});

// Export model
module.exports = mongoose.model("CustomerInEvent_KHKT", CustomerInEvent_KHKT);
