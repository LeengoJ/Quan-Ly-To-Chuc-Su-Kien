// Import the mongoose module
const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

var EventDetails = new mongoose.Schema({
  idEvent: String,
  typeOfEvent_AN: {
    //kieu am nhac
    ageUser: {
      type: Number,
      enum: [0, 14, 16, 18],
    },
    purpose: {
      type: String,
      maxlength: 200,
      enum: ["Quyên góp từ thiện", "Sân chơi giải trí", "Debut", "bán vé"],
    },
  },
  typeOfEvent_HN: {
    purpose: {
      type: String,
      maxlength: 200,
      enum: [
        "Chia sẻ kiến ​​thức",
        "Kết nối giao lưu học hỏi",
        "Phát triển chuyên môn",
        "Tiếp thị và quảng cáo",
        "Xây dựng cộng đồng",
      ],
    },
  },
  typeOfEvent_HTKH: {
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
    },
  },
  listGuestStars: {
    numberOfCustomer: {
      type: Number,
      enum: [100, 300, 500, 1000],
    },
  },
  timeStart: {
    type: String,
    default: Date.now(),
  },
  timeDone: {
    type: String,
    default: Date.now(),
  },
  Status: {
    type: String,
    enum: ["Công ty", "Cá nhân", "Tổ chức nhà nước"],
  },
  scope: {
    type: String,
    enum: ["public", "private"],
  },
  timeLine: String,
  Location: String,
  time: Number,
  Theme: String,
  Concept: String,
  Details: {
    Gift: String,
    invitationCart: String,
    thanksCard: String,
    food: String,
    drink: String,
    Recreational: String,
  },
  script: {
    host: String, // id he person who receives guests in the conference
    eventPlanner: String, // id the person who arranges the seats in the conference,
    MC: String,
    issue: String,
  },
  Budget: Number,
});

// Export model
module.exports = mongoose.model("EventDetails", EventDetails);
