// Import the mongoose module
const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

var Event = new mongoose.Schema({
  typeOfEvent_AN: {
    listGuestStars: {
      CustomerInEvent_AN: {
        name: String,
        phone: String,
        email: String,
        obj: {
          type: String,
          enum: ["Sinh Viên", "Người đã đi làm", "Khách mời"],
        },
      },
      numberOfCustomer: {
        type: Number,
        enum: [100, 300, 500, 1000],
      },
    },
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
      },
    },
    numberOfCustomer: {
      type: Number,
      enum: [100, 300, 500, 1000],
    },
  },
  typeOfEvent_HTKH: {
    listGuestStars: {
      CustomerInEvent_KHKT: {
        name: String,
        phone: String,
        email: String,
        obj: {
          type: String,
          enum: ["Giáo Sư", "Tiến sĩ", "Sinh Viên", "Bên Truyền Thông"],
        },
      },
      numberOfCustomer: {
        type: Number,
        enum: [100, 300, 500, 1000],
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
  Location: {
    name: String,
    Location: String,
    capacity: Number,
    acreage: Number,
    rateService: { type: Number, min: 0, max: 5 },
    rateSecurity: { type: Number, min: 0, max: 5 },
    rateSound: { type: Number, min: 0, max: 5 },
  },
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
module.exports = mongoose.model("Event", Event);
