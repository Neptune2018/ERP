var models = require('../models')

//使用方法
//在当前文件夹中 采用命令 node role_feature.js就能把权限数据插入到数据表中

const addSupplier = async function () {
//      await models.Material.destroy({where:{}});
//    	await models.MaterCate.destroy({where:{}});
//    	await models.Stock.destroy({where:{}});

    var material1 = await models.Material.create({
        'name': 'EB38 PCB上线',
        'status': '正常',
        'property': '原料',
        'safe_quantity': 500
    });
    var material2 = await models.Material.create({
        'name': 'yy弹力绳',
        'status': '正常',
        'property': '原料',
        'safe_quantity': 500
    });
    var material3 = await models.Material.create({
        'name': '磁保持继电器',
        'status': '正常',
        'property': '原料',
        'safe_quantity': 500
    });
    var material4 = await models.Material.create({
        'name': 'PBE晶体管',
        'status': '正常',
        'property': '原料',
        'safe_quantity': 500
    });
    var material5 = await models.Material.create({
        'name': '0603电阻',
        'status': '正常',
        'property': '原料',
        'safe_quantity': 500
    });
    var material6 = await models.Material.create({
        'name': '伦斯木箱',
        'status': '正常',
        'property': '原料',
        'safe_quantity': 500
    });


    var materialcate1 = await models.MaterCate.create({
        'name': '电子器件',
    });
    var materialcate2 = await models.MaterCate.create({
        'name': '弹力绳',
    });
    var materialcate3 = await models.MaterCate.create({
        'name': '晶体管',
    });

    var stock1 = await models.Stock.create({
        'style': false,
        'remain': 50,
        'batch': '456789'
    });
    var stock2 = await models.Stock.create({
        'style': false,
        'remain': 50,
        'batch': '456789'
    });
    var stock3 = await models.Stock.create({
        'style': false,
        'remain': 100,
        'batch': '456789'
    });
    var stock4 = await models.Stock.create({
        'style': false,
        'remain': 200,
        'batch': '456789'
    });
    var stock5 = await models.Stock.create({
        'style': false,
        'name': '0603电阻',
        'remain': 100,
        'batch': '456789'
    });
    var stock6 = await models.Stock.create({
        'style': false,
        'remain': 250,
        'batch': '456789'
    });
    var stock7 = await models.Stock.create({
        'style': false,
        'remain': 50,
        'batch': '456789'
    });
    var stock8 = await models.Stock.create({
        'style': false,
        'remain': 50,
        'batch': '456789'
    });
    var stock9 = await models.Stock.create({
        'style': false,
        'remain': 100,
        'batch': '456789'
    });
    var stock10 = await models.Stock.create({
        'style': false,
        'remain': 50,
        'batch': '456789'
    });
    var stock11 = await models.Stock.create({
        'style': false,
        'name': '0603电阻',
        'remain': 70,
        'batch': '456789'
    });
    var stock12 = await models.Stock.create({
        'style': false,
        'remain': 50,
        'batch': '456789'
    });


    materialcate1.addMaterial(material1)
    materialcate1.addMaterial(material3)
    materialcate1.addMaterial(material5)
    materialcate2.addMaterial(material2)
    materialcate2.addMaterial(material2)
    materialcate3.addMaterial(material4)
    materialcate3.addMaterial(material6)

    material1.addStock(stock1)
    material1.addStock(stock2)
    material1.addStock(stock3)
    material3.addStock(stock4)
    material4.addStock(stock5)
    material4.addStock(stock6)
    material5.addStock(stock6)
    material6.addStock(stock7)
    material4.addStock(stock6)
    material5.addStock(stock6)



}

addSupplier();