const Roll = require("../schemas/Roll");

module.exports = {
  GetAllItem: async () => {
    return await Roll.find({}).exec();
  },
  GetItemById: async (id) => {
    return await Roll.findById(id).exec();
  },
  AddAnItem: async (item) => {
    console.log(item);
    let newItem = await new Roll(item).save();
    return newItem;
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
  GetItemByIdUser: async (idAccount) => {
    return await Roll.find({ idAccount: idAccount }).exec();
  },
};
