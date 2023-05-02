const configs = require("../configs/configs");
const CustomerInEvent_AN = require("../schemas/CustomerIn_AN");

module.exports = {
  GetAllItem: async () => {
    return await CustomerInEvent_AN.find({}).exec();
  },
  GetItemById: async (id) => {
    return await CustomerInEvent_AN.findById(id).exec();
  },
  AddAnItem: async (item) => {
    return new CustomerInEvent_AN(item).save();
  },
  editAnItem: async (params) => {
    // params.id params.update
    return await CustomerInEvent_AN.findByIdAndUpdate(
      params.id,
      params.update,
      {
        new: true,
      }
    );
  },
  deleteAnItem: async (id) => {
    return await CustomerInEvent_AN.findByIdAndDelete(id);
  },
};
