const configs = require("../configs/configs");
const Account = require("../schemas/Account");
const RollUser = require("../schemas/RoleUser");

module.exports = {
  GetAllItem: async () => {
    return await RollUser.find({}).exec();
  },
  GetItemById: async (id) => {
    return await RollUser.findById(id).exec();
  },
  AddAnItem: async (item) => {
    return new RollUser(item).save();
  },
  editAnItem: async (params) => {
    // params.id params.update
    return await RollUser.findByIdAndUpdate(params.id, params.update, {
      new: true,
    });
  },
  deleteAnItem: async (id) => {
    return await RollUser.findByIdAndDelete(id);
  },
  GetItemByIdUser: async (idAccount) => {
    return await RollUser.find({
      idAccount: idAccount,
    }).exec();
  },
};
