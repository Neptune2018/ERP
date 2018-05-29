var config = require('../config');
var fs = require('fs');
var path = require('path');
var Product_cate = require('../proxy').Product_cate;
var url = require('url');

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
	Product_cate.listallProduct_cates(function(data) {
		res.send(data)
	})
}

//列出指定父分类下的所有子分类,参数:materCateId，返回同上
exports.listallProduct_catesbyProductCatename = function(req, res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    Product_cate.listallProduct_catesbyProduct_catename(params.name,function(data) {
		res.send(data)
	});
}


//列出指定父分类下的所有物料,参数:materCateId，返回（物料的）(id,name,property)编号名称状态属性
exports.listallProductbyProductCatename = function(req, res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    console.log(params.name.toString)
    Product_cate.listallProductbyProduct_catename(params.name,function(data) {
		res.send(data)
	});
}


//删除，参数id，注意返回的是listallProduct_cates也就是查找函数的结果，不是成功失败
//只能删除目前的分类，并不能连带所有子分类一起删，之后再改
exports.deleteProduct_cateById = function(req, res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    Product_cate.deleteProduct_cateById(params.id,function(data){
        Product_cate.listallProduct_cates(function(data) {
            res.send(data)
        });
    });
}

//修改，需要参数(id,name,productCateId),其中按id确定是哪个。返回修改后的结果
exports.updateProduct_cateByid = function(req,res){
    console.log(req.session.sess);
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    Product_cate.updateProduct_cateByid(params.id,params.name,params.productCateId,function(){
        Product_cate.listallProduct_cate(function(data) {
            res.send(data)
        });
    });
}
