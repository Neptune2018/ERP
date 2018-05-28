var express = require('express');
var test = require('./api/testapi');
<<<<<<< HEAD
var costmoduleonload = require('./api/costmoduleonloadapi');
var costmoduleonloadmtr = require('./api/costmoduleonloadmtrapi');
var cmproductquery = require('./api/cmproductqueryapi')
var cmmaterialquery = require('./api/cmmaterialqueryapi')

var router = express.Router();

router.get('/test', test.testapi)
router.get('/costmoduleonload', costmoduleonload.onloadapi)
router.get('/costmoduleonloadmtr', costmoduleonloadmtr.onloadapi)
router.get('/cmproductquery', cmproductquery.searchapi)
router.get('/cmmaterialquery', cmmaterialquery.searchapi)

=======

var getgroup=require('./api/getgroupapi');

var userInfor = require('./api/userInfor');
var user = require('./api/user');
var router = express.Router();

router.get('/test', test.testapi);
router.get('/userInfor', userInfor.showUser);
router.get('/updateUser', userInfor.updateUser);
router.get('/changePass', userInfor.changePass);
router.post('/signin', user.signin);

router.get('/getgrouponloadapi', getgroup.onloadapi)
router.get('/getsinglegrouponloadapi', getgroup.singleonloadapi)
router.post('/searchuserapi', getgroup.searchuserapi)
>>>>>>> 2d8ab54777be5febe758576119ad54d748645278

module.exports = router;