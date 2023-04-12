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

var CustomerInEvent_HN = new mongoose.Schema({
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
});
// Virtual for CustomerInEvent_HN's URL
CustomerInEvent_HN.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/CustomerInEvent_HN/${this._id}`;
});
// Export model
module.exports = mongoose.model("CustomerInEvent_HN", CustomerInEvent_HN);
