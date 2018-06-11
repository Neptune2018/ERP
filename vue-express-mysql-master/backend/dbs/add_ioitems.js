/**
  在出入库信息中显示
  【注意！！】需要在add_ioitem.js、add_material.js、add_products.js两个js文件执行
**/
var models = require('../models')
const addIOItem = async function(){
  // await models.Material.destroy({where:{}});
  var material1 = await models.IOItem.create({
    'id': 241,
		'style': 1,
    'quantity': 200,
    'ioListId':241,
    'productId':241
	});
  var material2 = await models.IOItem.create({
    'id': 242,
    'style': 1,
    'quantity': 280,
    'ioListId':241,
    'productId':242
  });
  var material3 = await models.IOItem.create({
    'id': 243,
    'style': 0,
    'quantity': 20,
    'ioListId':243,
    'materialId':244
  });
  var material4 = await models.IOItem.create({
    'id': 244,
    'style': 0,
    'quantity': 500,
    'ioListId':244,
    'materialId':246
  });
}
module.exports = {
	addIOItem: addIOItem
}
