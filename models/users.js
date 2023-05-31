var User = require("../schemas/Account");

module.exports = {
  getAllItem: async () => {
    return await User.find({}).exec();
  },
  getAllId: async () => {
    let allUser = await User.find({}).exec();
    return allUser.map((user) => user._id);
  },
  getItemById: async (id) => {
    return await User.findById(id).exec();
  },
  addAnItem: async (item) => {
    return new User(item).save();
  },
  editAnItem: async (params) => {
    // params.id params.update
    const user = await User.findById(params.id).exec();
    const userNew = await user.UpdateNew(params.update);
    await User.updateOne({ _id: params.id }, userNew);
    return userNew;
  },
  deleteAnItem: async (id) => {
    return await User.findByIdAndDelete(id);
  },
};
