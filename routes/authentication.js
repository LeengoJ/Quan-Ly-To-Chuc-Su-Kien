var express = require("express");
var router = express.Router();
var models = require("../models/authentication");
var handleresult = require("../configs/handleResult");
var config = require("../configs/configs");
var { Rules, validate } = require("../validator/authentication");
// var { PassRules, PassValidate } = require("../validator/password");
var protectMiddleware = require("../middleware/protect");

router.post("/register", Rules(), validate, async function (req, res, next) {
  try {
    var token = await models.Register(req.body);
    if (token.error) {
      handleresult.showResult(res, 200, true, token.error);
    } else {
      handleresult.showResult(res, 200, true, token);
    }
  } catch (error) {
    handleresult.showResult(res, 400, false, error);
  }
});

module.exports = router;
function saveCookieResponse(res, StatusCode, token) {
  const option = {
    expirers: new Date(Date.now() + config.COOKIE_EXPIRE * 24 * 3600 * 1000),
    httpOnly: true,
  };
  res.status(StatusCode).cookie("token", token, option).json({
    success: true,
    data: token,
  });
}
