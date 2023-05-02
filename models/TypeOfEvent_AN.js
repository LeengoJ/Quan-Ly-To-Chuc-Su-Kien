const configs = require("../configs/configs");
const TypeOfEvent_AN = require("../schemas/TypeOfEvent_AN");

module.exports = {
  GetAllItem: async () => {
    return await TypeOfEvent_AN.find({}).exec();
  },
  GetItemById: async (id) => {
    return await TypeOfEvent_AN.findById(id).exec();
  },
  AddAnItem: async (item) => {
    return new TypeOfEvent_AN(item).save();
  },
  editAnItem: async (params) => {
    // params.id params.update
    return await TypeOfEvent_AN.findByIdAndUpdate(params.id, params.update, {
      new: true,
    });
  },
  deleteAnItem: async (id) => {
    return await TypeOfEvent_AN.findByIdAndDelete(id);
  },
};
