var Buy = require('../models').Buy;
var Product = require('../models').Product
var  OrderList = require('../models').OrderList
var  Consist = require('../models').Consist
var  Material = require('../models').Material
var  GetList = require('../models').GetList
var  Get = require('../models').Get
var Stock = require('../models').Stock;
var Station = require('../models').Station;

//删除Get
exports.deleteGets = function(orderListId,workshop,repertoryId,callback) {
    return GetList.findAll({
        where:{
            orderListId: orderListId,
            stationId: workshop,
            repertoryId: repertoryId
        }
    }).then(function(result){
        if(result.length>0) {
            Get.destroy({
                where: {
                    getListId: result[0].dataValues.id
                }
            }).then(function(result){
                GetList.destroy({
                    where:{
                        orderListId: orderListId,
                        stationId: workshop,
                        repertoryId: repertoryId
                    }
                }).then(function(result){
                    callback(result);
                })
            })
        }
    })
}

//删除stock.occ
exports.deleteStock = function(materialId,repertoryId,quantity,callback) {
    return Stock.findAll({
        where:{
            materialId: materialId,
            repertoryId: repertoryId
        }
    }).then(function(result){      
        Stock.update({
            remain: result[0].dataValues.remain+quantity,
            occupancy: result[0].dataValues.occupancy-quantity
        },{
            where: {
                materialId: materialId,
                repertoryId: repertoryId
            }
        }).then(function(result){
            callback(result);
        })
    })
}

//领料
exports.toGet = function(materialId,quantity,StockId) {
    return Stock.findAll({
        where:{
            materialId: materialId,
            repertoryId: StockId
        }
    }).then(function(result){
        Stock.update({
            occupancy: result[0].dataValues.occupancy-quantity
        },{
            where: {
                materialId: materialId,
                repertoryId: StockId
            }
        });
    })
}

//查询某领料单对应的领料信息
exports.findGets = function(id,callback) {
    Get.findAll({
        where: {getListId: id}
    }).then(function(result){    
        results = {
            data: result
        }
        callback(results)
    });
}

//通过订单号查询领料单
exports.findGetList = function(id,callback) {
    GetList.findAll({
        where: {
            orderListId: id
        }
    }).then(function(result){
        results = {
            data: result
        }
        callback(results)
    });
}

//通过订单ID查询product
exports.findProducts = function(id,callback) {
    Product.findAll({
        'include': [
            {
                'model': OrderList,
                where: {
                    id: id
                }
                // 这里可以对notes进行where
            }
        ]
        // 这里可以对tags进行where
    }).then(function(result){
        results = {
            data: result
        }
        callback(results)
    })
}

//通过user查订单
exports.findOrderListsByUser = function(user,callback) {
    OrderList.findAll({
        where: {managerId: user}
    }).then(function(result){
        results = {
            data: result
        }
        callback(results)
    })
}

//查询订单
exports.findOrderLists = function(id,callback) {
    if(id == '') {
        OrderList.findAll().then(function(result){
            results = {
                data: result
            }
            callback(results)
        })
    }
    else {
        OrderList.findAll({
            where: {id: id}
        }).then(function(result){
            results = {
                data: result
            }
            callback(results)
        })
    }
}

//删除getlist
exports.deleteGetLists = function(orderListId,repertoryId,stationId) {
    return GetList.destroy({
        where: {
            orderListId: orderListId,
            repertoryId: repertoryId,
            stationId: stationId
        }
    })
}

//修改occu
exports.addOcc = function(quantity,materialId,repertoryId) {
    return Stock.findAll({
        where:{
            materialId: materialId,
            repertoryId: repertoryId
        }
    }).then(function(result){
        Stock.update({
            remain: result[0].dataValues.remain-quantity,
            occupancy: result[0].dataValues.occupancy+quantity
        },{
            where: {
                materialId: materialId,
                repertoryId: repertoryId
            }
        });
    })
}

//orderList添加状态
exports.updateOrderListStatus = function(status,id){
    return OrderList.update({
        status: status
      }, {
        where: {
          id: id
        }
      });
}

//添加领料
exports.addGets = function(quantity,getListId,materialId,callback) {
    Get.create({
        quantity: quantity,
        getListId: getListId,
        materialId: materialId
    }).then(function(result){
        results = {
            data: result
        }
        callback(results)
    })
}

//寻找领料单
exports.findGetLists = function(orderListId,repertoryId,stationId,callback) {
    GetList.findAll({
        where: {
        orderListId: orderListId,
        repertoryId: repertoryId,
        stationId: stationId
    }
    }).then(function(result){
        results = {
            data: result
        }
        callback(results)
    })
}

//添加一条领料单
exports.addGetLists = function(orderListId,repertoryId,stationId,callback) {
    return GetList.create({
        orderListId: orderListId,
        repertoryId: repertoryId,
        stationId: stationId
    }).then(function(result){
        results = {
            data: result
        }
        callback(results)
    })
}

//添加buys信息
exports.addBuys = function(orderListId,id,quantity){
    return Buy.create({
        orderListId: orderListId,
        productId: id,
        quantity: quantity
    })
}

//添加订单的详细信息
exports.updateOrderList = function(user,orderListId,schedule,start,buyer,phone,email,remark){
    return OrderList.update({
        status: 'WaitGet',
        schedule: schedule,
        start: start,
        buyer: buyer,
        phone: phone,
        email: email,
        remark: remark,
        managerId: user
      }, {
        where: {
          id: orderListId
        }
      });
}

//删除一个订单
exports.deleteOrderList = function(id) {
    return OrderList.destroy({
        where: {
            id: id
        }
    })
}

//生成一个空的订单
exports.addOrderList = function(callback) {
    OrderList.create(
    ).then(function(result){
        results = {
            data: result
        }
        callback(results)
    });
}

//寻找某件原料的库存
exports.findMaterialNum = function(materialId,callback) {
    Stock.findAll({
        where: {materialId: materialId}
    }).then(function(result){
        results = {
            data: result
        }
        callback(results)
    })
}

//寻找某货品所需的所有materials
exports.findMaterials = function(productId,callback) {
    Material.findAll({
        'include': [
            {
                'model': Product,
                where: {
                    id: productId
                }
                // 这里可以对notes进行where
            }
        ]
        // 这里可以对tags进行where
    }).then(function(result){
        results = {
            data: result
        }
        callback(results)
    });
}

//寻找所有的Station
exports.findStations = function(callback) {
    Station.findAll({
        'attributes': ['id', 'name']
    }).then(function(result){
        results = {
            data: result
        }
        callback(results)
    })
}

//寻找所有goodOptions
exports.findGoodOptions = function(callback) {
    Product.findAll({
        'attributes': ['id', 'name']
    }).then(function(result){
        results = {
            data: result
        }
        callback(results)
    })
}

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
// exports.addOrderList = function (user, buyer, phone, email, remark,callback) {
//     OrderList.create({
//         manager: user,
//         buyer: buyer,
//         phone: phone,
//         email: email,
//         remark: remark
//     }).then(function(result){
//         results = {
//             data: result
//         }
//         callback(results)
//     });
// };

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