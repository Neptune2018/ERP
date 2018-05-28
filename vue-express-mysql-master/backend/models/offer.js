var Sequelize = require('sequelize');
var db = require('./index').DB;
var OfferList = require('./offer_list');
var Material = require('./material');

// 物料表和报价单之间的进货关系法
var Offer = db.define('offer', {
    quantity: {
        type: Sequelize.INTEGER // 数量
    },
    batch: {
    	type: Sequelize.STRING // 批次
    },
    price: {
    	type: Sequelize.INTEGER// 单价
    },
    total_price: {
    	type: Sequelize.INTEGER// 总价
    }
    // 没有指定 field，表中键名称则与对象键名相同，为 email
}, {
    // 如果为 true 则表的名称和 model 相同，即 user
    // 为 false MySQL创建的表名称会是复数 users
    // 如果指定的表名称本就是复数形式则不变
    freezeTableName: false
});

// 前者将拥有后者的get/set/add/create/remove/has方法
OfferList.belongsToMany(Material, {through: Offer});

// 前者将拥有后者的get/set/add/create/remove/has方法
Material.belongsToMany(OfferList, {through: Offer});

// 创建表
// User.sync() 会创建表并且返回一个Promise对象
// 如果 force = true 则会把存在的表（如果users表已存在）先销毁再创建表
// 默认情况下 forse = false
var offer = Offer.sync({ force: false });

module.exports = Offer; 