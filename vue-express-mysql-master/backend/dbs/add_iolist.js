var models = require('../models')
const addMaterials = async function(){
  // await models.Material.destroy({where:{}});
  var material1 = await models.IOList.create({
    'id': 241,
		'style': 1,
    'from_person':241,
    'from_person':243
	});
  var material2 = await models.IOList.create({
    'id': 242,
    'style': 1,
    'from_person':242,
    'from_person':244
  });
  var material3 = await models.IOList.create({
    'id': 243,
    'style': 0,
    'from_person':241,
    'from_person':242
  });
  var material4 = await models.IOList.create({
    'id': 244,
    'style': 0,
    'from_person':241,
    'from_person':244
  });
}
