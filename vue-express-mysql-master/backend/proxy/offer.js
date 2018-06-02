var MinOrder = require('../models').MinOrder;
var Offer = require('../models').Offer;
var Supplier = require('../models').Supplier;
var OfferList = require('../models').OfferList;
var User = require('../models').User;
var Material = require('../models').Material;
var Sequelize = require('sequelize');
var db = require('../models/index').DB;
var formatDate = require('../utils/index').formatDate
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
        callback(data[0])
    })
  
}
  
exports.deleteOffer = async function (offerlist_id,material_id,callback) {
    offerlist = await OfferList.findById(offerlist_id)
    material = await Material.findById(material_id)
    offerlist.removeMaterial(material).then(function(result){
      callback(result)
    })
}

  exports.addOffer = async function (offerlist_id, material_id,quantity,batch,price,total_price,callback) {
      
    if(!total_price){
        total_price = quantity * price
    }
    var sql1 = "select count(*) as count from offers where offerListId = "+offerlist_id+" and materialId = "+material_id+";"
    db.query(sql1).then(function(data){
        if(data[0][0].count){
            callback(0)
        }else{
            var now = formatDate(new Date(),"yyyy-MM-dd hh:mm:ss")
            var sql = "insert into offers values(" + quantity+",'"+batch+"',"+price+","+total_price+",'"+now+"','"+now +"',"+offerlist_id+","+material_id +");"
            db.query(sql).then(function(data){
                callback(data)
            })
        }
    })
  };
  
  exports.updateOffer = function (offerlist_id, material_id,quantity,batch,price,total_price,callback) {
    if(!total_price)
        total_price = quantity * price
    var offer = Offer.update({
        quantity:quantity,
        batch:batch,
        price:price,
        total_price:total_price
    },{
        where:{
            offerListId:offerlist_id,
            materialId:material_id
        }
    }).then(function(result){
        callback(result)
    })
    
  };