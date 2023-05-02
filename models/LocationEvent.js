const configs = require("../configs/configs");
const LocationEvent = require("../schemas/LocationEvent");

module.exports = {
  GetAllItem: async () => {
    return await LocationEvent.find({}).exec();
  },
  GetItemById: async (id) => {
    return await LocationEvent.findById(id).exec();
  },
  AddAnItem: async (item) => {
    return new LocationEvent(item).save();
  },
  editAnItem: async (params) => {
    // params.id params.update
    return await LocationEvent.findByIdAndUpdate(params.id, params.update, {
      new: true,
    });
  },
  deleteAnItem: async (id) => {
    return await LocationEvent.findByIdAndDelete(id);
  },
};
