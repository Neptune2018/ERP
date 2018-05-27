var config = require('../config');
var fs = require('fs');
var path = require('path');
var Product_cate = require('../proxy').Product_cate;

//添加，需要两个参数：(name,productCateId)名称和父类别名称，父类别名称可以为空。注意返回的是listallProduct_cates也就是下一个函数的结果，不是成功失败
exports.addProduct_cate = function(req, res) {
	console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    Product_cate.addProduct_cate(params.name,params.productCateId,function(data){
        Mater_cate.listallProduct_cates(function(data) {
            res.send(data)
        });
    });
}

//查找没有父类的分类,也就是最高层分类，不需要参数，返回(id,name,createdAt,updatedAt,materCateId)编号名称创建修改时间父分类id
exports.listallProduct_cates = function(req, res) {
	console.log(req.session.sess)
	req.session.sess = 'yes';
	Mater_cate.listallProduct_cates(function(data) {
		res.send(data)
	})
}

//列出指定父分类下的所有子分类,参数:productCateId，返回同上
exports.listallBOM_productbyID = function(req, res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    Product_cate.listallProduct_catesbyfather(params.productCateId,function(data) {
		res.send(data)
	});
}


//列出指定父分类下的所有货品,参数:productCateId，返回（货品的）(id,name,price,remark)编号名称价格备注
exports.listallProductbyProductCateID = function(req, res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    Product_cate.listallProductbyProductCateID(params.productCateId,function(data) {

		res.send(data)
	});
}

