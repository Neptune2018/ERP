var Buy = require('../models').Buy;
var Product = require('../models').Product
var  OrderList = require('../models').OrderList
var  Consist = require('../models').Consist
var  Material = require('../models').Material
var  GetList = require('../models').GetList
var  Get = require('../models').Get
var Stock = require('../models').Stock;

//添加领料
exports.addGet = function(mater_list_number,mater_list_quantity,getListId) {
    Get.create({
        quantity: mater_list_quantity,
        getListId: getListId,
        materialId: mater_list_number
    })
}

//添加领料单表
exports.addGetList = function (orderListId,callback) {
    GetList.create({
        orderListId: orderListId
    }).then(function(result){
        results = {
            data: result
        }
        callback(results)
    });
};

//删除Buys列表
exports.destroy = function (productId,orderListId) {
    Buy.destroy({
        where: {
            productId: productId,
            orderListId:orderListId
        }
    })
}

//查询product库存
exports.findProductQuan = function(id,callback){
    Stock.findAll({
        where:{
            productId: id
        }
    }).then(function(result){
        results = {
            data: result
        }
        callback(results)
    })
}

//确认是否缺料
exports.confirmOrderList = function (mater,callback) {
    results = [];
    for(var i=0;i<mater.length;i++){
        if(i<mater.length-1) {
            Stock.findAll({
                where: {materialId:mater.mater_list_number}
            }).then(function(result){
                results.push({
                    data:result
                })
            })
        }
        else {
            Stock.findAll({
                where: {materialId:mater.mater_list_number}
            }).then(function(result){
                results.push({
                    data:result
                })
                callback(results)
            })
        }
    }
}

exports.addOccupancy = function(id,quantity) {
    return Stock.findAll({
        where:{
            materialId: id
        }
    }).then(function(result){
        Stock.update({
            remain: result[0].dataValues.remain-quantity,
            occupancy: quantity
        },{
            where: {
                materialId: id
            }
        });
    })
}

exports.updateOrderState = function(orderListId) {
    return OrderList.update({
        status: 'notEnough'
      }, {
        where: {
          id: orderListId
        }
      });
}

//寻找所有原料具体信息
exports.findAllMater = function (tempConsistList,callback) {
    results = [];
    for(var i=0;i<tempConsistList.length;i++){
        if(i<tempConsistList.length-1){
            Material.findAll({
                where: {id:tempConsistList[i].materId}
            }).then(function(result){
                results.push({
                    data:result
                })
            })
        }
        else {
            Material.findAll({
                where: {id:tempConsistList[i].materId}
            }).then(function(result){
                results.push({
                    data:result
                })
                callback(results)
            })
        }
    }
}

//寻找所有配料id
exports.findConsists = function (productId,callback) {
    Consist.findAll({
        where:{productId: productId}
    }).then(function(result){
        results = {
            data: result,
            count: result.length
        }
        callback(results)
    })
}

//找寻货品
exports.findAllProduct = function (productId,callback) {
    if(productId){
        Product.findAll({
            where:{
                id: productId
            }
        }).then(function(result){
            results = {
                data: result,
                count: result.length
            }
            callback(results)
        })
    }
    else {
        Product.findAll().then(function(result){
            results = {
                data: result,
                count: result.length
            }
            callback(results)
        })
    }
}


//找寻订购货品
exports.findBuy = function (orderListId,callback) {
    if(orderListId){
        Buy.findAll({
            where: {
                orderListId: orderListId
            }
        }).then(function(result){
            results = {
                data: result,
                count: result.length
            }
            callback(results)
        })
    }
    else{
        Buy.findAll().then(function(result){
            results = {
                data: result,
                count: result.length
            }
            callback(results)
        })
    }
};

//为Buy表添加货品
exports.addBuy = function (quantity, productId, orderListId, callback) {
    Buy.create({
        quantity: quantity,
        productId: productId,
        orderListId: orderListId
    }).then(function(result){
        results = {
            data: result
        }
        callback(results)
    });
};

//添加新订单
exports.addOrderList = function (user, buyer, phone, email, remark,callback) {
    OrderList.create({
        manager: user,
        buyer: buyer,
        phone: phone,
        email: email,
        remark: remark
    }).then(function(result){
        results = {
            data: result
        }
        callback(results)
    });
};

//分解订单
exports.decomposeOrder = function (orderListId) {
    var allProductList = Buy.findAll({
        where: {
            orderListId: orderListId
        }
    })

    allProductList.array.forEach(element => {
        
    })
}