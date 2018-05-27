var express = require('express');
var test = require('./api/testapi');
var userInfor = require('./api/userInfor');
var user = require('./api/user');
var router = express.Router();

router.get('/test', test.testapi);
router.get('/userInfor', userInfor.showUser);
router.get('/updateUser', userInfor.updateUser);
router.get('/changePass', userInfor.changePass);
router.post('/signin', user.signin);

module.exports = router;