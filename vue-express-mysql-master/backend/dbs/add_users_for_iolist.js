/**
  在出入库信息的fromPerson 和 toPerson字段中显示
**/
var models = require('../models')
const addUserforIOList = async function(){
  // await models.Material.destroy({where:{}});
  var material1 = await models.User.create({
    'id': 241,
		'name': 'Tony'
	});
  var material2 = await models.User.create({
    'id': 242,
    'name': 'Kate'
  });
  var material3 = await models.User.create({
    'id': 243,
    'name': 'John'
  });
  var material4 = await models.User.create({
    'id': 244,
    'name': 'Christin'
  });
}
addUserforIOList();
