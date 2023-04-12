// Import the mongoose module
const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const CustomerInEvent_KHKT = require("CustomerInEvent_KHKT");

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
// Virtual for TypeOfEvent_HTKH's URL
TypeOfEvent_HTKH.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/TypeOfEvent_HTKH/${this._id}`;
});
// Export model
module.exports = mongoose.model("TypeOfEvent_HTKH", TypeOfEvent_HTKH);
