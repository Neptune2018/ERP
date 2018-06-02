var config = require('../config');
var fs = require('fs');
var path = require('path');
var Purchase = require('../proxy').Purchase;
var Supplier = require('../proxy').Supplier;
var Material = require('../proxy').Material;
var url = require('url');

exports.addSupplier = function(req, res) {
	console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    Supplier.addSupplier(params.name,params.phone,params.person,params.remark,function(data){
        Supplier.findAllSupplier(null,null,null,function(data) {
            res.send(data)
        });
    });
    
}

exports.getSupplier = function(req, res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    suppliers = Supplier.findAllSupplier(params.id,params.name,params.person,function(data) {
		res.send(data)
	});
}

// exports.getSupplierByName = function(req, res){
//     console.log(req.session.sess)
//     req.session.sess = 'yes';
//     var params = url.parse(req.url, true).query;
//     supplier = Supplier.findSupplierByName(params.name,function(data) {
// 		res.send(data)
// 	});
// }

exports.getSupplierById = function(req, res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    supplier = Supplier.findSupplierById(params.id,function(data) {
		res.send(data)
	});
}

// exports.deleteSupplierByName = function(req, res){
//     console.log(req.session.sess)
//     req.session.sess = 'yes';
//     var params = url.parse(req.url, true).query;
//     Supplier.deleteSupplierByName(params.name,function(data){
//         suppliers = Supplier.findAllSupplier(null,null,null,function(data) {
//             res.send(data)
//         });
//     });
// }

exports.deleteSupplierById = function(req, res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    Supplier.deleteSupplierById(params['id[]'],function(data){
        suppliers = Supplier.findAllSupplier(null,null,null,function(data) {
            res.send(data)
        });
    });
}

// exports.updateSupplierByName = function(req, res){
//     console.log(req.session.sess)
//     req.session.sess = 'yes';
//     var params = url.parse(req.url, true).query;
//     Supplier.updateSupplierByName(params.from_name,params.name,params.phone,params.person,params.remark,function(data){
//         suppliers = Supplier.findAllSupplier(null,null,null,function(data) {
//             res.send(data)
//         });
//     });
// }

exports.updateSupplierById = function(req, res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    Supplier.updateSupplierById(params.id,params.name,params.phone,params.person,params.remark,function(data){
        suppliers = Supplier.findAllSupplier(null,null,null,function(data) {
            res.send(data)
        });
    });
}

exports.getAllUserIdAndName = function(req, res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    Supplier.getAllUserIdAndName(function(data){
            res.send(data)
    });
}

exports.addMaterialsToSupplier = function(req, res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    console.log(params.materialid, params.id,params.quantity)
    Supplier.addMaterialsToSupplier(params.id, params.materialid, params.quantity,function(data){
        if(data){
            Material.findMaterialBySupplier(params.id,null,null,null, function(data) {
                res.send(JSON.stringify(data));
            });
        }else{
            res.send('0')
        }
    })
}

exports.removeMaterialsFromSupplier = function(req, res){
    console.log(req.session.sess)
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    Supplier.removeMaterialsFromSupplier(params.id, params['materialid[]'], function(data){
        Material.findMaterialBySupplier(params.id,null,null,null, function(data) {
            console.log(data)
            res.send(JSON.stringify(data));
        });
    })
}

exports.setMinOrder = function(req, res){
    console.log(req.session.sess);
    req.session.sess = 'yes';
    var params = url.parse(req.url, true).query;
    Supplier.setMinOrder(params.id,params['materialid[]'],params.quantity,function(data){
        Material.findMaterialBySupplier(params.id,null,null,null, function(data) {
            res.send(JSON.stringify(data));
        });
    });
    
}
