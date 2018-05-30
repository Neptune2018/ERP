var express = require('express');
var test = require('./api/testapi');
var costmoduleonload = require('./api/costmoduleonloadapi');
var costmoduleonloadmtr = require('./api/costmoduleonloadmtrapi');
var cmproductquery = require('./api/cmproductqueryapi')
var cmmaterialquery = require('./api/cmmaterialqueryapi')

var purchase = require('./api/purchaseapi');
var threshold_warning = require('./api/threshold_warning_api');
var io_events = require('./api/ioapi')
var router = express.Router();
var stocks = require('./api/stocksapi');
var stations = require('./api/stationsapi');
var iorecord = require('./api/iorecordapi');
router.get('/test', test.testapi)
router.get('/costmoduleonload', costmoduleonload.onloadapi)
router.get('/costmoduleonloadmtr', costmoduleonloadmtr.onloadapi)
router.get('/cmproductquery', cmproductquery.searchapi)
router.get('/cmmaterialquery', cmmaterialquery.searchapi)


var getgroup=require('./api/getgroupapi');

var userInfor = require('./api/userInfor');
var user = require('./api/user');



router.get('/userInfor', userInfor.showUser);
router.get('/updateUser', userInfor.updateUser);
router.get('/changePass', userInfor.changePass);
router.post('/signin', user.signin);

router.get('/getgrouponloadapi', getgroup.onloadapi)
router.get('/getsinglegrouponloadapi', getgroup.singleonloadapi)
router.post('/searchuserapi', getgroup.searchuserapi)
var product = require('./api/productapi');


router.get('/product', product.productapi);
router.get('/findAllProduct', product.findAllProduct);
router.get('/addBuy', product.addBuy);
router.get('/deleteProduct', product.deleteProduct);
router.get('/addGetList', product.addGetList);
router.get('/confirmOrderList', product.confirmOrderList);
router.get('/findProductQuan', product.findProductQuan);


router.get('/addSupplier',purchase.addSupplier);
router.get('/getSupplier',purchase.getSupplier);
router.get('/getSupplierByName',purchase.getSupplierByName);
router.get('/getSupplierById',purchase.getSupplierById);
router.get('/deleteSupplierByName',purchase.deleteSupplierByName);
router.get('/updateSupplierByName',purchase.updateSupplierByName);
router.get('/deleteSupplierById',purchase.deleteSupplierById);
router.get('/updateSupplierById',purchase.updateSupplierById);

router.get('/getOfferList',purchase.getOfferList);
router.get('/getOfferListById',purchase.getOfferListById);
router.get('/getOfferListBySupplier',purchase.getOfferListBySupplier);
router.get('/addOfferList',purchase.addOfferList);
router.get('/updateOfferList',purchase.updateOfferList);
router.get('/deleteOfferList',purchase.deleteOfferList);
router.get('/setMinOrder',purchase.setMinOrder);

router.get('/getMaterials',purchase.getMaterials);
router.get('/getAllMaterials',purchase.getAllMaterials);
router.get('/getMaterialsBySupplier',purchase.getMaterialsBySupplier);
router.get('/setSafeQuantity',purchase.setSafeQuantity);
router.get('/getStarve',purchase.getStarve);
router.get('/getAllStarve',purchase.getAllStarve);


module.exports = router;
router.get('/threshold_warning', threshold_warning.ThresholdWarning)
router.get('/getRepertory',io_events.getRepertory)
router.post('/stockAvail',io_events.stockAvail)
router.post('/placeAvail',io_events.placeAvail)
router.post('/wareAvail',io_events.wareAvail)
router.post('/insertWare',io_events.insertIO)
router.get('/stocks', stocks.Stocks)
router.get('/stations', stations.Stations)
router.get('/iorecord', iorecord.IORecord)
module.exports = router;
