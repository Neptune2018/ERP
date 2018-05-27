var config = require('../config');
var fs = require('fs');
var path = require('path');
var BOM_product = require('../proxy').BOM_product;


//添加，参数:（id,name,price,remark,materCateId）物料编号名称价格备注和类别名，会返回listallBOM_product（下面函数）的查找结果而非成功失败
exports.addBOM_product = function(req, res) {
	console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    BOM_product.addBOM_product(params.id,params.name,params.price,params.remark,params.materCateId,function(data){
        BOM_product.listallBOM_product(function(data) {
            res.send(data)
        });
    });
}

//查询所有。不需要参数，返回(id,name,price,remark)编号，姓名，价格，备注
exports.listallBOM_product = function(req, res) {
	console.log(req.session.sess)
	req.session.sess = 'yes';
	BOM_product.listallBOM_product(function(data) {
		res.send(data)
	})
}

//根据编号查询。参数Id,返回同上
exports.listallBOM_productbyID = function(req, res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    BOM_product.listallBOM_productbyID(params.Id,function(data) {
		res.send(data)
	});
}

//根据名称查询。参数name,返回同上
exports.listallBOM_productbyname = function(req, res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    BOM_product.listallBOM_productbyname(params.name,function(data) {
		res.send(data)
	});
}

