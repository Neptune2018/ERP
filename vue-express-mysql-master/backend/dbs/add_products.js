/**
  在出入库信息中显示
  【注意！！】需要先于ioitem和iolist两个js文件执行
**/
var models = require('../models')
const addProducts = async function(){
  // await models.Product.destroy({where:{}});
  var material1 = await models.Product.create({
    'id': 241,
    'style':1,
		'name': 'EB38 PCB上线',
		'price': 500
	});
  var material2 = await models.Product.create({
    'id': 242,
    'style':1,
    'name': 'yy弹力绳',
    'price': 500
  });
  var material3 = await models.Product.create({
    'id': 243,
    'style':1,
    'name': '磁保持继电器',
    'price': 500
  });
  var material4 = await models.Product.create({
    'id': 244,
    'style':1,
    'name': 'PBE晶体管',
    'price': 500
  });
  var material5 = await models.Product.create({
    'id': 245,
    'style':1,
    'name': '0603电阻',
    'price': 500
  });
  var material6 = await models.Product.create({
    'id': 246,
    'style':1,
    'name': '伦斯木箱',
    'price': 500
  });

}
module.exports = {
	addProducts: addProducts
}
