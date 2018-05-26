var Stock = require('../models').Stock
var Offer = require('../models').Offer
var db = require('../models/index').DB;

// 通过用户名查找用户
exports.findAll = function(dosomething) {

    var sqlquery1="select stock.materialId as matrial_table_matrial_number,material.name as matrial_table_name,offer.price as matrial_table_price,stock.batch as matrial_table_batch,stock.remain as matrial_table_number,stock.unit as matrial_table_unit,stock.repertoryId as matrial_table_warehouse,suppliers.name as matrial_table_supplier from stocks as stock left outer join offers as offer on stock.batch=offer.batch and stock.materialId=offer.materialId left outer join materials as material on stock.materialId=material.id left outer join offer_lists on offer.offerListId=offer_lists.id left outer join suppliers on offer_lists.supplierId=suppliers.id WHERE stock.style=0;"
    
    db.query(sqlquery1).then(function(tests){ 
            //console.log(tests)       
        	dosomething(tests)
        });
};