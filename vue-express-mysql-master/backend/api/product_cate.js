var config = require('../config');
var fs = require('fs');
var path = require('path');
var Product_cate = require('../proxy').Product_cate;

//查找没有父类的物料分类,也就是最高层分类
exports.listallProduct_cates = function(req, res) {
	console.log(req.session.sess)
	req.session.sess = 'yes';
	Mater_cate.listallProduct_cates(function(data) {
		res.send(data)
	})
}

//列出指定父分类下的所有子分类
exports.listallProduct_catesbyProductCateID = function(req, res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    Product_cate = Product_cate.listallProduct_catesbyfather(params.productCateId,function(data) {
		res.send(data)
	});
}

//列出指定父分类下的所有物料
exports.listallProductbyProductCateID = function(req, res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    Product_cate = Product_cate.listallProductbyProductCateID(params.productCateId,function(data) {
		res.send(data)
	});
}

