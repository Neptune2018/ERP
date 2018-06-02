var models = require('../models')

// 插入测试用户信息

const buildUsers = async function(){
	/* await models.User.destroy({where:{}});
	await models.Admin.destroy({where:{}});
 */
	var testUser = await models.User.create({
		'name': '用户1',
		'phone': '15111111111',
		'email': 'user1@126.com',
		'job': '老大'
	});

	var testPass = await models.Admin.create({
		'password': 'qwertyuiop'
	})

}

buildUsers();