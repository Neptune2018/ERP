var express = require('express');
var test = require('./api/testapi');
var mater_cate = require('./api/mater_cate');
var BOM_mater = require('./api/BOM_mater');
var router = express.Router();

router.get('/test', test.testapi)
router.get('/bom', mater_cate.listallMater_cates)

module.exports = router;