var config = require('../config');
var fs = require('fs');
var path = require('path');
var Purchase = require('../proxy').Purchase;
var Supplier = require('../proxy').Supplier;
var Material = require('../proxy').Material;
var OfferList = require('../proxy').OfferList;
var url = require('url');

exports.getOfferList = function(req,res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    OfferList.findAllOfferList(params.id,params.name,params.person,function(data) {
		res.send(data)
	});
}

exports.getOfferListById = function (req,res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    OfferList.findOfferListByID(params.id,function(data) {
		res.send(data)
	});
}

exports.getOfferListBySupplier = function (req,res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    OfferList.findAllOfferListBySupplier(params.id,function(data) {
		res.send(data)
	});
}

exports.deleteOfferList = function(req,res){
    console.log(req.session.sess);
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    OfferList.deleteOfferList(params['id[]'],function(data){
        OfferList.findAllOfferList(null,null,null,function(data) {
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
        OfferList.findAllOfferList(null,null,null,function(data) {
            res.send(data)
        });
    });
    
}

exports.updateOfferList = function(req,res){
    console.log(req.session.sess);
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    OfferList.updateOfferList(params.id, params.person,params.time,function(){
        OfferList.findAllOfferList(null,null,null,function(data) {
            res.send(data)
        });
    });
}
