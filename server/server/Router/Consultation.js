const express = require("express");
const router = express.Router();
const consultationController = require("../Controller/Consultation");

router.post("/book", consultationController.postaddconsultation);
router.post("/getappointment", consultationController.getdoctorbooking);

module.exports = router;
