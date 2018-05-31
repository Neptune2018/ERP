var models = require('../models')


const productControl = async function(){
    /* await models.ProductCate.destroy({where:{}});
    await models.Buy.destroy({where:{}});
    await models.Product.destroy({where:{}});
    await models.Material.destroy({where:{}});
    await models.MaterCate.destroy({where:{}});
    await models.Consist.destroy({where:{}});
    await models.Stock.destroy({where:{}}); */

    var productCate1 = await models.ProductCate.create({
        'name': 'proCate1'
    });

    var productCate2 = await models.ProductCate.create({
        'name': 'proCate2'
    })

    var product1 = await models.Product.create({
        'name': 'product1',
        'status': 'status1',
        'price': 1000,
        'remark': 'remark1'
    })

    await productCate1.addProduct(product1)

    var product2 = await models.Product.create({
        'name': 'product2',
        'status': 'status2',
        'price': 1000,
        'remark': 'remark2'
    })

    await productCate2.addProduct(product2)

    var materCate1 = await models.MaterCate.create({
        'name': 'materCate1'
    })

    var materCate2 = await models.MaterCate.create({
        'name': 'materCate2'
    })

    var material1 = await models.Material.create({
        'name': 'material1'
    })

    await materCate1.addMaterial(material1)

    var material2 = await models.Material.create({
        'name': 'material2'
    })

    await materCate1.addMaterial(material2)

    var material3 = await models.Material.create({
        'name': 'material3'
    })

    await materCate1.addMaterial(material3)

    var material4 = await models.Material.create({
        'name': 'material4'
    })

    await materCate2.addMaterial(material4)    

    var material5 = await models.Material.create({
        'name': 'material5'
    })

    await materCate2.addMaterial(material5)

    var material6 = await models.Material.create({
        'name': 'material6'
    })

    await materCate2.addMaterial(material6)

    var stock1 = await models.Stock.create({
        'remain': 50,
        'occupancy': 0
    })

    await material1.addStock(stock1);

    var stock2 = await models.Stock.create({
        'remain': 50,
        'occupancy': 0
    })

    await material2.addStock(stock2);

    var stock3 = await models.Stock.create({
        'remain': 50,
        'occupancy': 0
    })

    await material3.addStock(stock3);

    var stock4 = await models.Stock.create({
        'remain': 50,
        'occupancy': 0
    })

    await material4.addStock(stock4);

    var stock5 = await models.Stock.create({
        'remain': 50,
        'occupancy': 0
    })

    await material5.addStock(stock5);

    await product1.addMaterial(material1, {'quantity': 10});

    await product1.addMaterial(material2, {
        'quantity': 10
    });

    await product1.addMaterial(material3, {
        'quantity': 20
    });

    await product1.addMaterial(material4, {
        'quantity': 30
    });

    await product2.addMaterial(material1, {
        'quantity': 10
    });

    await product2.addMaterial(material2, {
        'quantity': 10
    });

    await product2.addMaterial(material3, {
        'quantity': 20
    });

    await product2.addMaterial(material4, {
        'quantity': 30
    });

    await product2.addMaterial(material5, {
        'quantity': 30
    });
}

productControl();