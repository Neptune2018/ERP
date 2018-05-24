var config = require('../config');
var fs = require('fs');
var path = require('path');
var Purchase = require('../proxy').Purchase;
var Material = require('../proxy').Material;

exports.addSupplier = function(req, res) {
	console.log(req.session.sess)
    req.session.sess = 'yes';
    console.log(req.body)
    Purchase.addSupplier(req.body.name,req.body.phone,req.body.person,req.body.remark,function(data){
        Purchase.findAllSupplier(function(data) {
            res.send(data)
        });
    });
    
}

exports.getSupplier = function(req, res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    suppliers = Purchase.findAllSupplier(function(data) {
		res.send(data)
	});
}

exports.getSupplierByName = function(req, res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    supplier = Purchase.findSupplierByName(req.body.name,function(data) {
		res.send(data)
	});
}

exports.getSupplierById = function(req, res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    supplier = Purchase.findSupplierById(req.body.id,function(data) {
		res.send(data)
	});
}

exports.deleteSupplierByName = function(req, res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    Purchase.deleteSupplierByName(req.body.name,function(data){
        suppliers = Purchase.findAllSupplier(function(data) {
            res.send(data)
        });
    });
}

exports.deleteSupplierById = function(req, res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    Purchase.deleteSupplierById(req.body.id,function(data){
        suppliers = Purchase.findAllSupplier(function(data) {
            res.send(data)
        });
    });
}

exports.updateSupplierByName = function(req, res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    Purchase.updateSupplierByName(req.body.from_name,req.body.name,req.body.phone,req.body.person,req.body.remark,function(data){
        suppliers = Purchase.findAllSupplier(function(data) {
            res.send(data)
        });
    });
}

exports.updateSupplierById = function(req, res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    Purchase.updateSupplierById(req.body.id,req.body.name,req.body.phone,req.body.person,req.body.remark,function(data){
        suppliers = Purchase.findAllSupplier(function(data) {
            res.send(data)
        });
    });
}

exports.getOfferList = function(req,res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    Purchase.findAllOfferList(function(data) {
		res.send(data)
	});
}

exports.getOfferListById = function (req,res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    Purchase.findOfferListByID(req.body.id,function(data) {
		res.send(data)
	});
}

exports.getOfferListBySupplier = function (req,res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    Purchase.findAllOfferListBySupplier(req.body.id,function(data) {
		res.send(data)
	});
}

exports.addOfferList = function(req,res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    Purchase.addOfferList(req.body.name,req.body.from_user,req.body.to_user,req.body.time,req.body.materials,function(data){
        Purchase.findAllOfferList(function(data) {
            res.send(data)
        });
    });
    
}

exports.deleteOfferList = function(req,res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    Purchase.deleteOfferList(req.body.id,function(data){
        Purchase.findAllOfferList(function(data) {
            res.send(data)
        });
    });
    
}

exports.updateOfferList = function(req,res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    Purchase.updateOfferList(req.body.id,req.body.name,req.body.from_user,req.body.body.to_user,req.body.time,req.body.materials,function(){
        Purchase.findOfferListByID(req.body.id,function(data) {
            res.send(data)
        });
    });
}

exports.setMinOrder = function(req, res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    Purchase.setMinOrder(req.body.name,req.body.id,req.body.quantity,function(data){
        Material.findMaterialBySupplier(req.body.name,function(data) {
            res.send(data)
        });
    });
    
}

exports.getMaterials = function(req, res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    Material.findAllMaterial(function(data) {
		res.send(data)
	});
}

exports.getMaterialsBySupplier = function(req, res){
    console.log(req.session.sess);
    req.session.sess = 'yes';
    Material.findMaterialBySupplier(req.body.name, function(data) {
		res.send(data);
	});
};

exports.getStarve = function(req, res){
    console.log(req.session.sess);
    req.session.sess = 'yes';
    Material.findStarve(function(data) {
		res.send(data);
	});
};

exports.setSafeQuantity = function(req, res){
    console.log(req.session.sess);
    req.session.sess = 'yes';
    Material.setSafeQuantity(req.body.id,req.body.quantity,function(data){
        Material.findAllMaterial(function(data) {
            res.send(data);
        });
    });
};
