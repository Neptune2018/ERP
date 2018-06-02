var config = require('../config');
var fs = require('fs');
var path = require('path');
var Purchase = require('../proxy').Purchase;
var Supplier = require('../proxy').Supplier;
var Material = require('../proxy').Material;
var OfferList = require('../proxy').OfferList;
var Offer = require('../proxy').Offer;

var url = require('url');

exports.getOfferByOfferList = function(req,res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    Offer.findAllOfferByOfferList(params.id,params.material_id,params.name,params.batch,function(data) {
		res.send(data)
	});
}

exports.deleteOffer = function(req,res){
    console.log(req.session.sess);
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    console.log(params.offerlist_id,params['material_id[]'])
    Offer.deleteOffer(params.offerlist_id,params['material_id[]'],function(data){
        Offer.findAllOfferByOfferList(params.offerlist_id,null,null,null,function(data) {
            res.send(data)
        });
    });
    
}

exports.addOffer = function(req,res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    Offer.addOffer(params.offerlist_id, params.material_id,params.quantity,params.batch,params.price,params.total_price,function(data){
        if(data){
            Offer.findAllOfferByOfferList(params.offerlist_id,null,null,null,function(data) {
                res.send(data)
            });
        }else{
            res.send("0")
        }
    });
    
}

exports.updateOffer = function(req,res){
    console.log(req.session.sess);
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    Offer.updateOffer(params.offerlist_id, params.material_id,params.quantity,params.batch,params.price,params.total_price,function(){
        Offer.findAllOfferByOfferList(params.offerlist_id,null,null,null,function(data) {
            res.send(data)
        });
    });
}
