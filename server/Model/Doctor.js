const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      index: { unique: true },
      match: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    },
    password: {
      type: String,
      required: true,
    },
    cPassword: {
      type: String,
      required: true,
    },
    userRole: {
      type: Number,
      default: 1,
    },
    phoneNumber: {
      type: Number,
      required: true,
      trim: true,
      index: { unique: true },
      match: /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/,
    },
    gender: {
      type: String,
    },

    profileimage: {
      type: String,
    },
    profession: {
      type: String,
      // required: true,
    },

    clinicdetails: {
      type: String,
    },

    qualification: {
      type: String,
    },
    experience: {
      type: String,
    },
    language: {
      type: String,
    },
    fees: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const doctorModel = mongoose.model("doctors", doctorSchema);
module.exports = doctorModel;
