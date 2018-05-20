// var mongoose = require('mongoose');
// var config   = require('../config');

// mongoose.connect(config.db, {
//   server: {poolSize: 20}
// }, function (err) {
//   if (err) {
//      console.log('database error')
//   }
// });

// require('./testdb')
// console.log('database connection')

// exports.Test = mongoose.model('Test');

// db.js

var Sequelize = require('sequelize');
var db   = require('../config').db;

/*
// new Sequelize(database, [username=null], [password=null], [options={}])
// class Sequelize 接收4个参数，后三个参数是可选的

// 通过uri连接数据库
var sequelize = new Sequelize('mysql://localhost:3306/database', {})
*/

exports.DB = new Sequelize(db.database, db.user, db.password, {
    host: db.host, // 数据库地址
    dialect: db.dialect, // 指定连接的数据库类型
    pool: db.pool
});

console.log('database connection')

exports.Test = require('./testdb');
exports.MaterCate = require('./mater_cate');
exports.Material = require('./material');
exports.ProductCate = require('./product_cate');
exports.Product = require('./product');
exports.Consist = require('./consist');
exports.Repertory = require('./repertory');
exports.Stock = require('./stock');
exports.Supplier = require('./supplier');
exports.Role = require('./role');
exports.User = require('./user');
exports.Admin = require('./admin');
exports.OfferList = require('./offer_list');
exports.MinOrder = require('./min_order');
exports.Offer = require('./offer');
exports.Feature = require('./feature');
exports.HasFeature = require('./has_feature');
exports.IOList = require('./io_list');
exports.IOItem = require('./io_item');
exports.OrderList = require('./order_list');
exports.Buy = require('./buy');
exports.Station = require('./station');
exports.GetList = require('./get_list');
exports.Get = require('./get');