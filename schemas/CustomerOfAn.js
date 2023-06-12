const { default: mongoose } = require("mongoose");

let CustomerInEvent_AN = new mongoose.Schema({
  idEvent: String,
  name: String,
  phone: String,
  email: String,
  obj: {
    type: String,
    enum: ["Sinh Viên", "Người đã đi làm", "Khách mời"],
  },
});
module.exports = mongoose.model("CustomerInEvent_AN", CustomerInEvent_AN);
