const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var configs = require("../configs/configs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

var Account = new mongoose.Schema({
  userName: { type: String, required: true, maxlength: 100 },
  passWord: { type: String, required: true, minlength: 8, maxlength: 1024 },
  name: String,
  ageUser: { type: Number, min: 18 },
  phone: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  address: String,
});
// Ma hoa password
Account.pre("save", function (next) {
  if (!this.isModified("passWord")) {
    next();
  } else {
    let salt = bcrypt.genSaltSync(configs.saltRounds); // tao 1 chuoi ngau nhien duoc 1 cach dong bo
    this.passWord = bcrypt.hashSync(this.passWord, salt); //;luu chuoi vua duoc tao ra bang ham hashSync vao db
  }
  next();
});
//Chua hieu lam, co le la set thoi gian requet lay id,cha biet dc, hoi giong phan quyen, hoi giong bao mat
Account.methods.getSignedJWT = function () {
  return jwt.sign({ id: this._id }, configs.JWT_SECRET, {
    expiresIn: configs.JWT_EXPIRE,
  });
};
//Tao mat khau moi va dua vao trong db
Account.methods.UpdatePwNew = async function (user) {
  var isMatch = await bcrypt.compare(user.passWord, this.passWord);
  if (!isMatch) {
    var salt = bcrypt.genSaltSync(configs.saltRounds);
    user.passWord = bcrypt.hashSync(user.passWord, salt);
    return user;
  }
  user.passWord = this.passWord;
  return user;
};
//Gui ve client 1 token cho phep giu truy cap quyen thay doi passWord
Account.methods.resetPassword = function () {
  console.log("5");
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPassToken = crypto
    .createHash("sha256") //Thuat toan su dung de ma hoa
    .update(resetToken)
    .digest("hex");
  this.resetPassTokenExp = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

Account.statics.findByCredentinal = async function (email, password) {
  if (!email || !password) {
    return { error: "khong de trong email va password" };
  }
  let user = await this.findOne({ email: email });
  if (!user) {
    return { error: "email khong ton tai" };
  }
  let isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return { error: "password sai" };
  }
  return user;
};
// Export model
module.exports = mongoose.model("Account", Account);
