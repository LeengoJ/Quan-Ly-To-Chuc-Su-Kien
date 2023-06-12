const EventDetails = require("../schemas/EventDetail");

module.exports = {
  GetAllItem: async () => {
    return await EventDetails.find({}).exec();
  },
  GetItemById: async (id) => {
    return await EventDetails.findById(id).exec();
  },
  AddAnItem: async (item) => {
    console.log(item);
    return new EventDetails(item).save();
  },
  editAnItem: async (params) => {
    // params.id params.update
    return await EventDetails.findByIdAndUpdate(params.id, params.update, {
      new: true,
    });
  },
  deleteAnItem: async (id) => {
    return await EventDetails.findByIdAndDelete(id);
  },
};
