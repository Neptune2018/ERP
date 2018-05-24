var MinOrder = require('../models').MinOrder;
var Offer = require('../models').Offer;
var Supplier = require('../models').Supplier;
var OfferList = require('../models').OfferList;
var User = require('../models').User;
var Material = require('../models').Material;


exports.findAllSupplier = function (callback) {
  Supplier.findAll().then(function(data){
    callback(data);
  });
};
exports.findSupplierByName = function (SupplierName,callback) {
  Supplier.findAll({
    where: {
      name: SupplierName
    }
  }).then(function(data){
    callback(data);
  });
};

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
exports.deleteSupplierByName = function (SupplierName,callback) {
  Supplier.destroy({
    where: {
      name: SupplierName
    }
  }).then(function(result){
    callback(result)
  });
};

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

exports.updateSupplierByName = function (name1, name, phone, person, remark,callback) {
  Supplier.update({
    name: name,
    phone: phone,
    person: person,
    remark: remark
  }, {
    where: {
      name: name1
    }
  }).then(function(result){
    console.log(result)
    callback(result)
  });
};

exports.findAllOfferList = function (callback) {
  OfferList.findAll({
    include: [Supplier, User]
  }).then(function(data){
    callback(data);
  });
}
exports.findOfferListByID = function (offerList_id,callback) {
  OfferList.findAll({
    include: [Supplier, User],
    where: {
      id: offerList_id
    }
  }).then(function(data){
    callback(data);
  });
}
exports.findAllOfferListBySupplier = function (supplier_id,callback) {
  OfferList.findAll({
    include: [{
      model: Supplier,
      where: {
        id: supplier_id
      }
    }, User]
  }).then(function(data){
    callback(data);
  });
}
// 添加报价单
exports.addOfferList = function (name, from_user, to_user, time, materials,callback) {
  var supplier = Supplier.findAll({
    where: {
      name: name
    }
  })

  var from_User = User.findAll({
    where: {
      name: from_user
    }
  })

  var to_User = User.findAll({
    where: {
      name: to_user
    }
  })

  var offerList = supplier.createOfferList({
    time: time
  }).then(function(result){
    callback(result)
  })

  offerList.addFromPerson(from_User)
  offerList.addToPerson(to_User)

  materials.array.forEach(element => {
    var material = Material.findById(element.id)
    offerList.addMaterial(material, {
      quantity: element.quantity,
      batch: element.batch,
      price: element.price,
      total_price: element.total_price
    })
  });
  
};

exports.updateOfferList = function (offerList_id, name, from_user, to_user, time, materials,callback) {
  var supplier = Supplier.findAll({
    where: {
      name: name
    }
  })

  var from_User = User.findAll({
    where: {
      name: from_user
    }
  })

  var to_User = User.findAll({
    where: {
      name: to_user
    }
  })

  var offerList = OfferList.findAll({
    id: offerList_id
  })

  OfferList.update({
    time: time
  },{
    where:{
      id: offerList_id
    }
  }).then(function(result){
    callback(result)
  })

  offerList.setUser(from_User, {
    as: 'from_person'
  })
  offerList.setUser(to_User, {
    as: 'to_person'
  })

  materials.array.forEach(element => {
    var material = Material.findById(element.id)
    offerList.setMaterial(material, {
      quantity: element.quantity,
      batch: element.batch,
      price: element.price,
      total_price: element.total_price
    })
  });
  
};

exports.deleteOfferList = function (offerList_id,callback) {
  var offerList = OfferList.findAll({
    id: offerList_id
  })
  var supplier = offerList.getSupplier();
  supplier.removeOfferList(offerList).then(function(result){
    callback(result)
  })
}


exports.setMinOrder = function (supplier_name, material_id, quantity,callback) {
  var supplier = Supplier.findAll({
    where: {
      name: supplier_name
    }
  })
  var material = Material.findAll({
    where: {
      id: material_id
    }
  })
  supplier.setMaterials(material, {
    quantity: quantity
  }).then(function(result){
    callback(result)
  })
}