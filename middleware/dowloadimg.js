// var express = require("express");

// var router = express.Router();
// const multer = require("multer");
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + "-" + Date.now());
//   },
// });
// const upload = multer({ storage: storage });

// router.post("/Account/setAvatar", upload.single("image"), (req, res) => {
//   console.log(req.file);
//   res.send("Image uploaded successfully!");
// });
// module.exports = router;
