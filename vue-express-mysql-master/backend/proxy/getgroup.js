var User = require('../models').User;
var Role = require('../models').Role;
var db = require('../models/index').DB;



//
exports.findAl = function(dosomething) {
    
    var sql="select roles.name,count(*)as num,roles.describe  from roles join users on users.roleId=roles.id group by roles.name ;"

    db.query(sql).then(function(tests){
    	dosomething(tests);
    });
    
   
};

exports.singleonload = function(dosomething,group) {
    
    var sql="select * from users where roleId=(select Id from roles where name ='"+group+"');"
    console.log(sql)
    db.query(sql).then(function(tests){
    	dosomething(tests);
    });
    
   
};

exports.searchuser = function(dosomething,sql) {
    
    
    console.log(sql)
    db.query(sql).then(function(tests){
    	dosomething(tests);
    });
    
   
};

