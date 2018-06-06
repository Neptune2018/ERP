var express = require('express');
var test = require('./api/testapi');


var router = express.Router();


//要引用哪个文件的api就用文件名.api函数名即可，一共4个api文件如上
//api还在绝赞扩充中
//此时打开浏览器，输入http://localhost:8070/test2应该会得到listallMater_cates()的结果，当然数据库是空的就会返回空值
var costmoduleonload = require('./api/costmoduleonloadapi');
var costmoduleonloadmtr = require('./api/costmoduleonloadmtrapi');
var cmproductquery = require('./api/cmproductqueryapi')
var cmmaterialquery = require('./api/cmmaterialqueryapi')
var supplier = require('./api/supplierapi');
var offerlist = require('./api/offerlistapi');
var offer = require('./api/offerapi');
var purchase = require('./api/purchaseapi');
var router = express.Router();

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

router.get('/getAllUserIdAndName',supplier.getAllUserIdAndName);
router.get('/addSupplier',supplier.addSupplier);
router.get('/getSupplier',supplier.getSupplier);
router.get('/getSupplierById',supplier.getSupplierById);
router.get('/deleteSupplierById',supplier.deleteSupplierById);
router.get('/updateSupplierById',supplier.updateSupplierById);
router.get('/setMinOrder',supplier.setMinOrder);
router.get('/addMaterialsToSupplier',supplier.addMaterialsToSupplier);
router.get('/removeMaterialsFromSupplier',supplier.removeMaterialsFromSupplier);

router.get('/getOfferByOfferList',offer.getOfferByOfferList);
router.get('/deleteOffer',offer.deleteOffer);
router.get('/addOffer',offer.addOffer);
router.get('/updateOffer',offer.updateOffer);


router.get('/getOfferList',offerlist.getOfferList);
router.get('/getOfferListById',offerlist.getOfferListById);
router.get('/getOfferListBySupplier',offerlist.getOfferListBySupplier);
router.get('/addOfferList',offerlist.addOfferList);
router.get('/updateOfferList',offerlist.updateOfferList);
router.get('/deleteOfferList',offerlist.deleteOfferList);

router.get('/getMaterials',purchase.getMaterials);
router.get('/getAllMaterialsId',purchase.getAllMaterialsId);
router.get('/getAllMaterials',purchase.getAllMaterials);
router.get('/getMaterialsBySupplier',purchase.getMaterialsBySupplier);
router.get('/setSafeQuantity',purchase.setSafeQuantity);
router.get('/getStarve',purchase.getStarve);
router.get('/getAllStarve',purchase.getAllStarve);


module.exports = router;

