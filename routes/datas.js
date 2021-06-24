const express = require('express');
const EnergyMetric = require('../models/EnergyMetric');

const router = express.Router();

/* GET users listing. */
router.post('/', async function(req, res, next) {
  let current = req.body.current;
  let voltage = req.body.voltage;

  let power = req.body.power;

  const newdata = new EnergyMetric({
    current: current,
    voltage: voltage,
    power: power,
  });

  try {
    await newdata.save();
    res.json(newdata);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
