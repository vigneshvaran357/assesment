const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const consultationSchema = new mongoose.Schema(
  {
    patientId: {
      type: ObjectId,
      ref: "patients",
      required: true,
    },
    doctorId: {
      type: ObjectId,
      ref: "doctors",
      required: true,
    },

    slotId: {
      type: ObjectId,
      ref: "doctorslots",
      required: true,
    },

    date: {
      type: String,
    },

    reason: {
      type: String,
    },
    bookingdatetime: {
      type: String,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "accepted", "compeleted", "cancelled"],
    },
  },
  { timestamps: true }
);

const consultationModel = mongoose.model("consultation", consultationSchema);
module.exports = consultationModel;
