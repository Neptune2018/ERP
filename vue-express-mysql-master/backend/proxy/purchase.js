var MinOrder = require('../models').MinOrder;
var Offer = require('../models').Offer;
var Supplier = require('../models').Supplier;
var OfferList = require('../models').OfferList;
var User = require('../models').User;
var Material = require('../models').Material;


exports.findAllSupplier = function () {
  return Supplier.findAll();
};
exports.findSupplier = function (SupplierName) {
  return Supplier.findAll({
    where: {
      name: SupplierName
    }
  });
};
exports.addSupplier = function (name, phone, person, remark) {
  return Supplier.create({
    name: name,
    phone: phone,
    person: person,
    remark: remark
  });
};
exports.deleteSupplier = function (SupplierName) {
  return Supplier.destroy({
    where: {
      name: SupplierName
    }
  });
};
exports.updateSupplier = function (id, name, phone, person, remark) {
  return Supplier.update({
    name: name,
    phone: phone,
    person: person,
    remark: remark
  }, {
    where: {
      id: id
    }
  });
};

exports.findAllOfferList = function () {
  var offerLists = OfferList.findAll({
    include: [Supplier, User]
  })
  return offerLists;
}
exports.findOfferListByID = function (offerList_id) {
  var offerLists = OfferList.findAll({
    include: [Supplier, User],
    where: {
      id: offerList_id
    }
  })
  return offerLists;
}
exports.findAllOfferListBySupplier = function (supplier_id) {
  var offerLists = OfferList.findAll({
    include: [{
      model: Supplier,
      where: {
        id: supplier_id
      }
    }, User]
  })
  return offerLists;
}
// 添加报价单
exports.addOfferList = function (name, from_user, to_user, time, materials) {
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
  })

  offerList.addUser(from_User, {
    as: 'from_person'
  })
  offerList.addUser(to_User, {
    as: 'to_person'
  })

  materials.array.forEach(element => {
    var material = Material.findById(element.id)
    offerList.addMaterial(material, {
      quantity: element.quantity,
      batch: element.batch,
      price: element.price,
      total_price: element.total_price
    })
  });
  return offerList;
};

exports.updateOfferList = function (offerList_id, name, from_user, to_user, time, materials) {
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
  return offerList;
};
exports.deleteOfferList = function (offerList_id) {
  var offerList = OfferList.findAll({
    id: offerList_id
  })
  var supplier = offerList.getSupplier();
  supplier.removeOfferList(offerList)
}


exports.setMinOrder = function (supplier_name, material_id, quantity) {
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
  })
}