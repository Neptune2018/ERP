var express = require('express');
var test = require('./api/testapi');
var threshold_warning = require('./api/threshold_warning_api');
var router = express.Router();
var stocks = require('./api/stocksapi');
var stations = require('./api/stationsapi');
var iorecord = require('./api/iorecordapi');
router.get('/test', test.testapi)
router.get('/threshold_warning', threshold_warning.ThresholdWarning)
router.get('/stocks', stocks.Stocks)
router.get('/stations', stations.Stations)
router.get('/iorecord', iorecord.IORecord)
module.exports = router;
