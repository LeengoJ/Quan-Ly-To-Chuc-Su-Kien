// Import the mongoose module
const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

var CustomerInEvent_AN = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  obj: {
    type: String,
    enum: ["Sinh Viên", "Người đã đi làm", "Khách mời"],
    default: "Sinh Viên",
  },
});

// Export model
module.exports = mongoose.model("CustomerInEvent_AN", CustomerInEvent_AN);
