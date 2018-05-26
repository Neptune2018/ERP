var express = require('express');
var test = require('./api/testapi');
var threshold_warning = require('./api/threshold_warning_api');
var router = express.Router();

router.get('/test', test.testapi)
router.get('/threshold_warning', threshold_warning.ThresholdWarning)

module.exports = router;
