var User = require('../models').User;
var Admin = require('../models').Admin;
var db = require('../models/index').DB;



// 通过用户名查找用户
exports.showUser = function(id, dosomething) {
    User.findAll({where: {id: id}}).then(function(data){
    	dosomething(data);
    });
};

// 更新用户信息



exports.updateUser = function( data) {
    sql="update users set roleId=(select Id from roles where name='"+data[4]+"')where id='"+data[0]+"';"
    db.query(sql);

    User.update({
		'name': data[1],
		'phone': data[3],
		'email': data[2],
		'job': data[5]
	},
	{
		where: {id: data[0]}
    });
    
}

// 修改密码
exports.changePass = function(data) {
	if(data[6]!=''){
		Admin.update({
			'password': data[6]
		},
		{
			where: {userId: data[0]}
		});
	}
}
exports.modifyUIFandPass=function(data){
    updateUser(data);
    changePass(data)
}

