var Account = require("../schemas/Account");
var sendmail = require("../middleware/sendMail");
const configs = require("../configs/configs");
const crypto = require("crypto");
const { error } = require("console");

module.exports = {
  Register: async (item) => {
    var check = await Account.find({
      $or: [{ email: item.email }, { username: item.username }],
    }).exec();
    if (check) {
      return { error: "trung gmail hoac username" };
    } else {
      let newItem = await new Account(item).save();
      return await newItem.getSignedJWT();
    }
  },
  Login: async (item) => {
    const { email, passWord } = item;
    const result = await Account.findByCredentinal(email, passWord);
    if (result.error) {
      return result;
    }
    return result.getSignedJWT();
  },
  ResetPassWord: async (item) => {
    const resetPassToken = crypto
      .createHash("sha256")
      .update(item.resetToken)
      .digest("hex");
    const user = await Account.findOne({
      resetPassToken: resetPassToken,
      resetPassTokenExp: { $gt: Date.now() },
    });
    if (!user) return false;
    user.password = item.password;
    user.resetPassToken = undefined;
    user.resetPassTokenExp = undefined;
    await user.save();
    return true;
  },
  FogotPassWord: async (item) => {
    const account = await Account.findOne({ email: item.email }).exec();
    if (!account) return false;
    const tokenReset = Account.ResetPassWord();
    await user.save();
  },
};
