const configs = require("../configs/configs");
const UserInEvent = require("../schemas/UserInEvent");

module.exports = {
  GetAllItem: async () => {
    return await UserInEvent.find({}).exec();
  },
  GetItemById: async (id) => {
    return await UserInEvent.findById(id).exec();
  },
  AddAnItem: async (item) => {
    return new UserInEvent(item).save();
  },
  editAnItem: async (params) => {
    // params.id params.update
    return await UserInEvent.findByIdAndUpdate(params.id, params.update, {
      new: true,
    });
  },
  deleteAnItem: async (id) => {
    return await UserInEvent.findByIdAndDelete(id);
  },
};
