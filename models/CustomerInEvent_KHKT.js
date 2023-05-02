const configs = require("../configs/configs");
const CustomerInEvent_KHKT = require("../schemas/CustomerIn_KHKT");

module.exports = {
  GetAllItem: async () => {
    return await CustomerInEvent_KHKT.find({}).exec();
  },
  GetItemById: async (id) => {
    return await CustomerInEvent_KHKT.findById(id).exec();
  },
  AddAnItem: async (item) => {
    return new CustomerInEvent_KHKT(item).save();
  },
  editAnItem: async (params) => {
    // params.id params.update
    return await CustomerInEvent_KHKT.findByIdAndUpdate(
      params.id,
      params.update,
      {
        new: true,
      }
    );
  },
  deleteAnItem: async (id) => {
    return await CustomerInEvent_KHKT.findByIdAndDelete(id);
  },
};
