var Material = require('../models').Material;
var Stock = require('../models').Stock;
var Supplier = require('../models').Supplier;
var Sequelize = require('sequelize');

exports.findAllMaterial = function (countPerPage,currentPage,callback) {
    if(!countPerPage)
        countPerPage = 10;
    if(!currentPage)
        currentPage =1;
    Material.findAndCountAll({
        limit:countPerPage,
        offset: countPerPage * (currentPage - 1),
        raw:true
    }).then(function(result){
        results = {
            data: result.rows,
            count: result.count
        }
        callback(results)
    });
}

exports.findMaterialBySupplier = function (countPerPage,currentPage,name,callback) {
    supplier = Supplier.findAll({
        where: {
          name: SupplierName
        },
        limit:countPerPage,
        offset: countPerPage * (currentPage - 1)
    })
    supplier.getMaterials().then(function(data){
        console.log(data)
        callback(data)
    })
}

exports.setSafeQuantity = function (material_id, quantity,callback) {
    Material.update({
        safe_quantity: quantity
    }, {
        where: {
            id: material_id
        }
    }).then(function(result){
        callback(result)
    })
}

exports.findNOStarve = function (callback) {
    Material.findAll({
        include:[{
            model: Stock,
            required: false,
            where:{
                style:false,
                
            },
            attributes:[]
        }], 
        attributes:['id','name','property','safe_quantity'] ,
        where:Sequelize.literal("stocks.id is NULL"),
        raw:true,
    }).then(function(result){
        results = {
            data: result,
            count: result.length
        }
        callback(results)
    })
}

exports.findStarve = function (callback) {
    var res = new Array();
    Material.findAll({
        include:[{
            model: Stock,
            required: true,
            where:{
                style:false
            },
            attributes:[]
        }], 
        attributes:['id','name','property','safe_quantity',[Sequelize.fn('SUM', Sequelize.col('remain')), 'sum_quantity']], 
        group:'stocks.materialId', 
        having:Sequelize.literal("SUM(remain) < Material.safe_quantity"), 
        raw:true,
    }).then(function(result){
        
        results = {
            data: result,
            count: result.length
        }
        callback(results)
    })
    
}