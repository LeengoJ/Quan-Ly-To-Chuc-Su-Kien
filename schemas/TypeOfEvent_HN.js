// Import the mongoose module
const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const CustomerInEvent = require("CustomerInEvent");

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

var TypeOfEvent_HN = new mongoose.Schema({
  listGuestStars: {
    type: CustomerInEvent,
    numberOfCustomer: {
      type: Number,
      enum: [100, 300, 500, 1000],
      default: 100,
    },
  },
});
// Virtual for TypeOfEvent_HN's URL
TypeOfEvent_HN.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/TypeOfEvent_HN/${this._id}`;
});
// Export model
module.exports = mongoose.model("TypeOfEvent_HN", TypeOfEvent_HN);
