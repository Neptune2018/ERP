var express = require('express');
var test = require('./api/testapi');
var userInfor = require('./api/userInfor');
var router = express.Router();

router.get('/test', test.testapi);
router.get('/userInfor', userInfor.showUser);
router.get('/updateUser', userInfor.updateUser);
router.get('/changePass', userInfor.changePass);

module.exports = router;