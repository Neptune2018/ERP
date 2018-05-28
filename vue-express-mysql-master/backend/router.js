var express = require('express');
var test = require('./api/testapi');
var product = require('./api/productapi');
var router = express.Router();

router.get('/test', test.testapi);
router.get('/product', product.productapi);
router.get('/findAllProduct', product.findAllProduct);
router.get('/addBuy', product.addBuy);
router.get('/deleteProduct', product.deleteProduct);
router.get('/addGetList', product.addGetList);
router.get('/confirmOrderList', product.confirmOrderList);
router.get('/findProductQuan', product.findProductQuan);


module.exports = router;