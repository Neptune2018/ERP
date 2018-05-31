var Supplier = require('../models').Supplier;

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