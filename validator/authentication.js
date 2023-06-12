const { body, validationResult } = require("express-validator");
var handleresult = require("../configs/handleResult");
const Roll = require("../models/Role");
var util = require("util");

var roles = Roll.GetAllItem();
const option = {
  LengthName: { min: 5, max: 40 },
  StrongPassword: {
    minLength: 8,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  },
};

const Rules = () => {
  return [
    body("email").isEmail().withMessage("Phai nhap email tai day"),
    body("passWord")
      .isStrongPassword(option.StrongPassword)
      .withMessage(
        util.format(
          "mat khau dai it nhat %d ki tu, co it nhat %d chu hoa,%d chu thuong, %d so va %d ki tu",
          option.StrongPassword.minLength,
          option.StrongPassword.minUppercase,
          option.StrongPassword.minLowercase,
          option.StrongPassword.minNumbers,
          option.StrongPassword.minSymbols
        )
      ),
  ];
};
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return handleresult.showResult(res, 400, false, { errors: errors.array() });
};

module.exports = {
  Rules,
  validate,
};
