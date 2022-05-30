const express = require("express");
const router = express.Router();
const authController = require("../Controller/Userauth");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "server/Public/patient");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/signup",
  upload.single("profileimage"),
  authController.postSignup
);
router.post("/signin", authController.postSignin);
router.get("/signout/:id", authController.getsignout);

module.exports = router;
