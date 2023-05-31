var handleresult = require("../configs/handleResult");
var config = require("../configs/configs");
var jwt = require("jsonwebtoken");
var userModel = require("../models/users");
var models_rollUser = require("../models/RollUser");
var models_roll = require("../models/Roll");

module.exports = {
  protect: async (req, res, next) => {
    let token = "";
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }
    if (!token) {
      return handleresult.showResult(res, 200, false, "vui long dang nhap");
    }

    try {
      const decode = jwt.verify(token, config.JWT_SECRET);
      console.log(decode);
      req.user = await userModel.getItemById(decode.id);
      next();
    } catch (error) {
      return handleresult.showResult(res, 200, false, "vui long dang nhap");
    }
  },
  authorize: (...roles) => {
    return (req, res, next) => {
      console.log(req.user.roles);
      let idUser = req.user.id;
      var roles = models_roll.getItemById(
        models_rollUser.GetItemByIdUser(idUser).idRoll
      );
      if (!roles.includes(req.user.roles)) {
        return handleresult.showResult(res, 200, false, "ban khong co quyen");
      }
      next();
    };
  },
};
