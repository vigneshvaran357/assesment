const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    profileimage: {
      type: String,
    },
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
    userRole: {
      type: Number,
      default: 0,
      required: true,
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
    dateofbirth: {
      type: String,
      default: null,
    },
    pincode: {
      type: Number,
    },
    age: {
      type: Number,
    },
    profilestatus: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const patientModel = mongoose.model("patients", patientSchema);
module.exports = patientModel;
