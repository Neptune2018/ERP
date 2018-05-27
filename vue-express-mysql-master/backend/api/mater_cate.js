var config = require('../config');
var fs = require('fs');
var path = require('path');
var Mater_cate = require('../proxy').Mater_cate;

//列出所有物料分类，当然只列出顶级分类，不会列出子类
exports.listallMater_cates = function(req, res) {
	console.log(req.session.sess)
	req.session.sess = 'yes';
	Mater_cate.listallMater_cates(function(data) {
		res.send(data)
	})
}

//列出指定父分类下的所有子分类
exports.listallMater_catesbyMaterCateID = function(req, res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    Mater_cate = Mater_cate.listallMater_catesbyfather(params.materCateId,function(data) {
		res.send(data)
	});
}

//列出指定父分类下的所有物料
exports.listallMaterbyMaterCateID = function(req, res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    Mater_cate = Mater_cate.listallMaterbyMaterCateID(params.materCateId,function(data) {
		res.send(data)
	});
}

