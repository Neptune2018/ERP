var config = require('../config');
var fs = require('fs');
var path = require('path');
var Purchase = require('../proxy').Purchase;
var Material = require('../proxy').Material;
var url = require('url');

exports.addSupplier = function(req, res) {
	console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    Purchase.addSupplier(params.name,params.phone,params.person,params.remark,function(data){
        Purchase.findAllSupplier(function(data) {
            res.send(data)
        });
    });
    
}

exports.getSupplier = function(req, res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    suppliers = Purchase.findAllSupplier(function(data) {
		res.send(data)
	});
}

exports.getSupplierByName = function(req, res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    supplier = Purchase.findSupplierByName(params.name,function(data) {
		res.send(data)
	});
}

exports.getSupplierById = function(req, res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    supplier = Purchase.findSupplierById(params.id,function(data) {
		res.send(data)
	});
}

exports.deleteSupplierByName = function(req, res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    Purchase.deleteSupplierByName(params.name,function(data){
        suppliers = Purchase.findAllSupplier(function(data) {
            res.send(data)
        });
    });
}

exports.deleteSupplierById = function(req, res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    Purchase.deleteSupplierById(params.id,function(data){
        suppliers = Purchase.findAllSupplier(function(data) {
            res.send(data)
        });
    });
}

exports.updateSupplierByName = function(req, res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    Purchase.updateSupplierByName(params.from_name,params.name,params.phone,params.person,params.remark,function(data){
        suppliers = Purchase.findAllSupplier(function(data) {
            res.send(data)
        });
    });
}

exports.updateSupplierById = function(req, res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    Purchase.updateSupplierById(params.id,params.name,params.phone,params.person,params.remark,function(data){
        suppliers = Purchase.findAllSupplier(function(data) {
            res.send(data)
        });
    });
}

exports.getOfferList = function(req,res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    Purchase.findAllOfferList(function(data) {
		res.send(data)
	});
}

exports.getOfferListById = function (req,res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    Purchase.findOfferListByID(params.id,function(data) {
		res.send(data)
	});
}

exports.getOfferListBySupplier = function (req,res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    Purchase.findAllOfferListBySupplier(params.id,function(data) {
		res.send(data)
	});
}

exports.addOfferList = function(req,res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    Purchase.addOfferList(params.name,params.from_user,params.to_user,params.time,params.materials,function(data){
        Purchase.findAllOfferList(function(data) {
            res.send(data)
        });
    });
    
}

exports.deleteOfferList = function(req,res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    Purchase.deleteOfferList(params.id,function(data){
        Purchase.findAllOfferList(function(data) {
            res.send(data)
        });
    });
    
}

exports.updateOfferList = function(req,res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    Purchase.updateOfferList(params.id,params.name,params.from_user,params.body.to_user,params.time,params.materials,function(){
        Purchase.findOfferListByID(params.id,function(data) {
            res.send(data)
        });
    });
}

exports.setMinOrder = function(req, res){
    console.log(req.session.sess);
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    Purchase.setMinOrder(params.name,params.id,params.quantity,function(data){
        Material.findMaterialBySupplier(+params.limit,+params.page,params.name,function(data) {
            res.send(data);
        });
    });
    
}

exports.getMaterials = function(req, res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    Material.findAllMaterial(+params.limit,+params.page,function(data) {
		res.send(data)
	});
}

exports.getMaterialsBySupplier = function(req, res){
    console.log(req.session.sess);
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    Material.findMaterialBySupplier(+params.limit,+params.page,params.name, function(data) {
		res.send(data);
	});
};

exports.getStarve = function(req, res){
    console.log(req.session.sess);
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    console.log(params)
    countPerPage = params.limit;
    currentPage = params.page;
    Material.findStarve(function(data) {
        Material.findNOStarve(function(result){
            var temp = data.data;
            for(i=0;i<result.count;i++){
                result.data[i].sum_quantity = 0;
                temp.push(result.data[i]);
            }
            
            var rows = new Array();
            for(i=0;i<countPerPage;i++){
                if( i + countPerPage * (currentPage - 1) < temp.length )
                    rows[i] = temp[i + countPerPage * (currentPage - 1)] 
            }
            results = {
                count: data.count+result.count,
                data: rows
            };
            res.send(results);
        });
		
	});
};

exports.setSafeQuantity = function(req, res){
    console.log(req.session.sess);
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    Material.setSafeQuantity(params.id,params.quantity,function(data){
        Material.findAllMaterial(function(data) {
            res.send(data);
        });
    });
};
