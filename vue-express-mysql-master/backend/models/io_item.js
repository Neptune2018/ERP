var Sequelize = require('sequelize');
var db = require('./index').DB;
var Product = require('./product');
var Material = require('./material');
var IOList = require('./io_list');

// 创建 model
var IOItem = db.define('io_item', {
    style: {
        type: Sequelize.BOOLEAN // true为货品
    },
    place: {
        type: Sequelize.INTEGER
    },
    quantity: {
        type: Sequelize.INTEGER
    },
    unit: {
        type: Sequelize.STRING
    },
    batch: {
        type: Sequelize.STRING
    }
    // 没有指定 field，表中键名称则与对象键名相同，为 email
}, {
    // 如果为 true 则表的名称和 model 相同，即 user
    // 为 false MySQL创建的表名称会是复数 users
    // 如果指定的表名称本就是复数形式则不变
    freezeTableName: false
});

IOList.hasMany(IOItem);

// 前者将拥有后者的get/set/add方法,后者id是前者外键
IOItem.belongsTo(Product);
IOItem.belongsTo(Material);
IOItem.belongsTo(IOList);

// 创建表
// User.sync() 会创建表并且返回一个Promise对象
// 如果 force = true 则会把存在的表（如果users表已存在）先销毁再创建表
// 默认情况下 forse = false
var ioItem = IOItem.sync({ force: false });

module.exports = IOItem; 