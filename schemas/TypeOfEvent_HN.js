// Import the mongoose module
const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const CustomerInEvent = require("CustomerInEvent");

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

// Export model
module.exports = mongoose.model("TypeOfEvent_HN", TypeOfEvent_HN);
