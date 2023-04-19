const configs = require("../configs/configs");
const Event = require("../schemas/Event");

module.exports = {
  GetAllItem: async () => {
    return await Event.find({}).exec();
  },
  GetItemById: async (id) => {
    return await Event.findById(id).exec();
  },
  AddAnItem: async (item) => {
    return new Event(item).save();
  },
};
