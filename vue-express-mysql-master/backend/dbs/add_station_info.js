var models = require('../models')
const addMaterials = async function(){
  // await models.Material.destroy({where:{}});
  var material1 = await models.Stations.create({
    // 'id': 241,
		'name': '北一仓库',
    'userId': 244,
    'managerId':241
	});
}
