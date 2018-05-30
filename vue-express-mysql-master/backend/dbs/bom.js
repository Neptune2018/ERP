var models = require('../models')

// ²åÈë²âÊÔÓÃ»§ÐÅÏ¢

const addBOM = async function(){
	await models.MaterCate.destroy({where:{}});
	await models.Material.destroy({where:{}});
	await models.ProductCate.destroy({where:{}});
	await models.Product.destroy({where:{}});
	await models.Consist.destroy({where:{}});


	var matercate1 = await models.MaterCate.create({
		'id': 1000,
		'name': '螺丝系列',
		'materCateId': null
	});

	var matercate2 = await models.MaterCate.create({
		'id': 1001,
		'name': '1型螺丝',
		'materCateId': 1000
	});

	var matercate3 = await models.MaterCate.create({
		'id': 1002,
		'name': '2型螺丝',
		'materCateId': 1000
	});

	var productcate1 = await models.ProductCate.create({
		'id': 1000,
		'name': '对空机枪系列',
		'materCateId': null
	});

	var productcate2 = await models.ProductCate.create({
		'id': 1001,
		'name': '7.7mm口径',
		'materCateId': 1000
	});

	var productcate3 = await models.ProductCate.create({
		'id': 1002,
		'name': '12mm口径',
		'materCateId': 1000
	});

	var mat1 = await models.Material.create({
		'id': 1001,
		'name': '35.6cm联装螺丝',
		'status': 0,
		'property': '原料',
		'materCateId': 1001
	});

	var mat2 = await models.Material.create({
		'id': 1002,
		'name': '试制41cm三联装螺丝',
		'status': 0,
		'property': '原料',
		'materCateId': 1002
	});

	var prod1 = await models.Product.create({
		'id': 1001,
		'name': '12mm30联装喷进炮',
		'status': 0,
		'price': 500,
		'remark': '小心走火',
		'materCateId': 1002
	});

	var prod2 = await models.Product.create({
		'id': 1002,
		'name': '7.7mm单装机枪',
		'status': 0,
		'price': 200,
		'remark': '小心走火',
		'materCateId': 1001
	});

	var Consist1 = await models.Consist.create({
		'quantity': 20,
		'productId': 1002,
		'materialId': 1001
	});

	var Consist2 = await models.Consist.create({
		'quantity': 30,
		'productId': 1002,
		'materialId': 1002
	});

	var Consist3 = await models.Consist.create({
		'quantity': 40,
		'productId': 1001,
		'materialId': 1001
	});

	var Consist4 = await models.Consist.create({
		'quantity': 60,
		'productId': 1001,
		'materialId': 1002
	});

}
addBOM();