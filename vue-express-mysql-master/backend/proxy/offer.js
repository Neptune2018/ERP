var MinOrder = require('../models').MinOrder;
var Offer = require('../models').Offer;
var Supplier = require('../models').Supplier;
var OfferList = require('../models').OfferList;
var User = require('../models').User;
var Material = require('../models').Material;
var Sequelize = require('sequelize');
var db = require('../models/index').DB;

exports.findAllOfferByOfferList = async function (id,material_id,name,batch, callback) {
    var sql = "select materials.id as id,materials.name as name,quantity,batch,price,total_price from offers,materials,offer_lists where offer_lists.id = "+ id + " and offers.materialId = materials.id and offers.offerListId = offer_lists.id"
    if(material_id){
        sql += " and materials.id =" + material_id; 
    }
    if(name){
        sql += " and materials.name like '%" + name+"%'"; 
    }
    if(batch){
        sql += " and batch = '" + batch +"'"; 
    }
    
    db.query(sql).then(function(data){
        callback(data)
    })
  
}
  
exports.deleteOffer = async function (offerlist_id,material_id,callback) {
    offerlist = await OfferList.findById(offerlist_id)
    material = await Material.findById(material_id)
    offerlist.removeMaterial(material).then(function(result){
      callback(result)
    })
}

  exports.addOffer = async function (supplier_id, user_id,  time,callback) {
    
    var offerList = await OfferList.create({
      time: time
    }).then(function(result){
        if(result.dataValues.id){
            var sql1 = "update offer_lists set supplierId = " + supplier_id + ",userId = "+ user_id + " where id = "+ result.dataValues.id + ";"
            db.query(sql1).then(function(data){
                callback(data)
            })
        }
        else{
            callback(result)
        }
    })
  };
  
  exports.updateOfferList = function (offerList_id, user_id, time,callback) {
    var sqlquery1="update offer_lists set userId = " + user_id+",time = "+ time + " where id = "+ offerList_id+";"
    db.query(sqlquery1).then(function(data){
      callback(data)
    })
    
  };