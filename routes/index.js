var express = require("express");
var router = express.Router();
var handleresult = require("../configs/handleResult");
var models_authentication = require("../models/authentication");
var models_roll = require("../models/Roll");
var models_rollUser = require("../models/RollUser");
var models_Collaborater = require("../models/Collaborater");
var models_Event = require("../models/EventDetails");
var model_DetailEvent = require("../models/EventDetails");
var models_UserInEvent = require("../models/UserInEvent");
var models_User = require("../models/users");
var model_CompanyLink = require("../models/CompanyLink");
var { Rules, validate } = require("../validator/authentication");
const Roll = require("../schemas/Roll");
var protectMiddleware = require("../middleware/protect");
var config1 = require("../configs/configs");

const { config } = require("dotenv");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("Bạn đang lập trình tại ");
});
//Authe
router.post(
  "/authentication/register",
  Rules(),
  validate,
  async function (req, res, next) {
    try {
      var token = await models_authentication.Register(req.body);
      if (token.error) {
        handleresult.showResult(res, 200, true, token.error);
      } else {
        handleresult.showResult(res, 200, true, token);
      }
    } catch (error) {
      handleresult.showResult(res, 400, false, error);
    }
  }
);
router.post("/authentication/login", async function (req, res, next) {
  try {
    var result = await models_authentication.Login(req.body);
    console.log(result);
    if (!result.error) {
      console.log("loi o day");
      saveCookieResponse(res, 200, result);
    } else {
      handleresult.showResult(res, 200, true, result);
    }
  } catch (error) {
    handleresult.showResult(res, 400, false, error);
  }
});
router.get(
  "/authentication/me",
  protectMiddleware.protect,
  async function (req, res, next) {
    try {
      handleresult.showResult(res, 200, true, req.user);
    } catch (error) {
      handleresult.showResult(res, 400, false, error);
    }
  }
);
router.get("/authentication/logout", async function (req, res, next) {
  try {
    const option = {
      expirers: new Date(Date.now() + 1000),
      httpOnly: true,
    };
    res.status(200).cookie("token", "none", option).json({
      success: true,
      data: {},
    });
  } catch (error) {
    handleresult.showResult(res, 400, false, error);
  }
});
router.post("/authentication/forgotpassword", async function (req, res, next) {
  console.log("1");
  try {
    const result = await models_authentication.FogotPassWord(req.body);

    console.log("3");
    if (!result) {
      handleresult.showResult(res, 200, false, { data: "email khong ton tai" });
    }
    handleresult.showResult(res, 200, true, { data: result });
  } catch (error) {
    handleresult.showResult(res, 400, false, error);
  }
});
router.post(
  "/authentication/resetpassword/:resetToken",
  async function (req, res, next) {
    try {
      const user = await models_authentication.Resetpassword({
        resetToken: req.params.resetToken,
        password: req.body.password,
      });
      if (!user) {
        handleresult.showResult(res, 200, false, {
          data: "user khong ton tai",
        });
      }
      handleresult.showResult(res, 200, true, { data: "thanh cong" });
    } catch (error) {
      handleresult.showResult(res, 400, false, error);
    }
  }
);
//
router.post(
  "/CompanyLink/add",
  //[protectMiddleware.protect, protectMiddleware.authorize("admin")],
  async function (req, res, next) {
    try {
      var items = await model_CompanyLink.AddAnItem(req.body);
      console.log(items);
      handleresult.showResult(res, 200, true, items);
    } catch (error) {
      handleresult.showResult(res, 400, false, error);
    }
  }
);
//Roll
// router.post(
//   "/Roll/addRoll",
//   protectMiddleware.protect,
//   protectMiddleware.authorize("admin"),
//   async function (req, res, next) {
//     try {
//       // var items = await new Roll(req.body).save();
//       console.log("sdasd");
//       var items = await models_roll.AddAnItem(req.body);
//       handleresult.showResult(res, 200, true, items);
//     } catch (error) {
//       handleresult.showResult(res, 400, false, error);
//     }
//   }
// );
router.post(
  "/Roll/addRoll",
  [protectMiddleware.protect, protectMiddleware.authorize("admin")],
  async function (req, res, next) {
    try {
      var items = await models_roll.AddAnItem(req.body);
      handleresult.showResult(res, 200, true, items);
    } catch (error) {
      handleresult.showResult(res, 400, false, error);
    }
  }
);

router.get("/Roll/", async function (req, res, next) {
  try {
    var items = await models_roll.GetAllItem();

    handleresult.showResult(res, 200, true, items);
  } catch (error) {
    handleresult.showResult(res, 400, false, error);
  }
});
router.get("/UserID/", async function (req, res, next) {
  try {
    console.log("items");
    var items = await models_User.getAllId();

    handleresult.showResult(res, 200, true, items);
  } catch (error) {
    handleresult.showResult(res, 400, false, error);
  }
});
router.get("/Roll/:id", async function (req, res, next) {
  try {
    var item = await models_roll.GetItemById(req.params.id);
    handleresult.showResult(res, 200, true, item);
  } catch (error) {
    handleresult.showResult(res, 400, false, error);
  }
});
router.put("/Roll/edit/:id", async function (req, res, next) {
  try {
    var item = await models_roll.editAnItem({
      id: req.params.id,
      update: req.body,
    });
    handleresult.showResult(res, 200, true, item);
  } catch (error) {
    handleresult.showResult(res, 400, false, error);
  }
});
router.delete("/Roll/delete/:id", async function (req, res, next) {
  try {
    var item = await models_roll.deleteAnItem(req.params.id);
    handleresult.showResult(res, 200, true, item);
  } catch (error) {
    handleresult.showResult(res, 400, false, error);
  }
});
//Add roll with user
router.get("/Roll_U/", async function (req, res, next) {
  try {
    var items = await models_rollUser.GetAllItem();
    handleresult.showResult(res, 200, true, items);
  } catch (error) {
    handleresult.showResult(res, 400, false, error);
  }
});
router.post(
  "/Roll_U/addRoll",
  protectMiddleware.protect,
  protectMiddleware.authorize("admin"),
  async function (req, res, next) {
    try {
      var item = await models_rollUser.AddAnItem(req.body);
      handleresult.showResult(res, 200, true, item);
    } catch (error) {
      handleresult.showResult(res, 400, false, error);
    }
  }
);
router.get("/Roll_U/:id", async function (req, res, next) {
  try {
    var item = await models_rollUser.GetItemById(req.params.id);
    handleresult.showResult(res, 200, true, item);
  } catch (error) {
    handleresult.showResult(res, 400, false, error);
  }
});
router.put("/Roll_U/edit/:id", async function (req, res, next) {
  try {
    var item = await models_rollUser.editAnItem({
      id: req.params.id,
      update: req.body,
    });
    handleresult.showResult(res, 200, true, item);
  } catch (error) {
    handleresult.showResult(res, 400, false, error);
  }
});
router.delete("/Roll_U/delete/:id", async function (req, res, next) {
  try {
    var item = await models_rollUser.deleteAnItem(req.params.id);
    handleresult.showResult(res, 200, true, item);
  } catch (error) {
    handleresult.showResult(res, 400, false, error);
  }
});
//Add coll
router.post("/Collaborater/add", async function (req, res, next) {
  try {
    var item = await models_Collaborater.AddAnItem(req.body);
    handleresult.showResult(res, 200, true, item);
  } catch (error) {
    handleresult.showResult(res, 400, false, error);
  }
});
router.get("/Collaborater/", async function (req, res, next) {
  console.log("1");
  try {
    var items = await models_Collaborater.GetAllItem();

    handleresult.showResult(res, 200, true, items);
  } catch (error) {
    handleresult.showResult(res, 400, false, error);
  }
});
router.get("/Collaborater/:id", async function (req, res, next) {
  try {
    var item = await models_Collaborater.GetItemById(req.params.id);
    handleresult.showResult(res, 200, true, item);
  } catch (error) {
    handleresult.showResult(res, 400, false, error);
  }
});
router.put("/Collaborater/edit/:id", async function (req, res, next) {
  try {
    var item = await models_Collaborater.editAnItem({
      id: req.params.id,
      update: req.body,
    });
    handleresult.showResult(res, 200, true, item);
  } catch (error) {
    handleresult.showResult(res, 400, false, error);
  }
});
router.delete("/Collaborater/delete/:id", async function (req, res, next) {
  try {
    var item = await models_Collaborater.deleteAnItem(req.params.id);
    handleresult.showResult(res, 200, true, item);
  } catch (error) {
    handleresult.showResult(res, 400, false, error);
  }
});
// Add Event
router.post("/Event/add", async function (req, res, next) {
  try {
    var item = await models_Event.AddAnItem(req.body);
    handleresult.showResult(res, 200, true, item);
  } catch (error) {
    handleresult.showResult(res, 400, false, error);
  }
});
router.get("/Event/", async function (req, res, next) {
  try {
    var items = await models_Event.GetAllItem();
    handleresult.showResult(res, 200, true, items);
  } catch (error) {
    handleresult.showResult(res, 400, false, error);
  }
});
router.get("/Event/:id", async function (req, res, next) {
  try {
    var item = await models_Event.GetItemById(req.params.id);
    handleresult.showResult(res, 200, true, item);
  } catch (error) {
    handleresult.showResult(res, 400, false, error);
  }
});
router.put("/Event/edit/:id", async function (req, res, next) {
  try {
    var item = await models_Event.editAnItem({
      id: req.params.id,
      update: req.body,
    });
    handleresult.showResult(res, 200, true, item);
  } catch (error) {
    handleresult.showResult(res, 400, false, error);
  }
});
router.delete("/Event/delete/:id", async function (req, res, next) {
  try {
    var item = await models_Event.deleteAnItem(req.params.id);
    handleresult.showResult(res, 200, true, item);
  } catch (error) {
    handleresult.showResult(res, 400, false, error);
  }
});

router.post("/EventDetail/add", async function (req, res, next) {
  try {
    var item = await model_DetailEvent.AddAnItem(req.body);
    handleresult.showResult(res, 200, true, item);
  } catch (error) {
    handleresult.showResult(res, 400, false, error);
  }
});
router.get("/EventDetail/", async function (req, res, next) {
  try {
    var items = await model_DetailEvent.GetAllItem();
    handleresult.showResult(res, 200, true, items);
  } catch (error) {
    handleresult.showResult(res, 400, false, error);
  }
});
router.get("/EventDetail/:id", async function (req, res, next) {
  try {
    var item = await model_DetailEvent.GetItemById(req.params.id);
    handleresult.showResult(res, 200, true, item);
  } catch (error) {
    handleresult.showResult(res, 400, false, error);
  }
});
router.put("/EventDetail/edit/:id", async function (req, res, next) {
  try {
    var item = await model_DetailEvent.editAnItem({
      id: req.params.id,
      update: req.body,
    });
    handleresult.showResult(res, 200, true, item);
  } catch (error) {
    handleresult.showResult(res, 400, false, error);
  }
});
router.delete("/EventDetail/delete/:id", async function (req, res, next) {
  try {
    var item = await model_DetailEvent.deleteAnItem(req.params.id);
    handleresult.showResult(res, 200, true, item);
  } catch (error) {
    handleresult.showResult(res, 400, false, error);
  }
});

router.post("/UserInEvent/add", async function (req, res, next) {
  try {
    var item = await models_UserInEvent.AddAnItem(req.body);
    handleresult.showResult(res, 200, true, item);
  } catch (error) {
    handleresult.showResult(res, 400, false, error);
  }
});
router.get("/UserInEvent/", async function (req, res, next) {
  console.log("1");
  try {
    var items = await models_UserInEvent.GetAllItem();

    handleresult.showResult(res, 200, true, items);
  } catch (error) {
    handleresult.showResult(res, 400, false, error);
  }
});
router.get("/UserInEvent/:id", async function (req, res, next) {
  try {
    var item = await models_UserInEvent.GetItemById(req.params.id);
    handleresult.showResult(res, 200, true, item);
  } catch (error) {
    handleresult.showResult(res, 400, false, error);
  }
});
router.put("/UserInEvent/edit/:id", async function (req, res, next) {
  try {
    var item = await models_UserInEvent.editAnItem({
      id: req.params.id,
      update: req.body,
    });
    handleresult.showResult(res, 200, true, item);
  } catch (error) {
    handleresult.showResult(res, 400, false, error);
  }
});
router.delete("/UserInEvent/delete/:id", async function (req, res, next) {
  try {
    var item = await models_UserInEvent.deleteAnItem(req.params.id);
    handleresult.showResult(res, 200, true, item);
  } catch (error) {
    handleresult.showResult(res, 400, false, error);
  }
});

module.exports = router;
function saveCookieResponse(res, StatusCode, token) {
  const option = {
    expirers: new Date(Date.now() + config.COOKIE_EXPIRE * 24 * 3600 * 1000),
    httpOnly: true,
  };
  res.status(StatusCode).cookie("token", token, option).json({
    success: true,
    data: token,
  });
}
