const CompanyLink = require("../schemas/CompanyLink");

module.exports = {
  GetAllItem: async () => {
    return await CompanyLink.find({}).exec();
  },
  GetItemById: async (id) => {
    return await CompanyLink.findById(id).exec();
  },
  AddAnItem: async (item) => {
    console.log(item);
    let newItem = await new CompanyLink(item).save();
    return newItem;
  },
  editAnItem: async (params) => {
    // params.id params.update
    return await CompanyLink.findByIdAndUpdate(params.id, params.update, {
      new: true,
    });
  },
  deleteAnItem: async (id) => {
    return await CompanyLink.findByIdAndDelete(id);
  },
};
