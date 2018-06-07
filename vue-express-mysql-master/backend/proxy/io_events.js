var IoItem = require('../models').IOItem;
var IoList = require('../models').IOList;
var Stock = require('../models').Stock;
var Repertory = require('../models').Repertory;
var Material = require('../models').Material;
var Product = require('../models').Product;
var db = require('../models').DB;

//搜索仓库名并且返回
exports.searchRepertory = function(dosomething){
    db.query('select name from repertories;')
    .then(function(rows){
        dosomething(rows);
    })
}
//查找是否存在某个验收人
exports.searchPerson = function(dosomething,id){
    db.query('select id from users where id = '+id)
    .then(function(rows){
        dosomething(rows);
    })    
}
//查找是否存在某个仓库id
exports.searchStockId = function(dosomething,id){
    db.query('select id from repertories where id = '+id)
    .then(function(rows){
        dosomething(rows);
    })    
}
//查询是否存在某仓库
exports.repertoryExist = function(dosomething,id,name){
    db.query('select name,id from repertories where id = '+id+' AND name = '+'\''+name+'\'')
    .then(function(rows){
        dosomething(rows);
    })   
}
//搜索最大库存
exports.searchMax = function(dosomething,stockid){
    db.query('select max from repertories where id = '+stockid)
    .then(function(rows){
        dosomething(rows);
    })
}

//查找库位是否被占用
exports.placeAvailable = function(dosomething,place,id){
    db.query('select * from stocks where place = '+place+' AND repertoryId = '+id)
    .then(function(rows){
        dosomething(rows);
    })   
}
//入库数据操作
exports.insertPM = function(id,info){
    if (info.style == "物料" || info.style == 0){
        info.style = 0
    } else {
        info.style = 1
    }
    if(info.style == 1) {
        Product.create({
            id:id,
            name:info.goodName,
            price:500
        })
    } else {
        Material.create({
            id:id,
            name:info.goodName,
            safe_quantity:500
        })
    }
}
exports.insertStock = function(info,ioid,pmid){
    if (info.style == "物料" || info.style == 0){
        info.style = 0
    } else {
        info.style = 1
    } 
    console.log(info.style)
    if(info.style == 1) {
        IoItem.create({
            style:info.style,
            quantity:info.quantity,
            unit:info.unit,
            batch:info.batch,
            ioListId:ioid,
            productId:pmid
        })
        Stock.create({
            style:info.style,
            place:info.stockPlace,
            remain:info.quantity,
            unit:info.unit,
            batch:info.batch,
            repertoryId:info.stockId,
            productId:pmid,               
        })
    } else if(info.style == 0) {
        IoItem.create({
            style:info.style,
            quantity:info.quantity,
            unit:info.unit,
            batch:info.batch,
            ioListId:ioid,
            materialId:pmid
        })
        Stock.create({
            style:info.style,
            place:info.stockPlace,
            remain:info.quantity,
            unit:info.unit,
            batch:info.batch,
            repertoryId:info.stockId,
            materialId:pmid,               
        })
    } 
}
exports.insertIO = function(id,info){
    IoList.create({
        id:id,
        style:1,//表示入库操作
        fromPersonId:info.fromPerson,
        toPersonId:info.toPerson
    })

}
exports.findRemain = function(dosomething,id,k){
    db.query('select remain from stocks where id = '+id)
    .then(function(rows){
        dosomething(rows,k);
    }) 
}
exports.updateRemain=function(remain,id){
    db.query("update stocks set remain = '"+remain+"' where id = "+id)
    .then(function(rows,err){
        if(err){
            console.log('修改失败')
        }
    })
}
//找到出库人
exports.findPMId = function(dosomething,info){
    if(info.style == 1) {
        db.query('select productId from stocks where id = '+info.id)
        .then(function(rows){
            dosomething(rows)
        })
    } else if(info.style == 0){
        db.query('select materialId from stocks where id = '+info.id)
        .then(function(rows){
            dosomething(rows)
        })
    }
}
exports.exportIO = function(id,fromPerson,toPerson){
    IoList.create({
        id:10000+id,
        style:0,//表示出操作
        fromPersonId:fromPerson,
        toPersonId:toPerson
    })
}
