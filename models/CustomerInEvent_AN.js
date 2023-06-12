const CustomerOfAn = require("../schemas/CustomerOfAn");

module.exports = {
  GetAllItem: async () => {
    return await CustomerOfAn.find({}).exec();
  },
  GetItemById: async (id) => {
    return await CustomerOfAn.findById(id).exec();
  },
  AddAnItem: async (item) => {
    console.log(item);
    let newItem = await new CustomerOfAn(item).save();
    return newItem;
  },
  editAnItem: async (params) => {
    // params.id params.update
    return await CustomerOfAn.findByIdAndUpdate(params.id, params.update, {
      new: true,
    });
  },
  deleteAnItem: async (id) => {
    return await CustomerOfAn.findByIdAndDelete(id);
  },
};
