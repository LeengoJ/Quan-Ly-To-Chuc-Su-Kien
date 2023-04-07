// Import the mongoose module
const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

// Set `strictQuery: false` to globally opt into filtering by properties that aren't in the schema
// Included because it removes preparatory warnings for Mongoose 7.
// See: https://mongoosejs.com/docs/migrating_to_6.html#strictquery-is-removed-and-replaced-by-strict
mongoose.set("strictQuery", false);

// Define the database URL to connect to.
const mongoDB = "mongodb://127.0.0.1:27017/QLTCSK";

// Wait for database to connect, logging an error if there is a problem
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB, { useNewUrlParser: true });
}
function checkEmail(email) {
  if (email.include("@") && email.include(".com")) return true;
  return false;
}

const Schema = mongoose.Schema;

//Tạo bảng tài khoản người dùng

var schemaAccount = new Schema({
  userName: { type: String, required: true, maxlength: 100 },
  passWord: { type: String, required: true, minlength: 8, maxlength: 1024 },
  name: String,
  ageUser: { type: Number, min: 18 },
  phone: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  address: Date,
});
// Virtual for account's URL
schemaAccount.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/author/${this._id}`;
});

// Export model
module.exports = mongoose.model("Account", schemaAccount);

//Địa điểm tổ chức sự kiện
var schemaLocationEvent = new Schema({
  name: String,
  Location: String,
  capacity: Number,
  acreage: Number,
  rateService: { type: Number, min: 0, max: 5 },
  rateSecurity: { type: Number, min: 0, max: 5 },
  rateSound: { type: Number, min: 0, max: 5 },
});
// Virtual for LocationEvent's URL
schemaTypeOfEvent_HTKH.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/LocationEvent/${this._id}`;
});
// Export model
module.exports = mongoose.model("LocationEvent", schemaLocationEvent);

//Tạo bảng Event

var schemaEvent = new Schema({
  typeOfEvent: {
    type: String,
    enum: ["Hội nghị", "Đám cưới", "Đêm ca nhạc"],
  },
  timeStart: {
    type: Date,
    default: Date.now,
  },
  timeDone: {
    type: Date,
    default: Date.now,
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
  Location: schemaLocationEvent,
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
    host: schemaAccount, //he person who receives guests in the conference
    eventPlanner: schemaAccount, //the person who arranges the seats in the conference,
    MC: schemaAccount,
    issue: String,
  },
  Budget: Number,
});
// Virtual for Event's URL
schemaEvent.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/Event/${this._id}`;
});
// Export model
module.exports = mongoose.model("Event", schemaEvent);
//Customer
var schemaCustomerInEvent_HN = {
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
};
// Virtual for CustomerInEvent_HN's URL
schemaCustomerInEvent_HN.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/CustomerInEvent_HN/${this._id}`;
});
// Export model
module.exports = mongoose.model("CustomerInEvent_HN", schemaCustomerInEvent_HN);
//Type of Event

var schemaTypeOfEvent_HN = new Schema({
  listGuestStars: {
    type: schemaCustomerInEvent,
    numberOfCustomer: {
      type: Number,
      enum: [100, 300, 500, 1000],
      default: 100,
    },
  },
});
// Virtual for TypeOfEvent_HN's URL
schemaTypeOfEvent_HN.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/TypeOfEvent_HN/${this._id}`;
});
// Export model
module.exports = mongoose.model("TypeOfEvent_HN", schemaTypeOfEvent_HN);

var schemaCustomerInEvent_KHKT = {
  name: String,
  phone: String,
  email: String,
  obj: {
    type: String,
    enum: ["Giáo Sư", "Tiến sĩ", "Sinh Viên", "Bên Truyền Thông"],
    default: "Đại Lý",
  },
};
// Virtual for CustomerInEvent_HN's URL
schemaCustomerInEvent_HN.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/CustomerInEvent_HN/${this._id}`;
});
// Export model

//schemaTypeOfEvent_HTKH
module.exports = mongoose.model("CustomerInEvent_HN", schemaCustomerInEvent_HN);
var schemaTypeOfEvent_HTKH = new Schema({
  listGuestStars: {
    type: schemaCustomerInEvent_KHKT,
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
// Virtual for TypeOfEvent_HTKH's URL
schemaTypeOfEvent_HTKH.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/TypeOfEvent_HTKH/${this._id}`;
});
// Export model
module.exports = mongoose.model("TypeOfEvent_HTKH", schemaTypeOfEvent_HTKH);

var schemaCustomerInEvent_AN = {
  name: String,
  phone: String,
  email: String,
  obj: {
    type: String,
    enum: ["Sinh Viên", "Người đã đi làm", "Khách mời"],
    default: "Sinh Viên",
  },
};
// Virtual for CustomerInEvent_AN's URL
schemaCustomerInEvent_AN.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/CustomerInEvent_AN/${this._id}`;
});
// Export model
var schemaTypeOfEvent_AN = new Schema({
  listGuestStars: {
    type: schemaCustomerInEvent_AN,
    numberOfCustomer: {
      type: Number,
      enum: [100, 300, 500, 1000],
      default: 100,
    },
  },
  ageUser: {
    type: Number,
    min: {
      type: Number,
      enum: [0, 14, 16, 18],
      default: 0,
    },
  },
  purpose: {
    type: String,
    maxlength: 200,
    enum: ["Quyên góp từ thiện", "Sân chơi giải trí", "Debut", "bán vé"],
    default: "bán vé",
  },
});
// Virtual for TypeOfEvent_AN's URL
schemaTypeOfEvent_AN.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/TypeOfEvent_AN/${this._id}`;
});
// Export model
module.exports = mongoose.model("TypeOfEvent_AN", schemaTypeOfEvent_AN);
