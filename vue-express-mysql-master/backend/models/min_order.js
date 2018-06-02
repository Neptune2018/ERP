var Sequelize = require('sequelize');
var db = require('./index').DB;
var Supplier = require('./supplier');
var Material = require('./material');

// 创建 model 
var MinOrder = db.define('min_order', {
    quantity: {
        type: Sequelize.INTEGER // 起订点
    }
    // 没有指定 field，表中键名称则与对象键名相同，为 email
}, {
    // 如果为 true 则表的名称和 model 相同，即 user
    // 为 false MySQL创建的表名称会是复数 users
    // 如果指定的表名称本就是复数形式则不变
    freezeTableName: false
});

// 前者将拥有后者的get/set/add/create/remove/has方法
Supplier.belongsToMany(Material, {through: MinOrder});

// 前者将拥有后者的get/set/add/create/remove/has方法
Material.belongsToMany(Supplier, {through: MinOrder});

// 创建表
// User.sync() 会创建表并且返回一个Promise对象
// 如果 force = true 则会把存在的表（如果users表已存在）先销毁再创建表
// 默认情况下 forse = false
var minOrder = MinOrder.sync({ force: false });

module.exports = MinOrder; 