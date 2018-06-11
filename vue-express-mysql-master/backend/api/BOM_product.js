var config = require('../config');
var fs = require('fs');
var path = require('path');
var BOM_product = require('../proxy').BOM_product;
var url = require('url');


//添加，参数:（id,name,price,remark,materCateId）物料编号名称价格备注和类别名，会返回listallBOM_product（下面函数）的查找结果而非成功失败
exports.addBOM_product = function(req, res) {
	console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    BOM_product.addBOM_product(params.id,params.name,params.price,params.remark,params.productCateId,function(data){
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
        console.log(data);
		res.send(data)
	})
}

//根据编号查询。参数Id,返回同上
exports.queryBOM_product = function(req, res){
    
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    console.log("ID:"+params.Id+"NAME:"+params.name)
    if (params.Id.length == 0){
        if (params.name.length == 0){
            res.send(null)
        }
        else{
            BOM_product.listallBOM_productbyname(params.name,function(data) {
                res.send(data)
            });
        }
    }
    else{
        if (params.name.length == 0){
            BOM_product.listallBOM_productbyId(params.Id,function(data) {
                res.send(data)
            });
        }
        else{
            BOM_product.listallBOM_productbyIdname(params.Id,params.name,function(data) {
                res.send(data)
            });
        }
    }    
}

//删除，参数id，注意返回的是listallBOM_product也就是查找函数的结果，不是成功失败
exports.deleteBOM_productById = function(req, res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    BOM_product.deleteBOM_productById(params.id,function(data){
        BOM_product.listallBOM_product(function(data) {
            res.send(data)
        });
    });
}

//修改，需要参数(id,name,price,remark,productCateId),其中按id确定是哪个。返回修改后的结果

exports.updateBOM_productByid = function(req,res){
    console.log(req.session.sess);
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    BOM_product.updateBOM_productById(params.id,params.status,params.name,params.price,params.remark,params.productCateId,function(){
        BOM_product.listallBOM_product(function(data) {
            res.send(data)
        });
    });
}


//返回：productid,quantity,materialid,name,property,materCateId
exports.findmaterials = function(req, res) {
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    BOM_product.findmaterials(params.id,function(data) {
        console.log(data);
        res.send(data)
    })
}