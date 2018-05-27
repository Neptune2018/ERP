var config = require('../config');
var fs = require('fs');
var path = require('path');
var Mater_cate = require('../proxy').Mater_cate;



//添加，需要两个参数：(name,materCateId)名称和父类别名称，父类别名称可以为空。注意返回的是listallMater_cates也就是下一个函数的结果，不是成功失败
exports.addMater_cate = function(req, res) {
	console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    Mater_cate.addMater_cate(params.name,params.materCateId,function(data){
        Mater_cate.listallMater_cates(function(data) {
            res.send(data)
        });
    });
}

//查找没有父类的物料分类,也就是最高层分类，不需要参数，返回(id,name,createdAt,updatedAt,materCateId)编号名称创建修改时间父分类id
exports.listallMater_cates = function(req, res) {
	console.log(req.session.sess)
	req.session.sess = 'yes';
	Mater_cate.listallMater_cates(function(data) {
		res.send(data)
	})
}


//列出指定父分类下的所有子分类,参数:materCateId，返回同上
exports.listallMater_catesbyMaterCateID = function(req, res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    Mater_cate.listallMater_catesbyfather(params.materCateId,function(data) {
		res.send(data)
	});
}


//列出指定父分类下的所有物料,参数:materCateId，返回（物料的）(id,name,property)编号名称状态属性
exports.listallMaterbyMaterCateID = function(req, res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    Mater_cate.listallMaterbyMaterCateID(params.materCateId,function(data) {
		res.send(data)
	});
}


//删除，参数id，注意返回的是listallProduct_cates也就是查找函数的结果，不是成功失败
//只能删除目前的分类，并不能连带所有子分类一起删，之后再改
exports.deleteMater_cateById = function(req, res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    Mater_cate.deleteMater_cateById(params.id,function(data){
        Mater_cate.listallMater_cates(function(data) {
            res.send(data)
        });
    });
}


//修改，需要参数(id,name,materCateId),其中按id确定是哪个。返回修改后的结果
exports.updateMater_cateById = function(req,res){
    console.log(req.session.sess);
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    Mater_cate.updateMater_cateById(params.id,params.name,params.materCateId,function(){
        Mater_cate.listallMater_catesbyMaterCateID(params.id,function(data) {
            res.send(data)
        });
    });
}