var express = require('express');
var test = require('./api/testapi');


var Mater_cate = require('./api/mater_cate');//物料分类的api文件
var Product_cate = require('./api/product_cate');//货品分类的api文件
var BOM_mater = require('./api/BOM_mater');//物料管理的api文件
var BOM_product = require('./api/BOM_product');//货品管理的api文件


var router = express.Router();

router.get('/test2', Mater_cate.listallMater_cates)
router.get('/getProducts',BOM_product.listallBOM_product)
router.get('/getProductcates',Product_cate.listallProduct_cates)
router.get('/productSearch',BOM_product.queryBOM_product)
router.get('/cateProduct',Product_cate.listallProductbyProductCatename)
router.get('/addProduct',BOM_product.addBOM_product)
router.get('/modifyProduct',BOM_product.updateBOM_productByid)
router.get('/deleteProduct',BOM_product.deleteBOM_productById)
router.get('/getMaterial',BOM_mater.listallBOM_mater)
router.get('/materialSearch',BOM_mater.queryBOM_mater)
router.get('/addMaterial',BOM_mater.addBOM_mater)
router.get('/modifyMaterial',BOM_mater.updateBOM_materByid)
router.get('/deleteMaterial',BOM_mater.deleteBOM_materById)
//要引用哪个文件的api就用文件名.api函数名即可，一共4个api文件如上
//api还在绝赞扩充中
//此时打开浏览器，输入http://localhost:8070/test2应该会得到listallMater_cates()的结果，当然数据库是空的就会返回空值
var costmoduleonload = require('./api/costmoduleonloadapi');
var costmoduleonloadmtr = require('./api/costmoduleonloadmtrapi');
var cmproductquery = require('./api/cmproductqueryapi')
var cmmaterialquery = require('./api/cmmaterialqueryapi')

var purchase = require('./api/purchaseapi');

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