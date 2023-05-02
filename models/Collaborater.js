var Collaborater = require("../schemas/Collaborater");

module.exports = {
  getAllItem: async () => {
    return await Collaborater.find({}).exec();
  },
  getItemById: async (id) => {
    return await Collaborater.findById(id).exec();
  },
  addAnItem: async (item) => {
    return new Collaborater(item).save();
  },
  editAnItem: async (params) => {
    // params.id params.update
    const user = await Collaborater.findById(params.id).exec();
    const userNew = await user.UpdateNew(params.update);
    await Collaborater.updateOne({ _id: params.id }, userNew);
    return userNew;
  },
  deleteAnItem: async (id) => {
    return await Collaborater.findByIdAndDelete(id);
  },
};
