var User = require('../models').User;
var Admin = require('../models').Admin;
var db = require('../models/index').DB;
var models = require('../models')



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

exports.RemoveUser = function( data) {
    

    User.destroy({
		
	
		where: {id: data[0]}
	});
	
	console.log('remove user '+data[0])
    
}


exports.RemovePass = function( data) {
    

    Admin.destroy({
		
	
		where: {userId: data[0]}
	});
	
	console.log('remove admin '+data[0])
	
	
}


exports.addUser = async function( data) {
    
	var testuser = await models.User.findOne({
		where: {phone: data[3]}
	});
	console.log(testuser)
	if(testuser!=null)return;
	
	var role = await models.Role.findOne({
		where: {name: data[4]}
	});
	console.log(role)
	console.log(role.name)
    var newUser = await User.create({
		'name': data[1],
		'phone':  data[3],
		'email':  data[2],
		'job': data[5],
		'roleId':role.id
	});

	console.log('create user '+data[1])
	
	if(data[4]!='Staff'){await newUser.createAdmin({'password': data[6]});}
	
	
	
	console.log('create admin '+data[1])
    
}


// exports.addPass = function( data) {
    

//     Admin.create({
		
	
		
// 	});
	
// 	console.log('create admin '+data[1])
    
// }

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

