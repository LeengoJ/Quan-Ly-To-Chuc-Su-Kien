// Import the mongoose module
const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

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

// Export model
module.exports = mongoose.model("Event", Event);
