var config = require('../config');
var fs = require('fs');
var path = require('path');
var BOM_mater = require('../proxy').BOM_mater;
var url = require('url');


//添加，参数:（id,name,property,materCateId）物料编号名称属性和类别名，会返回listallBOM_mater（下面函数）的查找结果而非成功失败
exports.addBOM_mater = function(req, res) {
	console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    BOM_mater.addBOM_mater(params.id,params.name,params.property,params.materCateId,function(data){
        BOM_mater.listallBOM_mater(function(data) {
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

exports.queryBOM_mater = function(req, res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    if (params.Id){
        if (params.name){
            BOM_mater.listallBOM_materbyIdname(params.Id,params.name,function(data) {
                res.send(data)
            });
            
        }
        else{
            BOM_mater.listallBOM_materbyID(params.Id,function(data) {
                res.send(data)
            });
        }
    }
    else{
        if (params.name){
            BOM_mater.listallBOM_materbyname(params.name,function(data) {
                res.send(data)
            });
        }
        else{
            res.send(null)
        }
    }

    
}

//删除，参数id，注意返回的是listallBOM_mater也就是查找函数的结果，不是成功失败
exports.deleteBOM_materById = function(req, res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    BOM_mater.deleteBOM_materById(params.id,function(data){
        BOM_mater.listallBOM_mater(function(data) {
            res.send(data)
        });
    });
}


//修改，需要参数(id,name,property,materCateId),其中按id确定是哪个。返回修改后的结果
exports.updateBOM_materByid = function(req,res){
    console.log(req.session.sess);
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    BOM_mater.updateBOM_materById(params.id,params.status,params.name,params.property,params.materCateId,function(){
        BOM_mater.listallBOM_mater(function(data) {
            res.send(data)
        });
    });
}


//返回：productid,quantity,materialid,name,price,remark,materCateId
exports.findproducts = function(req, res) {
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    BOM_mater.findproducts(params.id,function(data) {
        console.log(data);
        res.send(JSON.stringify(data))
    })
}
