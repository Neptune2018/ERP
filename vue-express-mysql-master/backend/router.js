var express = require('express');
var test = require('./api/testapi');
var purchase = require('./api/purchaseapi');
var router = express.Router();

router.get('/test', test.testapi)

router.post('/addSupplier',purchase.addSupplier);
router.get('/getSupplier',purchase.getSupplier);
router.post('/getSupplierByName',purchase.getSupplierByName);
router.post('/getSupplierById',purchase.getSupplierById);
router.post('/deleteSupplierByName',purchase.deleteSupplierByName);
router.post('/updateSupplierByName',purchase.updateSupplierByName);
router.post('/deleteSupplierById',purchase.deleteSupplierById);
router.post('/updateSupplierById',purchase.updateSupplierById);

router.get('/getOfferList',purchase.getOfferList);
router.get('/getOfferListById',purchase.getOfferListById);
router.get('/getOfferListBySupplier',purchase.getOfferListBySupplier);
router.get('/addOfferList',purchase.addOfferList);
router.get('/updateOfferList',purchase.updateOfferList);
router.get('/deleteOfferList',purchase.deleteOfferList);
router.get('/setMinOrder',purchase.setMinOrder);

router.get('/getMaterials',purchase.getMaterials);
router.get('/getMaterialsBySupplier',purchase.getMaterialsBySupplier);
router.post('/setSafeQuantity',purchase.setSafeQuantity);
router.get('/getStarve',purchase.getStarve);


module.exports = router;