/**
  在库存情况列表中显示
**/
var models = require('../models')
const addStocks = async function(){
  // await models.Product.destroy({where:{}});
  var product1 = await models.Stock.create({
    'id':241,
    'style':1,
    'productId': 241,
		'remain': 50,
    'batch': '456789'
	});
  var product2 = await models.Stock.create({
    'id': 242,
    'style':1,
    'productId': 242,
    'remain': 50,
    'batch': '456789'
  });
  var product3 = await models.Stock.create({
    'id': 243,
    'style':1,
    'productId': 243,
    'remain': 100,
    'batch': '456789'
  });
  var product4 = await models.Stock.create({
    'id': 244,
    'style':1,
    'productId': 244,
    'remain': 500,
    'batch': '456789'
  });
  var product5 = await models.Stock.create({
    'id': 245,
    'style':1,
    'productId': 245,
    'name': '0603电阻',
    'remain': 700,
    'batch': '456789'
  });
  var product6 = await models.Stock.create({
    'id': 246,
    'style':1,
    'productId': 246,
    'remain': 550,
    'batch': '456789'
  });
  var material1 = await models.Stock.create({
    'id': 2241,
    'style':0,
    'materialId': 241,
    'remain':20,
		'batch': '456789'
	});
  var material2 = await models.Stock.create({
    'id': 2242,
    'style':0,
    'materialId': 242,
    'remain':202,
    'batch': '456789'
  });
  var material3 = await models.Stock.create({
    'id': 2243,
    'style':0,
    'materialId': 243,
    'remain':40,
    'batch': '456789'
  });
  var material4 = await models.Stock.create({
    'id': 2244,
    'style':0,
    'materialId': 244,
    'remain':520,
    'batch': '456789'
  });
  var material5 = await models.Stock.create({
    'id': 2245,
    'style':0,
    'materialId': 245,
    'remain':880,
    'batch': '456789'
  });
  var material6 = await models.Stock.create({
    'id': 2246,
    'style':0,
    'materialId': 246,
    'remain':20,
    'batch': '456789'
  });
}

module.exports = {
	addStocks: addStocks
}
