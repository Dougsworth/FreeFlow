var express = require('express');
const EnergyMetric = require('../models/EnergyMetric');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  const metrics = await EnergyMetric.find()
  console.log(metrics)//yh
  res.render('index', { title: 'Express', metrics });
});

module.exports = router;

