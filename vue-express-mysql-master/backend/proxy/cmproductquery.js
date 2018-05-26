var Stock = require('../models').Stock
var Product = require('../models').Product
var db = require('../models/index').DB;

// 通过用户名查找用户
exports.findAll = function(dosomething,sqlquery1) {
    
    db.query(sqlquery1).then(function(tests){        
        	dosomething(tests);
        });
};