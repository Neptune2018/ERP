var Sequelize = require('sequelize');
var db = require('./index').DB;
var User = require('./user');
var OrderList = require('./order_list');
var Station = require('./station');
var Repertory = require('./repertory');

// 领退料单
var GetList = db.define('get_list', {
    time: {
        type: Sequelize.DATE    // 领退料时间 
    },
    style: {
    	type: Sequelize.BOOLEAN	// 区分是领是退，true为领
    },
    // 没有指定 field，表中键名称则与对象键名相同，为 email
}, {
    // 如果为 true 则表的名称和 model 相同，即 user
    // 为 false MySQL创建的表名称会是复数 users
    // 如果指定的表名称本就是复数形式则不变
    freezeTableName: false
});

OrderList.hasMany(GetList);
Repertory.hasMany(GetList);
Station.hasMany(GetList);

// 前者将拥有后者的get/set/add方法,后者id是前者外键
GetList.belongsTo(User, {as: 'from_person'});
GetList.belongsTo(User, {as: 'to_person'});
GetList.belongsTo(OrderList);
GetList.belongsTo(Station);
GetList.belongsTo(Repertory);

// 创建表
// User.sync() 会创建表并且返回一个Promise对象
// 如果 force = true 则会把存在的表（如果users表已存在）先销毁再创建表
// 默认情况下 forse = false
var getList = GetList.sync({ force: false });

module.exports = GetList; 