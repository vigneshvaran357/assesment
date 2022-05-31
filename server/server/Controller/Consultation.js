const doctorslotModel = require("./../Model/Booking");
const consultationModel = require("../Model/Consultation");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

class Consultation {
  async postaddconsultation(req, res) {
    let { patientId, doctorId, slotId, reason, bookingdatetime, date } =
      req.body;

    if (!patientId | !doctorId) {
      return res.status(401).json({ error: "All filled must be required" });
    } else {
      try {
        let newConsultation = new consultationModel({
          patientId,
          doctorId,
          slotId,
          reason,
          date,
          bookingdatetime,
        });
        let save = newConsultation.save();
        if (save) {
          await doctorslotModel.findOneAndUpdate(
            { _id: slotId },
            {
              slotstatus: "booked",
            }
          );
          return res.json({ success: "Booked create successfully" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async getdoctorbooking(req, res) {
    let { doctorId, days } = req.body;
    try {
      let slot = await consultationModel.aggregate([
        {
          $lookup: {
            from: "doctors",
            localField: "doctorId",
            foreignField: "_id",
            as: "doctors",
          },
        },
        {
          $lookup: {
            from: "patients",
            localField: "patientId",
            foreignField: "_id",
            as: "patients",
          },
        },
        {
          $lookup: {
            from: "doctorslots",
            localField: "slotId",
            foreignField: "_id",
            as: "slot",
          },
        },

        {
          $match: {
            doctorId: new ObjectId(doctorId),
          },
        },
        {
          $match: {
            date: days,
          },
        },
        {
          $sort: {
            _id: -1,
          },
        },
      ]);
      console.log(slot, doctorId, days);
      if (slot) {
        return res.send({ slot: slot });
      } else {
        return res.status(404).json({ error: "slot didn't exist" });
      }
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: "Something went wrong" });
    }
  }
}

const consultationController = new Consultation();
module.exports = consultationController;
