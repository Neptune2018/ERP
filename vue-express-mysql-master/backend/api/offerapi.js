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
    Offer.findAllOfferByOfferList(params.id,function(data) {
		res.send(data)
	});
}

exports.deleteOffer = function(req,res){
    console.log(req.session.sess);
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    console.log(params.offerlist_id,params['material_id[]'])
    Offer.deleteOffer(params.offerlist_id,params['material_id[]'],function(data){
        Offer.findAllOfferByOfferList(params.offerlist_id,function(data) {
            res.send(data)
        });
    });
    
}

exports.addOfferList = function(req,res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    console.log(params.time)
    console.log(req.query)
    OfferList.addOfferList(params.supplier_id, params.user_id,params.time,function(data){
        OfferList.findAllOfferList(function(data) {
            res.send(data)
        });
    });
    
}

exports.updateOfferList = function(req,res){
    console.log(req.session.sess);
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    OfferList.updateOfferList(params.id, params.person,params.time,function(){
        OfferList.findAllOfferList(function(data) {
            res.send(data)
        });
    });
}
