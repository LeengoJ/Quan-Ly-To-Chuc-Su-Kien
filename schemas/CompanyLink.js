const mongoose = require("mongoose");

var CompanyLink = new mongoose.Schema({
  NameC: String, //Tên công ty: trường thông tin bắt buộc cho tên của công ty hợp tác.
  Address: String, //Địa chỉ: trường thông tin bắt buộc cho địa chỉ của công ty.
  email: String, //Email: trường thông tin bắt buộc cho địa chỉ email của công ty.
  phoneNumber: String, //Số điện thoại: trường thông tin bắt buộc cho số điện thoại của công ty.
  Website: String, //Website: trường thông tin tùy chọn cho URL của trang web công ty.
  CDetail: String, //Mô tả công ty: trường thông tin tùy chọn cho mô tả công ty và hoạt động của nó.
  Representative: String, //Đại diện công ty: trường thông tin cho tên và thông tin liên lạc của người đại diện công ty.
  Career: String, //Ngành nghề: trường thông tin cho ngành nghề hoặc lĩnh vực hoạt động của công ty.
  NumberOfStaff: String, //Số lượng nhân viên: trường thông tin cho sốlượng nhân viên hiện tại của công ty.
  CooperationTime: String, //Thời gian hợp tác: trường thông tin cho thời gian hợp tác giữa công ty và ứng dụng của bạn.
  Rating: Number, //Đánh giá của khách hàng: trường thông tin cho đánh giá của khách hàng về sản phẩm hoặc dịch vụ của công ty.
  RatingCount: Number, //Số lượng đánh giá: trường thông tin cho số lượng đánh giá của công ty.
  ImplementedProjects: String, //Các dự án đã thực hiện: trường thông tin cho các dự án đã thực hiện hoặc các khách hàng trước đây của công ty.
});
module.exports = mongoose.model("CompanyLink", CompanyLink);
