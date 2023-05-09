// Import the mongoose module
const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

var TypeOfEvent_HTKH = new mongoose.Schema({
  listGuestStars: {
    CustomerInEvent_KHKT: {
      name: String,
      phone: String,
      email: String,
      obj: {
        type: String,
        enum: ["Giáo Sư", "Tiến sĩ", "Sinh Viên", "Bên Truyền Thông"],
        default: "Đại Lý",
      },
    },
    numberOfCustomer: {
      type: Number,
      enum: [100, 300, 500, 1000],
      default: 100,
    },
  },
  purpose: {
    type: String,
    maxlength: 200,
    enum: [
      "cung cấp kiến thức",
      "tạo cơ hội để mỗi cá nhân được trao đổi",
      " thảo luận và tiếp nhận kiến thức",
      "bán vé",
      "marketing thương hiệu",
    ],
    default: "cung cấp kiến thức",
  },
});

// Export model
module.exports = mongoose.model("TypeOfEvent_HTKH", TypeOfEvent_HTKH);
