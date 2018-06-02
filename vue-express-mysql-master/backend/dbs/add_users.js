var models = require('../models')

//使用方法
//在当前文件夹中 采用命令 node role_feature.js就能把权限数据插入到数据表中

const addUser = async function(){
	/* await models.User.destroy({where:{}});
	await models.Admin.destroy({where:{}});

	await models.Feature.destroy({where:{}});
	await models.Role.destroy({where:{}});
	await models.HasFeature.destroy({where:{}}); */

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

	var staff = await models.Role.create({
		'name': 'Staff',
		'describe': '员工，该角色可以进入本系统'
	});

	var visitor = await models.Role.create({
		'name': 'Visitor',
		'describe': '游客，该角色无本系统任何权限'
	});

	

	 await accountant.addFeatures([cost]); 
	 await admin.addFeatures([cost, purchase, production, user, keep]); 
	 await buyer.addFeatures([purchase]); 
	 await professionals.addFeatures([production]); 
	 await keeper.addFeatures([keep]);


	var firstUser = await models.User.create({
		'name': '梁晨',
		'phone': '1341450526',
		'email': '32225003@qq.com',
		'job': 'CTO'
	});
	await firstUser.createAdmin({'password': '123456'});
	await firstUser.setRole(admin);

	var User3 = await models.User.create({
		'name': '魏文竹',
		'phone': '13002338561',
		'email': '730040709@qq.com',
		'job': '生产运营师'
	});
	await User3.createAdmin({'password': '123456'});
	await User3.setRole(professionals);

	

	var User2 = await models.User.create({
		'name': '郭杰瑞',
		'phone': '15822004840',
		'email': 'guo97HBK@outlook.com',
		'job': '生产总监'
	});
	await User2.createAdmin({'password': '123456'});
	await User2.setRole(professionals);

	var User4 = await models.User.create({
		'name': 'Mickel',
		'phone': '18343405677',
		'email': 'iloveHB@126.com',
		'job': '生产经理'
	});
	await User4.createAdmin({'password': '123456'});
	await User4.setRole(professionals);

	

	var User13 = await models.User.create({
		'name': '郭牛',
		'phone': '18885023188',
		'email': '10407307@qq.com',
		'job': '生产运营师'
	});
	await User13.createAdmin({'password': '123456'});
	await User13.setRole(professionals);

	

	var User5 = await models.User.create({
		'name': 'Vincy',
		'phone': '18297345666',
		'email': 'Neptune2018@outlook.com',
		'job': '财务总监'
	});
	await User5.createAdmin({'password': '123456'});
	await User5.setRole(accountant);

	var User12 = await models.User.create({
		'name': 'Bo Yeung',
		'phone': '17290233633',
		'email': 'freeme12@163.com',
		'job': '财务分析师'
	});
	await User12.createAdmin({'password': '123456'});
	await User12.setRole(accountant);

	var User6 = await models.User.create({
		'name': '号号',
		'phone': '13046557893',
		'email': 'haohaoYY@163.com',
		'job': '采购总管'
	});
	await User6.createAdmin({'password': '123456'});
	await User6.setRole(buyer);

	var User7 = await models.User.create({
		'name': '张小龙',
		'phone': '13183834563',
		'email': 'allenzh@qq.com',
		'job': '采购顾问'
	});
	await User7.createAdmin({'password': '123456'});
	await User7.setRole(buyer);

	

	var User8 = await models.User.create({
		'name': 'Lisa',
		'phone': '18923024876',
		'email': 'Lisa0109@gmail.com',
		'job': '法务'
	});
	await User8.createAdmin({'password': '123456'});
	await User8.setRole(staff);

	var User9 = await models.User.create({
		'name': '乔纳森·诺兰',
		'phone': '15502034577',
		'email': 'Jonasen@gmail.com',
		'job': '羊区仓主管'
	});
	await User9.createAdmin({'password': '123456'});
	await User9.setRole(keeper);

	var User10 = await models.User.create({
		'name': '汉堡',
		'phone': '13043235772',
		'email': '30334617@qq.com',
		'job': '滨海仓主管'
	});
	await User10.createAdmin({'password': '123456'});
	await User10.setRole(keeper);

	var User11 = await models.User.create({
		'name': 'Morty',
		'phone': '13709872563',
		'email': 'rickC137@gmail.com',
		'job': '文员'
	});
	await User11.createAdmin({'password': '123456'});
	await User11.setRole(staff);


}

addUser();