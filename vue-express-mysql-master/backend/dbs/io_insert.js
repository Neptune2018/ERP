var models = require('../models')

//货品/入料入库
//完成这个功能需要操作4张表：
//仓库，库存记录，操作用户，角色权限信息
const insert  = async function(){
    
    await models.Role.destroy({where:{}});
    await models.User.destroy({where:{}});
    await models.Stock.destroy({where:{}});
    await models.Repertory.destroy({where:{}});
    await models.IOItem.destroy({where:{}});
    await models.IOList.destroy({where:{}});

	var buyer = await models.Role.create({
		'name': 'Buyer',
		'describe': '采购管理员，该角色可以控制采购管理模块'
	});
	var keeper = await models.Role.create({
		'name': 'Keeper',
		'describe': '仓库管理员，该角色可以控制仓库管理模块'
	});
    var buyer1 = await models.User.create({
        'name':'buyer1',
        'id':321
    });
    var keeper1 = await models.User.create({
        'name':'keeper1',
        'id':123     
    });
    var repo = await models.Repertory.create({
        'id':1234567,
        'name':'A',
        'max':30
    });
    var stock = await models.Stock.create({
        'id':1,
        'style':1,
        'place': 241,
        'remain': 50,
        'batch': '456789',
        'unit':'ge'
    });
}
insert();