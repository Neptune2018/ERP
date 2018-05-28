var Material = require('../models').Material;
var MaterCate = require('../models').MaterCate;
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

exports.findAllMaterials = function (callback) {
    Material.findAndCountAll({
        include:[{
            model: MaterCate,
            required: false,
            attributes: [['name','category']],
        }], 
        raw:true
    }).then(function(result){
        results = {
            data: result.rows,
            count: result.count
        }
        callback(results)
    });
}

exports.findAllMaterial = function (id,name,property,category,callback) {
    var where = "material.status = '正常'";
    if(id){
        where += " and material.id =" + id; 
    }
    if(name){
        where += " and material.name like '%" + name+"%'"; 
    }
    if(property){
        where += " and material.property like '%" + property+"%'"; 
    }
    if(category){
        where += " and mater_cate.name like '%" + category+"%'"; 
    }
    Material.findAndCountAll({
        include:[{
            model: MaterCate,
            required: false,
            attributes: [['name','category']],
        }], 
        where:Sequelize.literal(where),
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

exports.findNOStarve = function (id,name,property,category,callback) {
    var where = "stocks.id is NULL and material.status = '正常'";
    if(id){
        where += " and material.id =" + id; 
    }
    if(name){
        where += " and material.name like '%" + name+"%'"; 
    }
    if(property){
        where += " and material.property like '%" + property+"%'"; 
    }
    if(category){
        where += " and mater_cate.name like '%" + category+"%'"; 
    }
    Material.findAll({
        include:[{
            model: Stock,
            required: false,
            where:{
                style:false,
                
            },
            attributes:[]
        },{
            model: MaterCate,
            required: false,
            attributes: [['name','category']],
        }], 
        attributes:['id','name','property','safe_quantity'] ,
        where:Sequelize.literal(where),
        raw:true,
    }).then(function(result){
        results = {
            data: result,
            count: result.length
        }
        callback(results)
    })
}

exports.findStarve = function (id,name,property,category,callback) {
    var where = "material.status = '正常'";
    if(id){
        where += " and material.id =" + id; 
    }
    if(name){
        where += " and material.name like '%" + name+"%'"; 
    }
    if(property){
        where += " and material.property like '%" + property+"%'"; 
    }
    if(category){
        where += " and mater_cate.name like '%" + category+"%'"; 
    }
    Material.findAll({
        include:[{
            model: Stock,
            required: true,
            where:{
                style:false
            },
            attributes:[]
        },{
            model: MaterCate,
            required: false,
            attributes: [['name','category']],
        }], 
        attributes:['id','name','property','safe_quantity',[Sequelize.fn('SUM', Sequelize.col('remain')), 'sum_quantity']], 
        where: Sequelize.literal(where),
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