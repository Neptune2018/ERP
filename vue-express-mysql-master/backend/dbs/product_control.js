var models = require('../models')


const productControl = async function(){
    await models.ProductCate.destroy({where:{}});
    await models.Buy.destroy({where:{}});
    await models.Product.destroy({where:{}});
    await models.Material.destroy({where:{}});
    await models.MaterCate.destroy({where:{}});
    await models.Consist.destroy({where:{}});
    await models.Stock.destroy({where:{}});

    var productCate1 = await models.ProductCate.create({
        'name': 'proCate1'
    });

    var productCate2 = await models.ProductCate.create({
        'name': 'proCate2'
    })

    var product1 = productCate1.createProduct({
        'name': 'product1',
        'status': 'status1',
        'price': 1000,
        'remark': 'remark1'
    })

    var product2 = productCate2.createProduct({
        'name': 'product2',
        'status': 'status2',
        'price': 1000,
        'remark': 'remark2'
    })

    var materCate1 = await models.MaterCate.create({
        'name': 'materCate1'
    })

    var materCate2 = await models.MaterCate.create({
        'name': 'materCate2'
    })

    var material1 = materCate1.createMaterial({
        'name': 'material1'
    })

    var material2 = materCate1.createMaterial({
        'name': 'material2'
    })

    var material3 = materCate1.createMaterial({
        'name': 'material3'
    })

    var material4 = materCate2.createMaterial({
        'name': 'material4'
    })

    var material5 = materCate2.createMaterial({
        'name': 'material5'
    })

    var material6 = materCate2.createMaterial({
        'name': 'material6'
    })

    var stock1 = material1.createStock({
        'remain': 50,
        'occupancy': 0
    })

    var stock2 = material2.createStock({
        'remain': 50,
        'occupancy': 0
    })

    var stock3 = material3.createStock({
        'remain': 50,
        'occupancy': 0
    })

    var stock4 = material4.createStock({
        'remain': 50,
        'occupancy': 0
    })

    var stock5 = material5.createStock({
        'remain': 50,
        'occupancy': 0
    })

    await product1.addMaterial(material1, {
        'quantity': 10
    });

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