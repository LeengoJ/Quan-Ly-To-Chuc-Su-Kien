// Import the mongoose module
const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const CustomerInEvent_AN = require("CustomerInEvent_AN");

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

var TypeOfEvent_AN = new mongoose.Schema({
  listGuestStars: {
    type: CustomerInEvent_AN,
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
TypeOfEvent_AN.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/TypeOfEvent_AN/${this._id}`;
});
// Export model
module.exports = mongoose.model("TypeOfEvent_AN", TypeOfEvent_AN);
