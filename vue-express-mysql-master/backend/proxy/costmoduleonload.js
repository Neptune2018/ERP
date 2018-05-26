var Stock = require('../models').Stock
var Product = require('../models').Product
var db = require('../models/index').DB;

// 通过用户名查找用户
exports.findAll = function(dosomething) {

    var sqlquery1="select product.id as product_table_product_number,product.name as product_table_name,product.price as product_table_price,stock.batch as product_table_batch,stock.remain as product_table_number,stock.unit as product_table_unit,stock.repertoryId as product_table_warehouse from stocks as stock left outer join products as product on stock.productId=product.id WHERE stock.style=1;"

    db.query(sqlquery1).then(function(tests){        
        	dosomething(tests);
        });
};