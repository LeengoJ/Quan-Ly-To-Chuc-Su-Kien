const { default: mongoose } = require("mongoose");

let CustomerInEvent_Htkh = new mongoose.Schema({
  idEvent: String,
  name: String,
  phone: String,
  email: String,
  obj: {
    type: String,
    enum: ["Giáo Sư", "Tiến sĩ", "Sinh Viên", "Bên Truyền Thông"],
  },
});
module.exports = mongoose.model("CustomerInEvent_Htkh", CustomerInEvent_Htkh);
