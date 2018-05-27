var express = require('express');
var test = require('./api/testapi');

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

module.exports = router;