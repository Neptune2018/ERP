var config = require('../config');
var fs = require('fs');
var path = require('path');
var Test = require('../proxy').Test;
var Product = require('../proxy').Product;
var url = require('url');

exports.findProductQuan = function(req,res) {
    console.log(req.session.sess)
	req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    Product.findProductQuan(params.productId,function(result){
        if(result.data.length==0){
            results = {
                remain: 0
            }
            res.send(results);
        }
        else {
            var remain = 0;
            for(var j=0;j<result.data.length;j++){
                remain += result.data[j].remain
            }
            results = {
                remain: remain
            }
            res.send(results);
        }
    })
}

exports.productapi = function(req, res) {
	console.log(req.session.sess)
	req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    Product.addOrderList(params.user,params.buyer,params.phone,params.email,params.remark,function(result){
        var orderListNum = result.data.dataValues.id;
        Product.findBuy(orderListNum,function(result){
            var tempList = [];
            for(var i=0;i<result.count;i++){
                tempList.push(result.data[i].dataValues);
            }
            results = {
                data: tempList,
                orderListNum: orderListNum
            }
            res.send(results);
        });
    })
}

exports.findAllProduct = function(req, res) {
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var productId = 0;
    Product.findAllProduct(productId,function(result){
        var addProductNoList = [];
        var addProductNameList = [];
        for(var i=0;i<result.count;i++){
            addProductNoList.push({
                value: result.data[i].dataValues.id,
                label: result.data[i].dataValues.id
            });
            addProductNameList.push({
                value: result.data[i].dataValues.name,
                label: result.data[i].dataValues.name
            });
        }
        results = {
            addProductNoList: addProductNoList,
            addProductNameList: addProductNameList
        }
        res.send(results);
    })
}

exports.confirmOrderList = function(req,res) {
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    var materials = JSON.parse(params.materials);
    results = [];
    var productEnough = true;
    Product.confirmOrderList(materials.mater,function(result){
        for(var i=0;i<materials.length;i++){
            var remain = 0;
            for(var j=0;j<result[i].data.length;j++){
                remain += result[i].data[j].remain
            }
            if(remain>=materials[i].mater_list_quantity){
                results.push({
                    isEnough: true
                })
            }
            else {
                productEnough = false;
                results.push({
                    isEnough: false
                })
            }
        }
        if(!productEnough){
            Product.updateOrderState(params.orderList);
        }
        theResults={
            materEnough: results,
            productEnough: productEnough
        }
        res.send(theResults);
    })
}

exports.addGetList = function(req,res) {
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    Product.addGetList(params.orderListId, function(result){
        var getListId = result.data.dataValues.id;
        var materials = JSON.parse(params.materials);
        for(var i=0;i<params.count;i++){
            Product.addGet(materials.mater[i].mater_list_number,materials.mater[i].mater_list_quantity,getListId);
        }
        for(var i=0;i<params.count;i++){
            Product.addOccupancy(materials.mater[i].mater_list_number,materials.mater[i].mater_list_quantity);
        }
        res.send();
    })
}

exports.deleteProduct = function(req,res) {
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    Product.destroy(params.productId,params.orderListId);
    res.send();
}

exports.addBuy = function(req,res) {
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    Product.addBuy(params.quantity, params.productId, params.orderListId,function(result){
        var productId = result.data.dataValues.productId;
        var productNum = result.data.dataValues.quantity;
        Product.findAllProduct(productId,function(result){
            var tempProductList = [];
            for(var i=0;i<result.count;i++){
                tempProductList.push(result.data[i].dataValues);
            }
            Product.findConsists(productId,function(result){
                var tempConsistList = [];
                for(var i=0;i<result.count;i++){
                    tempConsistList.push({
                        materId:result.data[i].dataValues.materialId,
                        materNum:result.data[i].dataValues.quantity
                    });
                }
                Product.findAllMater(tempConsistList,function(result){
                    var materInfoList = [];
                    for(var i=0;i<result.length;i++){
                        materInfoList.push(result[i].data[0].dataValues);
                    }
                    results = {
                        data: tempProductList,
                        quantity: productNum,
                        consistList: tempConsistList,
                        materInfoList: materInfoList
                    }                  
                    res.send(results);
                });
            });
        });
    });
}


