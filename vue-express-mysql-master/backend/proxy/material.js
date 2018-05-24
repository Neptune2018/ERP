var Material = require('../models').Material;
var Stock = require('../models').Stock;
var Supplier = require('../models').Supplier;
var Sequelize = require('sequelize');

exports.findAllMaterial = function (callback) {
    Material.findAll().then(function(data){
    	callback(data);
    });
}

exports.findMaterialBySupplier = function (name,callback) {
    supplier = Supplier.findAll({
        where: {
          name: SupplierName
        }
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
exports.findStarve = function (callback) {
    var include = [{
        model: Stock,
        required: true,
        attributes: ['name','property','safe_quantity'],
    }];
    Material.findAll({
        include:[{
            model: Stock,
            required: true,
            where:{
                style:false
            },
            attributes:[]
        }], 
        attributes:['id','name','property','safe_quantity',[Sequelize.fn('SUM', Sequelize.col('remain')), 'sum']], 
        group:'stocks.materialId', 
        having:Sequelize.literal("SUM(remain) < Material.safe_quantity"), 
        raw:true
    }).then(function(result){
        callback(result)
    })
}