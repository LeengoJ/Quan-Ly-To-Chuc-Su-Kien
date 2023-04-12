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
//Tạo bảng tài khoản người dùng

var Account = new mongoose.Schema({
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
Account.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/author/${this._id}`;
});

// Export model
module.exports = mongoose.model("Account", Account);
