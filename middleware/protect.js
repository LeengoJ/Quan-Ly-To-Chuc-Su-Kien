var handleresult = require("../configs/handleResult");
var config = require("../configs/configs");
var jwt = require("jsonwebtoken");
var userModel = require("../models/users");
var models_rollUser = require("../models/RoleUser");
var models_roll = require("../models/Role");
var models_userInEvent = require("../models/UserInEvent");

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
      // console.log(decode);
      req.user = await userModel.getItemById(decode.id);
      next();
    } catch (error) {
      return handleresult.showResult(res, 200, false, "vui long dang nhap");
    }
  },
  authorize: (...roles) => {
    return (req, res, next) => {
      // console.log(req.user.roles);
      const decode = jwt.verify(token, config.JWT_SECRET);

      let idUser = decode.id;
      var roles1 = models_roll.getItemById(
        models_rollUser.GetItemByIdUser(idUser).idRoll
      );
      if (roles1 == "god") next();
      if (!roles.includes(roles1)) {
        return handleresult.showResult(res, 200, false, "ban khong co quyen");
      }
      next();
    };
  },
  checkRollInEvent: (...roles) => {
    return (req, res, next) => {
      // console.log(req.user.roles);
      const decode = jwt.verify(token, config.JWT_SECRET);
      let idUser = decode.id;
      //
      let roles2 = models_roll.getItemById(
        models_rollUser.GetItemByIdUser(idUser).idRoll
      );
      if (roles2 == "god") next();
      //
      let roles1 = models_userInEvent.getItemById(idUser).role;
      if (!roles.includes(roles1.Role)) {
        return handleresult.showResult(res, 200, false, "ban khong co quyen");
      }
      next();
    };
  },
};
