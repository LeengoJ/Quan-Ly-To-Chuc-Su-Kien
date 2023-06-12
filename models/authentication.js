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
    if (!check) {
      console.log(4);
      return { error: "Trung gmail hoac username" };
    } else {
      console.log("f5");
      let newItem = await new Account(item).save();
      console.log("f6");
      return await newItem.getSignedJWT();
    }
  },
  Login: async (item) => {
    const { userName, passWord } = item;
    // console.log(userName + passWord);
    const result = await Account.findByCredentinal(userName, passWord);

    if (result.error) {
      return result;
    }
    // console.log(result);
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
    const user = await Account.findOne({ email: item.email }).exec();

    if (!user) return false;

    const tokenReset = user.resetPassword();
    await user.save();

    const resetURL = `${configs.HOST}api/v1/auth/resetpassword/${tokenReset}`;
    const message = `Truy cap vao link de doi passs: ${resetURL}`;

    try {
      await sendmail.SendMail({
        email: user.email,
        subject: " Doi Pass",
        message: message,
      });
      return "check mail";
    } catch (error) {
      user.resetPassToken = undefined;
      user.resetPassTokenExp = undefined;
      await user.save();
      return "khong gui duoc mail" + error;
    }
  },
};
