const configs = require("../configs/configs");
const Roll = require("../schemas/Roll");

module.exports = {
  GetAllItem: async () => {
    return await Roll.find({}).exec();
  },
  GetItemById: async (id) => {
    return await Roll.findById(id).exec();
  },
  AddAnItem: async (item) => {
    return new Roll(item).save();
  },
  editAnItem: async (params) => {
    // params.id params.update
    return await Roll.findByIdAndUpdate(params.id, params.update, {
      new: true,
    });
  },
  deleteAnItem: async (id) => {
    return await Roll.findByIdAndDelete(id);
  },
};
