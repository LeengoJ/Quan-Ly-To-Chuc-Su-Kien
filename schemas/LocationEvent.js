// Import the mongoose module
const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

var LocationEvent = new mongoose.Schema({
  name: String,
  Location: String,
  capacity: Number,
  acreage: Number,
  rateService: { type: Number, min: 0, max: 5 },
  rateSecurity: { type: Number, min: 0, max: 5 },
  rateSound: { type: Number, min: 0, max: 5 },
});

// Export model
module.exports = mongoose.model("LocationEvent", LocationEvent);
