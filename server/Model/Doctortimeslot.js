const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const doctortimeslotSchema = new mongoose.Schema(
  {
    doctorId: {
      type: ObjectId,
      ref: "doctors",
      required: true,
    },
    day: {
      type: String,
    },
    slot1: {
      type: Boolean,
      default: false,
    },
    slot2: {
      type: Boolean,
      default: false,
    },
    slot3: {
      type: Boolean,
      default: false,
    },
    slot4: {
      type: Boolean,
      default: false,
    },
    slot5: {
      type: Boolean,
      default: false,
    },
    slot6: {
      type: Boolean,
      default: false,
    },

    slot7: {
      type: Boolean,
      default: false,
    },
    slot8: {
      type: Boolean,
      default: false,
    },
    slot9: {
      type: Boolean,
      default: false,
    },

    slot10: {
      type: Boolean,
      default: false,
    },
    slot11: {
      type: Boolean,
      default: false,
    },
    slot12: {
      type: Boolean,
      default: false,
    },
    time: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const doctortimeslotModel = mongoose.model(
  "doctortimeslot",
  doctortimeslotSchema
);
module.exports = doctortimeslotModel;
