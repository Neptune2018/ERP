var models = require('../models')

//使用方法
//在当前文件夹中 采用命令 node role_feature.js就能把权限数据插入到数据表中

const addSupplier = async function(){
	await models.User.destroy({where:{}});


	var Supplier1 = await models.Supplier.create({
		'name': '众汇有限责任公司',
        'phone': '12334445678',
        'person':'张三',
        'remark': 'xx原料供应商'
	});
    var Supplier2 = await models.Supplier.create({
		'name': '阳驰有限责任公司',
        'phone': '12332344223',
        'person':'李四',
        'remark': 'xx原料供应商'
	});
	var Supplier3 = await models.Supplier.create({
		'name': '卓宇有限责任公司',
        'phone': '12344442378',
        'person':'王五',
        'remark': 'xx原料供应商'
	});
    var Supplier4 = await models.Supplier.create({
		'name': '丹文有限责任公司',
        'phone': '12323446789',
        'person':'小强',
        'remark': 'xx原料供应商'
    });
    var Supplier5 = await models.Supplier.create({
		'name': '高德有限责任公司',
        'phone': '12323234456',
        'person':'周鸿煊',
        'remark': 'xx原料供应商'
    });
    var Supplier6 = await models.Supplier.create({
		'name': '智宸有限责任公司',
        'phone': '12323489076',
        'person':'李立诚',
        'remark': 'xx原料供应商'
    });
    var Supplier7 = await models.Supplier.create({
		'name': '弘文有限责任公司',
        'phone': '12323445678',
        'person':'张弘文',
        'remark': 'xx原料供应商'
	});
	
}

addSupplier();