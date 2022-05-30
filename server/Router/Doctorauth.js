const express = require("express");
const router = express.Router();
const authController = require("../Controller/Doctorauth");

const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "profileimage") {
      cb(null, "server/Public/doctor");
    } else {
      cb(null, "server/Public/doctor");
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/signup", upload.any(), authController.postSignup);
router.post("/signin", authController.postSignin);
router.get("/signout/:id", authController.getsignout);
router.get("/alldoctor", authController.alldoctor);

module.exports = router;
