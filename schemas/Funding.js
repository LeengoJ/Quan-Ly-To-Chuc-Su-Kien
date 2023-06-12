const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

var funding = new mongoose.Schema({
  //event
  idEvent: String,
  //Kinh phí cho địa điểm tổ chức
  forLocation: Number,
  //Kinh phí cho thiết kế
  forDesign: Number,
  //Kinh phí cho đồ ăn và nước uống
  forFoodAndDrinks: Number,
  //Kinh phí cho quảng cáo và truyền thông
  forMaketting: Number,
  //Kinh phí cho các hoạt động phát sinh
  forIncurred: Number,
});
// Export model
module.exports = mongoose.model("funding", funding);
