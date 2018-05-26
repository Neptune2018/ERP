var express = require('express');
var test = require('./api/testapi');
var costmoduleonload = require('./api/costmoduleonloadapi');
var cmproductquery = require('./api/cmproductqueryapi')

var router = express.Router();

router.get('/test', test.testapi)
router.get('/costmoduleonload', costmoduleonload.onloadapi)
router.get('/cmproductquery', cmproductquery.searchapi)


module.exports = router;