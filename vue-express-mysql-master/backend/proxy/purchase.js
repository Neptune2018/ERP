var MinOrder = require('../models').MinOrder;
var Offer = require('../models').Offer;
var Supplier = require('../models').Supplier;
var OfferList = require('../models').OfferList;
var User = require('../models').User;
var Material = require('../models').Material;
var Sequelize = require('sequelize');

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

exports.deleteOfferList = async function (offerList_id,callback) {
  var offerList = await OfferList.findAll({
    id: offerList_id
  })
  var supplier = await offerList.getSupplier();
  supplier.removeOfferList(offerList).then(function(result){
    callback(result)
  })
}


exports.setMinOrder = async function (supplier_name, material_id, quantity,callback) {
  var supplier = await Supplier.findAll({
    where: {
      name: supplier_name
    }
  })
  var material = await Material.findAll({
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