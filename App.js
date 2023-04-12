var express = require("express");
var mongoose = require("mongoose");
var config = require("./configs/configs");

var app = express();

mongoose.connect(config.DB_URL + config.DB_NAME);
mongoose.connection
  .once("open", () => {
    console.log("Connected!");
  })
  .on("error", () => {
    console.log("Fail!");
  });
