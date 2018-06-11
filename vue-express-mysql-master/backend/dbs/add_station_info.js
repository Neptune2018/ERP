/**
  在仓库基本信息列表中显示
**/
var models = require('../models')
const addStations = async function(){
  // await models.Material.destroy({where:{}});
  var station1 = await models.Stations.create({
    // 'id': 241,
		'name': '北一仓库',
    'userId': 244,
    'managerId':241
	});
}
addStations();
