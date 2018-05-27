var config = require('../config');
var fs = require('fs');
var path = require('path');
var Mater_cate = require('../proxy').Mater_cate;

//列出所有物料分类，当然只列出根类，不会列出子类
exports.listallMater_cates = function(req, res) {
	console.log(req.session.sess)
	req.session.sess = 'yes';
	Mater_cate.listallMater_cates(function(data) {
		res.send(data)
	})
}


//列出该父类下的所有物料分类
exports.listallMater_catesbyfather = function(req, res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    Mater_cate = Mater_cate.listallMater_catesbyfather(params.materCateId,function(data) {
		res.send(data)
	});
}

