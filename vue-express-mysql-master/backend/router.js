var express = require('express');
var test = require('./api/testapi');
var purchase = require('./api/purchaseapi');
var router = express.Router();

router.get('/test', test.testapi)

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