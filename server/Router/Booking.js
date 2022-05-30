const express = require("express");
const router = express.Router();
const doctorController = require("../Controller/Booking");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "profileimage") {
      cb(null, "server/Public/Doctor");
    } else {
      cb(null, "server/Public/Doctor");
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/doctor/timeslot/:id/:day", doctorController.getdoctortimeslot);
router.post("/doctor/addslot", doctorController.postaddslots);
router.post("/doctor/addslotduration", doctorController.postaddslotsduration);
router.post("/doctor/slot", doctorController.getdoctorslot);
router.get("/doctor/dateslot/:id/:day", doctorController.getdoctordateslot);

router.post("/doctor/deleteslot/:id", doctorController.postdeleteslot);

module.exports = router;
