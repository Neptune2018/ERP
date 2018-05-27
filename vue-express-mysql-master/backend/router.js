var express = require('express');
var test = require('./api/testapi');

var getgroup=require('./api/getgroupapi');

var router = express.Router();

router.get('/test', test.testapi)

router.get('/getgrouponloadapi', getgroup.onloadapi)
router.get('/getsinglegrouponloadapi', getgroup.singleonloadapi)
router.post('/searchuserapi', getgroup.searchuserapi)

module.exports = router;