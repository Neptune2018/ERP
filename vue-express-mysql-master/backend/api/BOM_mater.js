var config = require('../config');
var fs = require('fs');
var path = require('path');
var BOM_mater = require('../proxy').BOM_mater;


//添加，参数:（id,name,property,materCateId）物料编号名称属性和类别名，会返回listallBOM_mater（下面函数）的查找结果而非成功失败
exports.addBOM_mater = function(req, res) {
	console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    BOM_mater.addBOM_mater(params.id,params.name,params.property,params.materCateId,function(data){
        Mater_cate.listallBOM_mater(function(data) {
            res.send(data)
        });
    });
}

//查询所有。不需要参数，返回(id,name,property)编号，姓名，属性
exports.listallBOM_mater = function(req, res) {
	console.log(req.session.sess)
	req.session.sess = 'yes';
	BOM_mater.listallBOM_mater(function(data) {
		res.send(data)
	})
}

//根据编号查询。参数Id,返回同上
exports.listallBOM_productbyID = function(req, res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    BOM_mater.listallBOM_materbyID(params.Id,function(data) {
		res.send(data)
	});
}

//根据名称查询。参数name,返回同上
exports.listallBOM_materbyname = function(req, res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    BOM_mater.listallBOM_materbyname(params.name,function(data) {
		res.send(data)
	});
}

