var User = require('../models').User;
var Admin = require('../models').Admin;


// 通过用户名查找用户
exports.showUser = function(id, dosomething) {
    User.findAll({where: {id: id}}).then(function(data){
    	dosomething(data);
    });
};

// 更新用户信息
exports.updateUser = function(id, data) {
	User.update({
		'name': data.name,
		'phone': data.phone,
		'email': data.email,
		'job': data.job
	},
	{
		where: {id: id}
	});
}

// 修改密码
exports.changePass = function(id, indata, dosomething) {
	Admin.findAll({where: {id: id, password: indata.oldPass}}).then(function(data){
    	dosomething(data);
    });
	Admin.update({
		'password': indata.newPass
	},
	{
		where: {id: id, password: indata.oldPass}
	});
}