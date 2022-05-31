const doctorModel = require("./../Model/Doctor");
const doctorslotModel = require("./../Model/Booking");

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

class Doctor {
  async postaddslots(req, res) {
    let { doctorId, daytype, intime, outtime, date } = req.body;

    try {
      if (!doctorId | !intime | !outtime | !date | !daytype) {
        return res.status(401).json({ error: "All filled must be required" });
      } else {
        let newslots = new doctorslotModel({
          doctorId,
          intime,
          outtime,
          daytype,
          date,
        });
        let save = newslots.save();
        if (save) {
          return res.json({ success: "doctor timeslot create successfully" });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
  async postaddslotsduration(req, res) {
    let { doctorId, daytype, fromtime, endtime, date } = req.body;

    try {
      if (!doctorId | !fromtime | !endtime | !date | !daytype) {
        return res.status(401).json({ error: "All filled must be required" });
      } else {
        let newslots = new doctorslotModel({
          doctorId,
          fromtime,
          endtime,
          daytype,
          date,
        });
        let save = newslots.save();
        if (save) {
          return res.json({ success: "doctor timeslot create successfully" });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getdoctorslot(req, res) {
    let { doctorId, daytype, date } = req.body;

    try {
      let doctortimeslot = await doctorslotModel.find({
        date: date,
        doctorId: doctorId,
        daytype: daytype,
      });
      if (doctortimeslot) {
        return res.json({ doctortimeslot: doctortimeslot });
      } else {
        return res.status(404).json({ error: "doctor timeslot didn't exist" });
      }
    } catch {
      return res.status(404).json({ error: "Something went wrong" });
    }
  }

  async getdoctordateslot(req, res) {
    let doctorId = req.params.id;
    let day = req.params.day;

    try {
      let doctortimeslot = await doctorslotModel.find({
        date: day,
        doctorId: doctorId,
      });
      if (doctortimeslot) {
        return res.json({ doctortimeslot: doctortimeslot });
      } else {
        return res.status(404).json({ error: "doctor timeslot didn't exist" });
      }
    } catch {
      return res.status(404).json({ error: "Something went wrong" });
    }
  }

  async postdeleteslot(req, res) {
    let id = req.params.id;
    const data = await doctorslotModel.deleteOne({ _id: id });

    return res.json({ success: "Successfully" });
  }

  async getdoctortimeslot(req, res) {
    let doctorId = req.params.id;
    let day = req.params.day;

    try {
      let doctortimeslot = await doctortimeslotModel.find({
        day: day,
        doctorId: doctorId,
      });
      if (doctortimeslot) {
        return res.json({ doctortimeslot: doctortimeslot });
      } else {
        return res.status(404).json({ error: "doctor timeslot didn't exist" });
      }
    } catch {
      return res.status(404).json({ error: "Something went wrong" });
    }
  }

  async getdoctor(req, res) {
    let doctorId = req.params.id;
    try {
      let doctorprofile = await doctorModel.findOne({ _id: doctorId });
      if (doctorprofile) {
        return res.json({ doctordetails: doctorprofile });
      } else {
        return res.status(404).json({ error: "doctor profile didn't exist" });
      }
    } catch {
      return res.status(404).json({ error: "Something went wrong" });
    }
  }
}

const doctorController = new Doctor();
module.exports = doctorController;
