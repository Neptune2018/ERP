var IoItem = require('../models').IOItem;
var IoList = require('../models').IOList;
var Stock = require('../models').Stock;
var Repertory = require('../models').Repertory;
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
//插入仓库
exports.insertIO = function(info){
    for(var i = 0;i<info.length;i++){
        if (info[i].style == "物料"){
            info[i].style = 0
        } else {
            info[i].style = 1
        }
        IoList.create({
            //id:1232,
            time:info[i].time,
            style:info[i].style,
            fromPersonId:info[i].fromPerson,
            toPersonId:info[i].toPerson
        });
        IoItem.create({
            //id:321,
            style:info[i].style,
            quantity:info[i].quantity,
            unit:info[i].unit,
            batch:info[i].batch
        });
    }
}