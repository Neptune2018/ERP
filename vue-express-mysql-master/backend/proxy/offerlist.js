var MinOrder = require('../models').MinOrder;
var Offer = require('../models').Offer;
var Supplier = require('../models').Supplier;
var OfferList = require('../models').OfferList;
var User = require('../models').User;
var Material = require('../models').Material;
var Sequelize = require('sequelize');
var db = require('../models/index').DB;

exports.findAllOfferList = function (callback) {
  OfferList.findAll({
    include: [{
        model: Supplier,
        attributes: ['name','person']
    }, {
        model: User,
        attributes: ['name']
    }]
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

  exports.deleteOfferList = async function (offerList_id,callback) {

    var sql = "delete from offers where  offerListId = "+ offerList_id + ";"
    db.query(sql).then(function(data){
        var sql1 = "delete from offer_lists where id = "+ offerList_id + ";"
        db.query(sql1).then(function(data){
            callback(data)
        })
    })
  }