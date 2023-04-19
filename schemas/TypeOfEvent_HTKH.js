// Import the mongoose module
const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const CustomerInEvent_KHKT = require("CustomerInEvent_KHKT");

var TypeOfEvent_HTKH = new mongoose.Schema({
  listGuestStars: {
    type: CustomerInEvent_KHKT,
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
