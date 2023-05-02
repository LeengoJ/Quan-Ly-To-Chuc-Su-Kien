const express = require("express");
const router = express.Router();
const Roll = require("../schemas/Roll");

router.post("/addRoll", async function (req, res, next) {
  let newItem = await new Roll(req.body).save();
});
