const configs = require("../configs/configs");
const TypeOfEvent_HN = require("../schemas/TypeOfEvent_HN");

module.exports = {
  GetAllItem: async () => {
    return await TypeOfEvent_HN.find({}).exec();
  },
  GetItemById: async (id) => {
    return await TypeOfEvent_HN.findById(id).exec();
  },
  AddAnItem: async (item) => {
    return new TypeOfEvent_HN(item).save();
  },
  editAnItem: async (params) => {
    // params.id params.update
    return await TypeOfEvent_HN.findByIdAndUpdate(params.id, params.update, {
      new: true,
    });
  },
  deleteAnItem: async (id) => {
    return await TypeOfEvent_HN.findByIdAndDelete(id);
  },
};
