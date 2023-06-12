var handleresult = require("../../configs/handleResult");
let model_CustomerOfAn = require("../../models/CustomerInEvent_AN");
module.exports = {
  add: async (req, res, next) => {
    try {
      let items = await model_CustomerOfAn.AddAnItem(req.body);
      console.log(items);
      handleresult.showResult(res, 200, true, items);
    } catch (error) {
      handleresult.showResult(res, 400, false, error);
    }
  },
};
