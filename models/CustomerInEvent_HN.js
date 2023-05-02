const configs = require("../configs/configs");
const CustomerInEvent_HN = require("../schemas/CustomerIn_HN");

module.exports = {
  GetAllItem: async () => {
    return await CustomerInEvent_HN.find({}).exec();
  },
  GetItemById: async (id) => {
    return await CustomerInEvent_HN.findById(id).exec();
  },
  AddAnItem: async (item) => {
    return new CustomerInEvent_HN(item).save();
  },
  editAnItem: async (params) => {
    // params.id params.update
    return await CustomerInEvent_HN.findByIdAndUpdate(
      params.id,
      params.update,
      {
        new: true,
      }
    );
  },
  deleteAnItem: async (id) => {
    return await CustomerInEvent_HN.findByIdAndDelete(id);
  },
};
