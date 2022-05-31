const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const doctorslotSchema = new mongoose.Schema(
  {
    doctorId: {
      type: ObjectId,
      ref: "doctors",
      required: true,
    },
    daytype: {
      type: String,
    },
    date: {
      type: String,
    },
    intime: {
      type: String,
    },
    outtime: {
      type: String,
    },
    fromtime: {
      type: String,
    },
    endtime: {
      type: String,
    },
    slotstatus: {
      type: String,
      default: "notbooked",
      enum: ["booked", "notbooked"],
    },
  },
  { timestamps: true }
);

const doctorslotModel = mongoose.model("doctorslot", doctorslotSchema);
module.exports = doctorslotModel;
