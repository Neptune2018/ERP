var Supplier = require('../models').Supplier;
var User = require('../models').User;
var Material = require('../models').Material;
var Sequelize = require('sequelize');
var db = require('../models/index').DB;

exports.findAllSupplier = function (id,name,person,callback) {
    var where = "1 = 1 ";
      if(id){
          where += "and supplier.id =" + id; 
      }
      if(name){
          where += " and supplier.name like '%" + name+"%'"; 
      }
      if(person){
          where += " and supplier.person like '%" + person+"%'"; 
      }
    Supplier.findAll({
      where:Sequelize.literal(where)
    }).then(function(data){
      callback(data);
  
    });
  };
//   exports.findSupplierByName = function (SupplierName,callback) {
//     Supplier.findAll({
//       where: {
//         name: SupplierName
//       }
//     }).then(function(data){
//       callback(data);
//     });
//   };
  
  exports.findSupplierById = function (id,callback) {
    Supplier.findAll({
      where: {
        id: id
      }
    }).then(function(data){
      callback(data);
    });
  };
  
  exports.addSupplier = function (name, phone, person, remark,callback) {
    Supplier.create({
      name: name,
      phone: phone,
      person: person,
      remark: remark
    }).then(function(data){
      callback(data)
    })
  };
//   exports.deleteSupplierByName = function (SupplierName,callback) {
//     Supplier.destroy({
//       where: {
//         name: SupplierName
//       }
//     }).then(function(result){
//       callback(result)
//     });
//   };
  
  exports.deleteSupplierById = function (id,callback) {
    Supplier.destroy({
      where: {
        id: id
      }
    }).then(function(result){
      callback(result)
    });
  };
  
  exports.updateSupplierById = function (id, name, phone, person, remark,callback) {
    Supplier.update({
      name: name,
      phone: phone,
      person: person,
      remark: remark
    }, {
      where: {
        id: id
      }
    }).then(function(result){
      console.log(result)
      callback(result)
    });
  };
  
//   exports.updateSupplierByName = function (name1, name, phone, person, remark,callback) {
//     Supplier.update({
//       name: name,
//       phone: phone,
//       person: person,
//       remark: remark
//     }, {
//       where: {
//         name: name1
//       }
//     }).then(function(result){
//       console.log(result)
//       callback(result)
//     });
//   };

exports.getAllUserId = function(callback){
  User.findAll({
    attributes : ['id']
  }).then(function(result){
    callback(result)
  })
}

exports.addMaterialsToSupplier = async function(id, material_id, quantity, callback){
  supplier = await Supplier.findById(id)
  material = await Material.findById(material_id)
  supplier.addMaterial(material, { 'quantity': quantity}).then(function(result){
    var sql = "update min_orders set quantity = "+quantity + " where materialId = "+ material_id + " and supplierId = " + id + ";"
    db.query(sql).then(function(data){
      callback(data)
  })
  })
}

exports.removeMaterialsFromSupplier = async function(id, material_id,callback){
  supplier = await Supplier.findById(id)
  material = await Material.findById(material_id)
  supplier.removeMaterial(material).then(function(result){
    callback(result)
  })
}

exports.setMinOrder = async function (supplier_id, material_id, quantity,callback) {
  var sqlquery1="update suppliers,min_orders,materials set min_orders.quantity = "+ quantity +" WHERE min_orders.materialId = materials.id and min_orders.supplierId = suppliers.id and suppliers.id = "+ supplier_id +" and materials.id = "+ material_id + ";"
    db.query(sqlquery1).then(function(data){
        callback(data)
    })
}