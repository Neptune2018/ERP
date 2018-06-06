/**
  在出入库信息中显示
  【注意！！】需要先于ioitem和iolist两个js文件执行
**/
var models = require('../models')
const addMaterials = async function(){
  // await models.Material.destroy({where:{}});
  var material1 = await models.Material.create({
    'id': 241,
		'name': 'EB38 PCB上线',
		'safe_quantity': 500
	});
  var material2 = await models.Material.create({
    'id': 242,
    'name': 'yy弹力绳',
    'safe_quantity': 500
  });
  var material3 = await models.Material.create({
    'id': 243,
    'name': '磁保持继电器',
    'safe_quantity': 500
  });
  var material4 = await models.Material.create({
    'id': 244,
    'name': 'PBE晶体管',
    'safe_quantity': 500
  });
  var material5 = await models.Material.create({
    'id': 245,
    'name': '0603电阻',
    'safe_quantity': 500
  });
  var material6 = await models.Material.create({
    'id': 246,
    'name': '伦斯木箱',
    'safe_quantity': 500
  });

}
addMaterials();
