var models = require('../models')

//使用方法
//在当前文件夹中 采用命令 node role_feature.js就能把权限数据插入到数据表中

const addUser = async function(){
	await models.User.destroy({where:{}});
	await models.Admin.destroy({where:{}});

	await models.Feature.destroy({where:{}});
	await models.Role.destroy({where:{}});
	await models.HasFeature.destroy({where:{}});

	var cost = await models.Feature.create({
		'name': 'Cost',
		'describe': '成本权限，此权限可以操作成本管理模块'
	});

	var purchase = await models.Feature.create({
		'name': 'Purchase',
		'describe': '采购权限，此权限可以操作采购管理模块'
	});

	var production = await models.Feature.create({
		'name': 'Production',
		'describe': '生产权限，此权限可以操作生产管理模块'
	});

	var keep = await models.Feature.create({
		'name': 'Keep',
		'describe': '仓储权限，此权限可以操作仓库管理模块'
	});

	var user = await models.Feature.create({
		'name': 'User',
		'describe': '用户权限，此权限可以操作用户管理模块'
	});



	var accountant = await models.Role.create({
		'name': 'Accountant',
		'describe': '成本管理员，该角色可以控制成本管理模块'
	});

	var admin = await models.Role.create({
		'name': 'Admin',
		'describe': '管理员，拥有生产管理系统的最高权限'
	});

	var buyer = await models.Role.create({
		'name': 'Buyer',
		'describe': '采购管理员，该角色可以控制采购管理模块'
	});

	var professionals = await models.Role.create({
		'name': 'Professional',
		'describe': '生产管理员，该角色可以控制生产管理模块'
	});

	var keeper = await models.Role.create({
		'name': 'Keeper',
		'describe': '仓库管理员，该角色可以控制仓库管理模块'
	});

	var visitor = await models.Role.create({
		'name': 'Visitor',
		'describe': '游客，该角色无本系统任何权限'
	});

	var staff = await models.Role.create({
		'name': 'Staff',
		'describe': '员工，该角色可以进入本系统'
	});

	 await accountant.addFeatures([cost]); 
	 await admin.addFeatures([cost, purchase, production, user, keep]); 
	 await buyer.addFeatures([purchase]); 
	 await professionals.addFeatures([production]); 
	 await keeper.addFeatures([keep]);


	var firstUser = await models.User.create({
		'name': 'liangchen',
		'phone': '123456',
		'email': '@qq.com',
		'job': ''
	});

	await firstUser.createAdmin({'password': '123456'});

	await firstUser.setRole(admin);
}

addUser();