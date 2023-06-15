const configs = require("../configs/configs");
const Event = require("../schemas/Event");

module.exports = {
  GetAllItem: async () => {
    return await Event.find({}).exec();
  },
  GetItemById: async (id) => {
    return await Event.findById(id).exec();
  },
  GetIdByIdUserAndEventName: async (idUserAdmin, Name) => {
    return await Event.findOne({
      idUserAdmin: idUserAdmin,
      nameEvent: Name,
    }).exec();
  },
  AddAnItem: async (item) => {
    return new Event(item).save();
  },
  editAnItem: async (params) => {
    // params.id params.update
    return await Event.findByIdAndUpdate(params.id, params.update, {
      new: true,
    });
  },
  deleteAnItem: async (id) => {
    return await Event.findByIdAndDelete(id);
  },
};
