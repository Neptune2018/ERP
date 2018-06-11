var models = require('../models')

//使用方法
//在当前文件夹中 采用命令 node add_cmdata.js就能把成本管理相关数据插入到数据表中


//成本管理部分主要修改7个表
//货品管理涉及Product、Stock、Repertory
//物料管理涉及Material、Stock、Repertory、Supplier、Offer、OfferList


// 必须设置的属性有：  Product--name、price、add_time
//                    Stock--style、remain、unit、batch
//                    Material--name
//                    Repertory--name
//                    Supplier--name
//                    OfferList--time
//                    Offer--quantity、batch、price


//Product、Material、Stock、Repertory、Supplier、OfferList信息都可自由定义
//Offer信息中的batch属性要与对应该物料的Stock中的batch属性一一对应
//Stock中的unit因涉及运算，只支持‘个’或‘千个’


//关于各种关系、外键的说明详见152行左右

const CMdata = async function(){
    /* await models.Product.destroy({where:{}});
    await models.Material.destroy({where:{}});
    await models.Offer.destroy({where:{}});
    await models.OfferList.destroy({where:{}});
    await models.Supplier.destroy({where:{}});
    await models.Stock.destroy({where:{}});
    await models.Repertory.destroy({where:{}}); */


    
    var product1 = await models.Product.create({
		'name': '货品1',
        'status': '',
        'price': 1000,
        'add_time': 2012-06-12,
        'remark': '',
    });

    var product2 = await models.Product.create({
		'name': '货品2',
        'status': '',
        'price': 1000,
        'add_time': 2012-06-12,
        'remark': '',
    });

    var product3 = await models.Product.create({
		'name': '货品3',
        'status': '',
        'price': 1000,
        'add_time': 2012-06-12,
        'remark': '',
    });

    var stock1 = await models.Stock.create({
		'style': true,
        'status': '',
        'remain': 1,
        'unit': '千个',
        'batch': 'B1',
    });
    
    var stock2 = await models.Stock.create({
		'style': true,
        'status': '',
        'remain': 2,
        'unit': '千个',
        'batch': 'B2',
    });

    var stock3 = await models.Stock.create({
		'style': true,
        'status': '',
        'remain': 3,
        'unit': '个',
        'batch': 'B2',
    });

    /* var material1 = await models.Material.create({
		'name': '物料1',
        'status': '',
        'property': '',
        'safe_quantity': 4,
    });

    var material2 = await models.Material.create({
		'name': '物料2',
        'status': '',
        'property': '',
        'safe_quantity': 6,
    });

    var material3 = await models.Material.create({
		'name': '物料3',
        'status': '',
        'property': '',
        'safe_quantity': 6,
    }); */

    /* var stock4 = await models.Stock.create({
		'style': false,
        'status': '',
        'remain': 1,
        'unit': '个',
        'batch': 'B1',
    });
    
    var stock5 = await models.Stock.create({
		'style': false,
        'status': '',
        'remain': 2,
        'unit': '千个',
        'batch': 'B2',
    });

    var stock6 = await models.Stock.create({
		'style': false,
        'status': '',
        'remain': 3,
        'unit': '千个',
        'batch': 'B2',
    }); */

    var repertory1 = await models.Repertory.create({
        'name': '仓库1'
    });

    var repertory2 = await models.Repertory.create({
        'name': '仓库2'
    });

    /* var supplier1 = await models.Supplier.create({
        'name': '供应商1'
    });

    var supplier2 = await models.Supplier.create({
        'name': '供应商2'
    });

    var offerlist1 = await models.OfferList.create({
        'time': new Date('2018-5-30 12:00:00')
    });
 */
    //该部分为Material与OfferList间多对多的关系处理，每一对靠Offer进行连接
    //主要注意Offer中的batch信息要与Material中添加的batch信息相对应，因需要用batch进行表连接
    /* await offerlist1.addMaterial(material1, {'quantity': 4,'batch':'B1','price':1000});
    await offerlist1.addMaterial(material2, {'quantity': 4,'batch':'B2','price':1000});
    await offerlist1.addMaterial(material3, {'quantity': 4,'batch':'B2','price':1000});
 */
    //一个OfferList绑定一个供应商
   /*  await offerlist1.setSupplier(supplier1); */

    //一定要将Stock的style属性为true的项对应Product，为false的对应Material
    await stock1.setProduct(product1);
    await stock2.setProduct(product2);
    await stock3.setProduct(product3);
    /* await stock4.setMaterial(material1);
    await stock5.setMaterial(material2);
    await stock6.setMaterial(material3); */

    //Stock对应的仓库可随意选择
    await stock1.setRepertory(repertory1);
    await stock2.setRepertory(repertory1);
    /* await stock4.setRepertory(repertory1); */
    await stock3.setRepertory(repertory2);
    /* await stock5.setRepertory(repertory2);
    await stock6.setRepertory(repertory2); */


}

CMdata();