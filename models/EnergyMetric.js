const mongoose = require("mongoose");

const EnergyMetricSchema = new mongoose.Schema({
  voltage: {
    type: String,
    required: true,
  },

  current: {
    type: String,
    required: true,
  },

  power: {
    type: String,
    required: true,
  },
  Date: {
    type:Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Data", EnergyMetricSchema);
