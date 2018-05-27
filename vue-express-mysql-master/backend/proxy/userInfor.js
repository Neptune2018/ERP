var User = require('../models').User;
var Admin = require('../models').Admin;


// 通过用户名查找用户
exports.showUser = function(dosomething) {
    User.findAll({where: {name: '用户14'}}).then(function(data){
    	dosomething(data);
    });
};

// 更新用户信息
exports.updateUser = function(data) {
	User.update({
		'name': data.name,
		'phone': data.phone,
		'email': data.email,
		'job': data.job
	},
	{
		where: {name: '用户14'}
	});
}

// 修改密码
exports.changePass = function(indata, dosomething) {
	Admin.findAll({where: {password: indata.oldPass}}).then(function(data){
    	dosomething(data);
    });
	Admin.update({
		'password': indata.newPass
	},
	{
		where: {password: indata.oldPass}
	});
}