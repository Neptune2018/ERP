/**
  在出入库信息中显示
  【注意！！】需要先于add_ioitem.js文件执行
**/
var models = require('../models')
const addIOList = async function(){
  // await models.Material.destroy({where:{}});
  var material1 = await models.IOList.create({
    'id': 241,
		'style': 1,
    'fromPersonId':241,
    'toPersonId':243
	});
  var material2 = await models.IOList.create({
    'id': 242,
    'style': 1,
    'fromPersonId':242,
    'toPersonId':244
  });
  var material3 = await models.IOList.create({
    'id': 243,
    'style': 0,
    'fromPersonId':241,
    'toPersonId':242
  });
  var material4 = await models.IOList.create({
    'id': 244,
    'style': 0,
    'fromPersonId':241,
    'toPersonId':244
  });
}
module.exports = {
	addIOList: addIOList
}

