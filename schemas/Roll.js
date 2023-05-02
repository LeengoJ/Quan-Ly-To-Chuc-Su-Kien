const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

//Tạo bảng tài khoản người dùng

var Roll = new mongoose.Schema({
  Roll: String,
});

module.exports = mongoose.model("Roll", Roll);
