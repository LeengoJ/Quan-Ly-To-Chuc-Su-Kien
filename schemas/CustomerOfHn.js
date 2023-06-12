const { default: mongoose } = require("mongoose");

let CustomerInEvent_HN = new mongoose.Schema({
  idEvent: String,
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
  },
});
module.exports = mongoose.model("CustomerInEvent_HN", CustomerInEvent_HN);
