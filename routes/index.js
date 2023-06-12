let express = require("express");
let router = express.Router();
let handleresult = require("../configs/handleResult");
let models_authentication = require("../models/authentication");
let models_roll = require("../models/Role");
let models_rollUser = require("../models/RoleUser");
let models_Event = require("../models/Event");
let model_DetailEvent = require("../models/EventDetails");
let models_UserInEvent = require("../models/UserInEvent");
let models_User = require("../models/users");
let model_CompanyLink = require("../models/CompanyLink");
let model_CustomerOfAn = require("../models/CustomerInEvent_AN");
let model_Location = require("../models/LocationEvent");
let { Rules, validate } = require("../validator/authentication");
const Roll = require("../schemas/Role");
let protectMiddleware = require("../middleware/protect");
let config1 = require("../configs/configs");
let jwt = require("jsonwebtoken");
let UserForEentAn = require("../service/UserForEventAn/add");

// let Account = require("../schemas/Account")
// const { config } = require("dotenv");
// const { token } = require("morgan");

/* GET home page. */
router.get("/", async function (req, res, next) {
  // res.send("Bạn đang lập trình tại ");
  // res.render("/index");
  try {
    res.render("home/index");
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve players" });
  }
});
//Authe
router.post(
  "/authentication/register",
  Rules(),
  validate,
  async function (req, res, next) {
    try {
      let token = await models_authentication.Register(req.body);
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
    let result = await models_authentication.Login(req.body);
    // console.log(result);
    if (!result.error) {
      saveCookieResponse(res, 200, result);
    } else {
      handleresult.showResult(res, 200, true, result);
    }
  } catch (error) {
    handleresult.showResult(res, 400, false, error);
  }
});
router.get("/authentication/me", async function (req, res, next) {
  try {
    handleresult.showResult(res, 200, true, req.user);
  } catch (error) {
    handleresult.showResult(res, 400, false, error);
  }
});
router.post(
  "/authentication/logout",
  protectMiddleware.protect,
  async function (req, res, next) {
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
  }
);
router.post(
  "/authentication/forgotpassword",

  async function (req, res, next) {
    console.log("1");
    try {
      const result = await models_authentication.FogotPassWord(req.body);

      console.log("3");
      if (!result) {
        handleresult.showResult(res, 200, false, {
          data: "email khong ton tai",
        });
      }
      handleresult.showResult(res, 200, true, { data: result });
    } catch (error) {
      handleresult.showResult(res, 400, false, error);
    }
  }
);
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
  protectMiddleware.protect,
  //[protectMiddleware.protect, protectMiddleware.authorize("admin")],
  async function (req, res, next) {
    try {
      let items = await model_CompanyLink.AddAnItem(req.body);
      console.log(items);
      handleresult.showResult(res, 200, true, items);
    } catch (error) {
      handleresult.showResult(res, 400, false, error);
    }
  }
);
//
router.post(
  "/CustomerForEventAN/add",
  // protectMiddleware.protect,
  // [protectMiddleware.protect, protectMiddleware.authorize("admin")],
  async function (req, res, next) {
    try {
      let items = await model_CustomerOfAn.AddAnItem(req.body);
      console.log(items);
      handleresult.showResult(res, 200, true, items);
    } catch (error) {
      handleresult.showResult(res, 400, false, error);
    }
  }

  // UserForEentAn.add
);
router.put(
  "/CustomerForEventAN/edit/:id",
  protectMiddleware.protect,
  protectMiddleware.checkRollInEvent("admin", "user"),
  async function (req, res, next) {
    try {
      let item = await model_CustomerOfAn.editAnItem({
        id: req.params.id,
        update: req.body,
      });
      handleresult.showResult(res, 200, true, item);
    } catch (error) {
      handleresult.showResult(res, 400, false, error);
    }
  }
);
// Location
router.post("/Location/add", async function (req, res, next) {
  try {
    let items = await model_Location.AddAnItem(req.body);
    console.log(items);
    handleresult.showResult(res, 200, true, items);
  } catch (error) {
    handleresult.showResult(res, 400, false, error);
  }
});
router.put(
  "/Location/edit/:id",
  protectMiddleware.protect,
  async function (req, res, next) {
    try {
      let item = await model_Location.editAnItem({
        id: req.params.id,
        update: req.body,
      });
      handleresult.showResult(res, 200, true, item);
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
//       // let items = await new Roll(req.body).save();
//       console.log("sdasd");
//       let items = await models_roll.AddAnItem(req.body);
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
      let items = await models_roll.AddAnItem(req.body);
      handleresult.showResult(res, 200, true, items);
    } catch (error) {
      handleresult.showResult(res, 400, false, error);
    }
  }
);

router.get(
  "/Roll/",
  protectMiddleware.protect,
  async function (req, res, next) {
    try {
      let items = await models_roll.GetAllItem();

      handleresult.showResult(res, 200, true, items);
    } catch (error) {
      handleresult.showResult(res, 400, false, error);
    }
  }
);
router.get(
  "/UserID/",
  protectMiddleware.protect,
  async function (req, res, next) {
    try {
      let items = await models_User.getAllId();
      handleresult.showResult(res, 200, true, items);
    } catch (error) {
      handleresult.showResult(res, 400, false, error);
    }
  }
);
router.get(
  "/UserNameById/",
  protectMiddleware.protect,
  async function (req, res, next) {
    try {
      let token = "";
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      } else if (req.cookies.token) {
        token = req.cookies.token;
      }
      let id = jwt.verify(token, config1.JWT_SECRET);
      let items = await models_User.getItemById(id.id);
      handleresult.showResult(res, 200, true, items);
    } catch (error) {
      handleresult.showResult(res, 400, false, error);
    }
  }
);
router.get(
  "/Roll/:id",
  protectMiddleware.protect,
  async function (req, res, next) {
    try {
      let item = await models_roll.GetItemById(req.params.id);
      handleresult.showResult(res, 200, true, item);
    } catch (error) {
      handleresult.showResult(res, 400, false, error);
    }
  }
);
router.put(
  "/Roll/edit/:id",
  protectMiddleware.protect,
  async function (req, res, next) {
    try {
      let item = await models_roll.editAnItem({
        id: req.params.id,
        update: req.body,
      });
      handleresult.showResult(res, 200, true, item);
    } catch (error) {
      handleresult.showResult(res, 400, false, error);
    }
  }
);
router.delete(
  "/Roll/delete/:id",
  protectMiddleware.protect,
  async function (req, res, next) {
    try {
      let item = await models_roll.deleteAnItem(req.params.id);
      handleresult.showResult(res, 200, true, item);
    } catch (error) {
      handleresult.showResult(res, 400, false, error);
    }
  }
);
//Add roll with user
router.get(
  "/Roll_U/",
  protectMiddleware.protect,
  async function (req, res, next) {
    try {
      let items = await models_rollUser.GetAllItem();
      handleresult.showResult(res, 200, true, items);
    } catch (error) {
      handleresult.showResult(res, 400, false, error);
    }
  }
);
router.post(
  "/Roll_U/addRoll",
  protectMiddleware.protect,
  protectMiddleware.authorize("admin"),
  async function (req, res, next) {
    try {
      let item = await models_rollUser.AddAnItem(req.body);
      handleresult.showResult(res, 200, true, item);
    } catch (error) {
      handleresult.showResult(res, 400, false, error);
    }
  }
);
router.get(
  "/Roll_U/:id",
  protectMiddleware.protect,
  async function (req, res, next) {
    try {
      let item = await models_rollUser.GetItemById(req.params.id);
      handleresult.showResult(res, 200, true, item);
    } catch (error) {
      handleresult.showResult(res, 400, false, error);
    }
  }
);
router.put(
  "/Roll_U/edit/:id",
  protectMiddleware.protect,
  async function (req, res, next) {
    try {
      let item = await models_rollUser.editAnItem({
        id: req.params.id,
        update: req.body,
      });
      handleresult.showResult(res, 200, true, item);
    } catch (error) {
      handleresult.showResult(res, 400, false, error);
    }
  }
);
router.delete(
  "/Roll_U/delete/:id",
  protectMiddleware.protect,
  async function (req, res, next) {
    try {
      let item = await models_rollUser.deleteAnItem(req.params.id);
      handleresult.showResult(res, 200, true, item);
    } catch (error) {
      handleresult.showResult(res, 400, false, error);
    }
  }
);
//Add coll
router.post(
  "/Collaborater/add",
  protectMiddleware.protect,
  async function (req, res, next) {
    try {
      let item = await models_Collaborater.AddAnItem(req.body);
      handleresult.showResult(res, 200, true, item);
    } catch (error) {
      handleresult.showResult(res, 400, false, error);
    }
  }
);
router.get(
  "/Collaborater/",
  protectMiddleware.protect,
  async function (req, res, next) {
    console.log("1");
    try {
      let items = await models_Collaborater.GetAllItem();

      handleresult.showResult(res, 200, true, items);
    } catch (error) {
      handleresult.showResult(res, 400, false, error);
    }
  }
);
router.get(
  "/Collaborater/:id",
  protectMiddleware.protect,
  async function (req, res, next) {
    try {
      let item = await models_Collaborater.GetItemById(req.params.id);
      handleresult.showResult(res, 200, true, item);
    } catch (error) {
      handleresult.showResult(res, 400, false, error);
    }
  }
);
router.put(
  "/Collaborater/edit/:id",
  protectMiddleware.protect,
  async function (req, res, next) {
    try {
      let item = await models_Collaborater.editAnItem({
        id: req.params.id,
        update: req.body,
      });
      handleresult.showResult(res, 200, true, item);
    } catch (error) {
      handleresult.showResult(res, 400, false, error);
    }
  }
);
router.delete(
  "/Collaborater/delete/:id",
  protectMiddleware.protect,
  async function (req, res, next) {
    try {
      let item = await models_Collaborater.deleteAnItem(req.params.id);
      handleresult.showResult(res, 200, true, item);
    } catch (error) {
      handleresult.showResult(res, 400, false, error);
    }
  }
);
// Add Event
router.post(
  "/Event/add",
  // protectMiddleware.protect,
  async function (req, res, next) {
    try {
      let item = await models_Event.AddAnItem(req.body);
      console.log(item);
      handleresult.showResult(res, 200, true, item);
    } catch (error) {
      handleresult.showResult(res, 400, false, error);
    }
  }
);
router.get(
  "/Event/",
  protectMiddleware.protect,
  async function (req, res, next) {
    try {
      let items = await models_Event.GetAllItem();
      handleresult.showResult(res, 200, true, items);
    } catch (error) {
      handleresult.showResult(res, 400, false, error);
    }
  }
);
router.get(
  "/Event/:id",
  protectMiddleware.protect,
  async function (req, res, next) {
    try {
      let item = await models_Event.GetItemById(req.params.id);
      handleresult.showResult(res, 200, true, item);
    } catch (error) {
      handleresult.showResult(res, 400, false, error);
    }
  }
);
router.put(
  "/Event/edit/:id",
  protectMiddleware.protect,
  async function (req, res, next) {
    try {
      let item = await models_Event.editAnItem({
        id: req.params.id,
        update: req.body,
      });
      handleresult.showResult(res, 200, true, item);
    } catch (error) {
      handleresult.showResult(res, 400, false, error);
    }
  }
);
router.delete(
  "/Event/delete/:id",
  protectMiddleware.protect,
  async function (req, res, next) {
    try {
      let item = await models_Event.deleteAnItem(req.params.id);
      handleresult.showResult(res, 200, true, item);
    } catch (error) {
      handleresult.showResult(res, 400, false, error);
    }
  }
);

router.post(
  "/EventDetail/add",
  // protectMiddleware.protect,
  async function (req, res, next) {
    try {
      let item = await model_DetailEvent.AddAnItem(req.body);
      handleresult.showResult(res, 200, true, item);
    } catch (error) {
      handleresult.showResult(res, 400, false, error);
    }
  }
);
router.get(
  "/EventDetail/",
  protectMiddleware.protect,
  async function (req, res, next) {
    try {
      let items = await model_DetailEvent.GetAllItem();
      handleresult.showResult(res, 200, true, items);
    } catch (error) {
      handleresult.showResult(res, 400, false, error);
    }
  }
);
router.get(
  "/EventDetail/:id",
  protectMiddleware.protect,
  async function (req, res, next) {
    try {
      let item = await model_DetailEvent.GetItemById(req.params.id);
      handleresult.showResult(res, 200, true, item);
    } catch (error) {
      handleresult.showResult(res, 400, false, error);
    }
  }
);
router.put(
  "/EventDetail/edit/:id",
  protectMiddleware.protect,
  async function (req, res, next) {
    try {
      let item = await model_DetailEvent.editAnItem({
        id: req.params.id,
        update: req.body,
      });
      handleresult.showResult(res, 200, true, item);
    } catch (error) {
      handleresult.showResult(res, 400, false, error);
    }
  }
);
router.delete(
  "/EventDetail/delete/:id",
  protectMiddleware.protect,
  async function (req, res, next) {
    try {
      let item = await model_DetailEvent.deleteAnItem(req.params.id);
      handleresult.showResult(res, 200, true, item);
    } catch (error) {
      handleresult.showResult(res, 400, false, error);
    }
  }
);

router.post(
  "/UserInEvent/add",
  // protectMiddleware.protect,
  async function (req, res, next) {
    try {
      let item = await models_UserInEvent.AddAnItem(req.body);
      handleresult.showResult(res, 200, true, item);
    } catch (error) {
      handleresult.showResult(res, 400, false, error);
    }
  }
);
router.get(
  "/UserInEvent/",
  // protectMiddleware.protect,
  async function (req, res, next) {
    try {
      let items = await models_UserInEvent.GetAllItem();

      handleresult.showResult(res, 200, true, items);
    } catch (error) {
      handleresult.showResult(res, 400, false, error);
    }
  }
);
router.get(
  "/UserInEvent/:id",
  protectMiddleware.protect,
  async function (req, res, next) {
    try {
      let item = await models_UserInEvent.GetItemById(req.params.id);
      handleresult.showResult(res, 200, true, item);
    } catch (error) {
      handleresult.showResult(res, 400, false, error);
    }
  }
);
router.put(
  "/UserInEvent/edit/:id",
  protectMiddleware.protect,
  async function (req, res, next) {
    try {
      let item = await models_UserInEvent.editAnItem({
        id: req.params.id,
        update: req.body,
      });
      handleresult.showResult(res, 200, true, item);
    } catch (error) {
      handleresult.showResult(res, 400, false, error);
    }
  }
);
router.delete(
  "/UserInEvent/delete/:id",
  protectMiddleware.protect,
  async function (req, res, next) {
    try {
      let item = await models_UserInEvent.deleteAnItem(req.params.id);
      handleresult.showResult(res, 200, true, item);
    } catch (error) {
      handleresult.showResult(res, 400, false, error);
    }
  }
);

module.exports = router;
function saveCookieResponse(res, StatusCode, token) {
  const option = {
    expirers: new Date(Date.now() + config1.COOKIE_EXPIRE * 24 * 3600 * 1000),
    httpOnly: true,
  };
  res.status(StatusCode).cookie("token", token, option).json({
    success: true,
    data: token,
  });
  // res.status(StatusCode).cookie("Token", token, {
  //   httpOnly: true,
  //   secure: false,
  //   path: "/",
  //   sameSite: "strict",
  // });
}
