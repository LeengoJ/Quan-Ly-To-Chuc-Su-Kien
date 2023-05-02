var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var partials = require("express-partials");
var mongoose = require("mongoose");
var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");
var cors = require("cors");
var xss = require("xss-clean");
var helmet = require("helmet");
var config = require("./configs/configs");
var rateLimit = require("express-rate-limit");

const myRouter = express.Router();
// const middleware = require("./middleware/protect");

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 2, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
//   standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
// });

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(partials());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(helmet());
app.use(xss());
app.use(cors());

// app.use("/", indexRouter);

mongoose.connect(config.DB_URL + config.DB_NAME);
mongoose.connection
  .once("open", () => {
    console.log("Connected!");
  })
  .on("error", () => {
    console.log("Fail!");
  });

//myRouter.use(middleware.protect());

app.use("/", indexRouter);
// error handler

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
