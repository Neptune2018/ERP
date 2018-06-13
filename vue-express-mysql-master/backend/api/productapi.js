var config = require('../config');
var fs = require('fs');
var path = require('path');
var Test = require('../proxy').Test;
var Product = require('../proxy').Product;
var url = require('url');

//更新领料单
exports.updateGetList = function(req,res) {
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    var oldMaterStocks = JSON.parse(params.oldMaterStocks);
    var newMaterStocks = JSON.parse(params.newMaterStocks);
    Product.updateOrderListStatus('WaitGet',params.orderListId);
    for(var m=0;m<params.oldCount;m++) {
        if(oldMaterStocks.stocks[m].stockId != -1) {
            if(m<params.oldCount-1){
                Product.deleteStock(oldMaterStocks.stocks[m].id,oldMaterStocks.stocks[m].stockId,oldMaterStocks.stocks[m].quantity,function(result){});
            }
            else {
                Product.deleteStock(oldMaterStocks.stocks[m].id,oldMaterStocks.stocks[m].stockId,oldMaterStocks.stocks[m].quantity,function(result){
                    for(var n=0;n<params.oldCount;n++) {
                        if(n<params.oldCount-1){
                            Product.deleteGets(params.orderListId,oldMaterStocks.stocks[n].workshop,oldMaterStocks.stocks[n].stockId,function(result){});
                        }
                        else {
                            Product.deleteGets(params.orderListId,oldMaterStocks.stocks[n].workshop,oldMaterStocks.stocks[n].stockId,function(result){
                                for(var i=0;i<params.newCount;i++) {
                                    if(i<params.newCount-1){
                                        var isEqual = false;
                                        for(var j=0;j<i;j++) {
                                            if(newMaterStocks.stocks[i].workshop==newMaterStocks.stocks[j].workshop&&newMaterStocks.stocks[i].stockId==newMaterStocks.stocks[j].stockId) {
                                                isEqual = true;
                                                break;
                                            }
                                        }
                                        if(!isEqual) {
                                            Product.addGetLists(params.orderListId,newMaterStocks.stocks[i].stockId,newMaterStocks.stocks[i].workshop,function(result){})
                                        }
                                    }
                                    else {
                                        var isEqual = false;
                                        for(var j=0;j<i;j++) {
                                            if(newMaterStocks.stocks[i].workshop==newMaterStocks.stocks[j].workshop&&newMaterStocks.stocks[i].stockId==newMaterStocks.stocks[j].stockId) {
                                                isEqual = true;
                                                break;
                                            }
                                        }
                                        if(!isEqual) {
                                            Product.addGetLists(params.orderListId,newMaterStocks.stocks[i].stockId,newMaterStocks.stocks[i].workshop,function(result){
                                                res.send();
                                            })
                                        }
                                        else {
                                            Product.findGetLists(params.orderListId,newMaterStocks.stocks[i].stockId,newMaterStocks.stocks[i].workshop,function(result){
                                                res.send();
                                            })
                                        }
                                    }
                                }
                            });                            
                        }
                    }
                });                
            }
        }
    }
}

exports.findNewGetList = function(req,res) {
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    var newMaterStocks = JSON.parse(params.newMaterStocks);
    var getList = [];
    for(var i=0;i<params.newCount;i++){
        if(i<params.newCount-1) {
            Product.findGetLists(params.orderListId,newMaterStocks.stocks[i].stockId,newMaterStocks.stocks[i].workshop,function(result){
                getList.push({
                    id: result.data[0].dataValues.id
                })
            })
        }
        else {
            Product.findGetLists(params.orderListId,newMaterStocks.stocks[i].stockId,newMaterStocks.stocks[i].workshop,function(result){
                getList.push({
                    id: result.data[0].dataValues.id
                })
                for(var j=0;j<params.newCount;j++) {
                    if(j<params.newCount-1) {
                        Product.addGets(newMaterStocks.stocks[j].quantity,getList[j].id,newMaterStocks.stocks[j].id,function(result){});                        
                    }
                    else {
                        Product.addGets(newMaterStocks.stocks[j].quantity,getList[j].id,newMaterStocks.stocks[j].id,function(result){
                            for(var k=0;k<params.newCount;k++) {
                                Product.addOcc(newMaterStocks.stocks[k].quantity,newMaterStocks.stocks[k].id,newMaterStocks.stocks[k].stockId)                                
                            }
                            res.send();
                        });
                    }
                }
            })
        }
    }
}

//领料
exports.toGet = function(req,res) {
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    var materStocks = JSON.parse(params.materStocks);
    Product.updateOrderListStatus(params.status,params.id);
    for(var i=0;i<params.count;i++) {
        Product.toGet(materStocks.materStocks[i].id,materStocks.materStocks[i].quantity,materStocks.materStocks[i].stockId);
    }
    res.send();
}

//寻找materStocks
exports.getMaterStocks = function(req,res) {
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    var getList = [];
    var list = [];
    var materList = [];
    Product.findGetList(params.id,function(result){
        for(var i=0;i<result.data.length;i++) {
            if(i<result.data.length-1) {
                getList.push({
                    repertoryId: result.data[i].dataValues.repertoryId,
                    getListId: result.data[i].dataValues.id,
                    stationId: result.data[i].dataValues.stationId
                })
                Product.findGets(result.data[i].dataValues.id,function(result){
                    materList = [];
                    for(var j=0;j<result.data.length;j++) {
                        materList.push({
                            materialId: result.data[j].dataValues.materialId,
                            quantity: result.data[j].dataValues.quantity,
                            getListId: result.data[j].dataValues.getListId
                        })
                    }
                    list.push(materList);
                })
            }
            else {
                getList.push({
                    repertoryId: result.data[i].dataValues.repertoryId,
                    getListId: result.data[i].dataValues.id,
                    stationId: result.data[i].dataValues.stationId
                })
                Product.findGets(result.data[i].dataValues.id,function(result){
                    materList = [];
                    for(var j=0;j<result.data.length;j++) {
                        materList.push({
                            materialId: result.data[j].dataValues.materialId,
                            quantity: result.data[j].dataValues.quantity,
                            getListId: result.data[j].dataValues.getListId
                        })
                    }
                    list.push(materList);
                    var materStocks = [];
                    for(var k=0;k<getList.length;k++) {
                        for(var ii=0;ii<list[k].length;ii++) {
                            materStocks.push({
                                id: list[k][ii].materialId,
                                workshop: getList[k].stationId,
                                quantity: list[k][ii].quantity,
                                stockId: getList[k].repertoryId
                            })
                        }
                    }                 
                    results = {
                        data: materStocks
                    }
                    res.send(results);
                })
            }
        }
    })
}

//更新订单状态
exports.updateOrderList = function(req,res) {
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    Product.updateOrderListStatus(params.status,params.id); 
    res.send();   
}

exports.findAllMater = function(req,res) {
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    var goods = JSON.parse(params.goods);
    var data = [];
    var list = [];
    for(var j=0;j<params.count;j++) {
        if(j<params.count-1) {
            Product.findMaterials(goods.goods[j].id, function(result){
                data = [];
                for(var i =0;i<result.data.length;i++){
                    data.push({
                        materialId: result.data[i].dataValues.id,
                        materialName: result.data[i].dataValues.name,
                        quantity: result.data[i].dataValues.products[0].consist.dataValues.quantity
                    })
                }
                list.push(data);
            })
        }
        else {
            Product.findMaterials(goods.goods[j].id, function(result){
                data = [];
                for(var i =0;i<result.data.length;i++){
                    data.push({
                        materialId: result.data[i].dataValues.id,
                        materialName: result.data[i].dataValues.name,
                        quantity: result.data[i].dataValues.products[0].consist.dataValues.quantity
                    })
                }
                list.push(data);
                results = {
                    data: list
                }
                res.send(results);
            })
        }
    }
}

//通过订单ID查询product
exports.findProducts = function(req,res) {
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    Product.findProducts(params.id,function(result){
        var data = [];
        for(var i=0;i<result.data.length;i++) {
            data.push({
                no: i+1,
                id: result.data[i].dataValues.id,
                name: result.data[i].dataValues.name,
                quantity: result.data[i].dataValues.order_lists[0].buy.dataValues.quantity,
                workshop: 1
            })
        }
        //Product.
        results = {
            data: data
        }
        res.send(results)
    })
}

//通过user查询订单
exports.findOrderListsByUser = function(req,res) {
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    Product.findOrderListsByUser(req.session.user.id,function(result){
        var data = [];
        for(var i=0;i<result.data.length;i++) {
            data.push({
                no: i+1,
                id: result.data[i].dataValues.id,
                ddl: result.data[i].dataValues.schedule,
                user: result.data[i].dataValues.managerId,
                client: result.data[i].dataValues.buyer,
                status: result.data[i].dataValues.status
            })
        }
        results = {
            data: data
        }
        res.send(results)
    })
}

// //查询所有订单
// exports.findAllOrderLists = function(req,res) {
//     console.log(req.session.sess)
//     req.session.sess = 'yes';
//     var params = url.parse(req.url, true).query;
//     Product.findOrderLists(function(result){
//         var data = [];
//         for(var i=0;i<result.data.length;i++) {
//             data.push({
//                 no: i+1,
//                 status: result.data[i].dataValues.status,
//                 id: result.data[i].dataValues.id,
//                 ddl: result.data[i].dataValues.schedule,
//                 user: result.data[i].dataValues.managerId,
//                 client: result.data[i].dataValues.buyer
//             })
//         }
//         results = {
//             data: data
//         }
//         res.send(results)
//     })
// }

//查询符合条件的订单
exports.findOrderLists = function(req,res) {
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    Product.findOrderLists(params.searchName,function(result){
        var data = [];
        for(var i=0;i<result.data.length;i++) {
            data.push({
                no: i+1,
                status: result.data[i].dataValues.status,
                id: result.data[i].dataValues.id,
                ddl: result.data[i].dataValues.schedule,
                user: result.data[i].dataValues.managerId,
                client: result.data[i].dataValues.buyer
            })
        }
        results = {
            data: data
        }
        res.send(results)
    })
}

//删除领料单
exports.deleteGetLists = function(req,res) {
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    var materStock = JSON.parse(params.materStock);
    for(var i=0;i<params.count;i++) {
        Product.deleteGetLists(params.orderListId,materStock.materStocks[i].stockId,materStock.materStocks[i].workshop)
    }
    res.send()
}

//寻找领料
exports.findGetLists = function(req,res) {
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    var materStock = JSON.parse(params.materStock);
    var getListId = [];
    for(var i=0;i<params.count;i++) {
        if(i<params.count-1){
            Product.findGetLists(params.orderListId,materStock.materStocks[i].stockId,materStock.materStocks[i].workshop,function(result){
                getListId.push({
                    id: result.data[0].dataValues.id
                })
            })
        }
        else {
            Product.findGetLists(params.orderListId,materStock.materStocks[i].stockId,materStock.materStocks[i].workshop,function(result){
                getListId.push({
                    id: result.data[0].dataValues.id
                })
                for(var j=0;j<params.count;j++) {
                    if(j<params.count-1) {
                        Product.addGets(materStock.materStocks[j].quantity,getListId[j].id,materStock.materStocks[j].id,function(result){});                        
                    }
                    else {
                        Product.addGets(materStock.materStocks[j].quantity,getListId[j].id,materStock.materStocks[j].id,function(result){
                            var newList = [];
                            var isTrue = false;
                            for(var k=0;k<params.count;k++) {
                                isTrue = false;
                                for(var kk=0;kk<newList.length;kk++) {
                                    if(materStock.materStocks[k].id==newList[kk].id&&materStock.materStocks[k].stockId==newList[kk].stockId) {
                                        newList[kk].quantity += materStock.materStocks[k].quantity;
                                        isTrue = true;
                                    }
                                }
                                if(!isTrue) {
                                    newList.push(materStock.materStocks[k])
                                }
                            }
                            for(var k=0;k<newList.length;k++) {
                                if(newList[k].stockId!=-1) {
                                    Product.addOcc(newList[k].quantity,newList[k].id,newList[k].stockId)
                                }                                
                            }
                            res.send();
                        });
                    }
                }
            })
        }
    }
}

//添加领料单
exports.addGetLists = function(req,res) {
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    var materStock = JSON.parse(params.materStock);
    for(var i=0;i<params.count;i++) {
        var isEqual = false;
        for(var j=0;j<i;j++) {
            if(materStock.materStocks[i].workshop==materStock.materStocks[j].workshop&&materStock.materStocks[i].stockId==materStock.materStocks[j].stockId) {
                isEqual = true;
                break;
            }
        }
        if(!isEqual) {
            Product.addGetLists(params.orderListId,materStock.materStocks[i].stockId,materStock.materStocks[i].workshop,function(result){})
        }
    }
    for(var i=0;i<params.count;i++) {
        if(materStock.materStocks[i].stockId==-1){
            var status = 'LessMater';
            Product.updateOrderListStatus(status,params.orderListId)
            break;
        }
    }
    res.send()
}

//添加buys信息
exports.addBuys = function(req,res) {
    console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq");
	console.log(req.session.user.id);
	console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq");
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    var products = JSON.parse(params.products);
    Product.updateOrderList(req.session.user.id,params.orderListId,params.schedule,params.start,params.buyer,params.phone,params.email,params.remark)
    for(var i=0;i<params.count;i++) {
        Product.addBuys(params.orderListId,products.products[i].id,products.products[i].quantity)
    }
    res.send()
}

//删除一个订单
exports.deleteOrderList = function(req,res) {
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    Product.deleteOrderList(params.id)
    res.send();
}

//生成一个空的订单
exports.addOrderList = function(req,res) {
    console.log(req.session.sess)
    req.session.sess = 'yes';
    Product.addOrderList(function(result){
        results = {
            id: result.data.dataValues.id
        }
        res.send(results)
    })
}

//寻找某件原料的库存数目
exports.findMaterialNum = function(req,res) {
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    var materialsId = JSON.parse(params.materialsId);    
    var numList = [];
    var remain = 0;
    var stocks = [];
    for(var i=0;i<params.count;i++) {
        remain = 0;
        stocks = [];
        if(i<params.count-1) {
            Product.findMaterialNum(materialsId.maters[i].id,function(result){
                remain = 0;
                stocks = [];
                for(var i=0;i<result.data.length;i++) {
                    remain += result.data[i].dataValues.remain;
                    stocks.push({
                        id: result.data[i].dataValues.repertoryId,
                        remain: result.data[i].dataValues.remain,
                        materialId: result.data[i].dataValues.materialId
                    })
                }
                numList.push({
                    remain: remain,
                    stocks: stocks
                })
            })
        }
        else {
            Product.findMaterialNum(materialsId.maters[i].id,function(result){
                remain = 0;
                stocks = [];
                for(var i=0;i<result.data.length;i++) {
                    remain += result.data[i].dataValues.remain;
                    stocks.push({
                        id: result.data[i].dataValues.repertoryId,
                        remain: result.data[i].dataValues.remain,
                        materialId: result.data[i].dataValues.materialId
                    })
                }
                numList.push({
                    remain: remain,
                    stocks: stocks
                })
                results = {
                    data: numList
                }
                res.send(results)
            })
        }
    }
}

//寻找某个货品所需的所有materials
exports.findMaterials = function(req,res) {
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    var data = [];
    Product.findMaterials(params.productId, function(result){
        for(var i =0;i<result.data.length;i++){
            data.push({
                materialId: result.data[i].dataValues.id,
                materialName: result.data[i].dataValues.name,
                quantity: result.data[i].dataValues.products[0].consist.dataValues.quantity
            })
        }
        results = {
            data: data
        }
        res.send(results);
    })
}

//寻找所有goodOptions
exports.findGoodOptions = function(req,res) {
    console.log(req.session.sess)
    req.session.sess = 'yes';
    //寻找所有product
    Product.findGoodOptions(function(result){
        var goodOptions = [];
        for(var i=0;i<result.data.length;i++){
            goodOptions.push(result.data[i].dataValues);
        }
        //找寻所有stations
        Product.findStations(function(result){
            var stations = [];
            for(var i=0;i<result.data.length;i++){
                stations.push(result.data[i].dataValues);                
            }
            results = {
                goodOptions: goodOptions,
                stations: stations
            }
            res.send(results);
        })
    })
}

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


