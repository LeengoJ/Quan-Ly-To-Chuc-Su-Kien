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

var Event = new mongoose.Schema({
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
  Location: LocationEvent,
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
    host: Account, //he person who receives guests in the conference
    eventPlanner: Account, //the person who arranges the seats in the conference,
    MC: Account,
    issue: String,
  },
  Budget: Number,
});
// Virtual for Event's URL
Event.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/Event/${this._id}`;
});
// Export model
module.exports = mongoose.model("Event", Event);
