var models = require('../models')

//使用方法
//在当前文件夹中 采用命令 node role_feature.js就能把权限数据插入到数据表中

const addSupplier = async function () {
    await models.MinOrder.destroy({where:{}});
    await models.MaterCate.destroy({where:{}});
    await models.Stock.destroy({where:{}});
    await models.Offer.destroy({where:{}});
    await models.Material.destroy({where:{}});
    await models.Supplier.destroy({where:{}});
    await models.OfferList.destroy({where:{}});

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


    await materialcate1.addMaterial(material1)
    await materialcate1.addMaterial(material3)
    await materialcate1.addMaterial(material5)
    await materialcate2.addMaterial(material2)
    await materialcate2.addMaterial(material2)
    await materialcate3.addMaterial(material4)
    await materialcate3.addMaterial(material6)

    await material1.addStock(stock1)
    await material1.addStock(stock2)
    await material1.addStock(stock3)
    await material3.addStock(stock4)
    await material4.addStock(stock5)
    await material4.addStock(stock6)
    await material5.addStock(stock6)
    await material6.addStock(stock7)
    await material4.addStock(stock6)
    await material5.addStock(stock6)

    var supplier1 = await models.Supplier.create({
		'name': '众汇有限责任公司',
        'phone': '12334445678',
        'person':'张三',
        'remark': 'xx原料供应商'
	});
    var supplier2 = await models.Supplier.create({
		'name': '阳驰有限责任公司',
        'phone': '12332344223',
        'person':'李四',
        'remark': 'xx原料供应商'
	});
	var supplier3 = await models.Supplier.create({
		'name': '卓宇有限责任公司',
        'phone': '12344442378',
        'person':'王五',
        'remark': 'xx原料供应商'
	});
    var supplier4 = await models.Supplier.create({
		'name': '丹文有限责任公司',
        'phone': '12323446789',
        'person':'小强',
        'remark': 'xx原料供应商'
    });
    var supplier5 = await models.Supplier.create({
		'name': '高德有限责任公司',
        'phone': '12323234456',
        'person':'周鸿煊',
        'remark': 'xx原料供应商'
    });
    var supplier6 = await models.Supplier.create({
		'name': '智宸有限责任公司',
        'phone': '12323489076',
        'person':'李立诚',
        'remark': 'xx原料供应商'
    });
    var supplier7 = await models.Supplier.create({
		'name': '弘文有限责任公司',
        'phone': '12323445678',
        'person':'张弘文',
        'remark': 'xx原料供应商'
    });
    
    
    await material1.addSupplier(supplier1, {'quantity' : 100})
    await material1.addSupplier(supplier2, {'quantity' : 400})
    await material1.addSupplier(supplier3, {'quantity' : 500})
    await material2.addSupplier(supplier4, {'quantity' : 400})
    await material2.addSupplier(supplier5, {'quantity' : 400})
    await material2.addSupplier(supplier6, {'quantity' : 700})
    await material3.addSupplier(supplier7, {'quantity' : 400})
    await material3.addSupplier(supplier3, {'quantity' : 500})
    await material3.addSupplier(supplier4, {'quantity' : 300})
    await material4.addSupplier(supplier4, {'quantity' : 200})
    await material4.addSupplier(supplier7, {'quantity' : 600})
    await material5.addSupplier(supplier1, {'quantity' : 200})
    await material5.addSupplier(supplier3, {'quantity' : 400})
    await material5.addSupplier(supplier5, {'quantity' : 300})
    await material6.addSupplier(supplier2, {'quantity' : 100})
    await material6.addSupplier(supplier3, {'quantity' : 600})
    await material6.addSupplier(supplier6, {'quantity' : 300})

    var offerList1 = await models.OfferList.create({
        'time': '2018-02-15 12:00:00'
    });
    var offerList2 = await models.OfferList.create({
        'time': '2018-02-15 12:00:00'
    });
    var offerList3 = await models.OfferList.create({
        'time': '2018-02-15 12:00:00'
    });
    var offerList4 = await models.OfferList.create({
        'time': '2018-02-15 12:00:00'
    });
    var offerList5 = await models.OfferList.create({
        'time': '2018-02-15 12:00:00'
    });
    var offerList6 = await models.OfferList.create({
        'time': '2018-02-15 12:00:00'
    });
    var offerList7 = await models.OfferList.create({
        'time': '2018-02-15 12:00:00'
    });
    var offerList8 = await models.OfferList.create({
        'time': '2018-02-15 12:00:00'
    });
    var offerList9 = await models.OfferList.create({
        'time': '2018-02-15 12:00:00'
    });
    var offerList10 = await models.OfferList.create({
        'time': '2018-02-15 12:00:00'
    });
    var offerList11 = await models.OfferList.create({
        'time': '2018-02-15 12:00:00'
    });
    var offerList12 = await models.OfferList.create({
        'time': '2018-02-15 12:00:00'
    });
    var offerList13 = await models.OfferList.create({
        'time': '2018-02-15 12:00:00'
    });
    var offerList14 = await models.OfferList.create({
        'time': '2018-02-15 12:00:00'
    });
    var offerList15 = await models.OfferList.create({
        'time': '2018-02-15 12:00:00'
    });
    var offerList16 = await models.OfferList.create({
        'time': '2018-02-15 12:00:00'
    });
    var offerList17 = await models.OfferList.create({
        'time': '2018-02-15 12:00:00'
    });
    var offerList18 = await models.OfferList.create({
        'time': '2018-02-15 12:00:00'
    });
    var offerList19 = await models.OfferList.create({
        'time': '2018-02-15 12:00:00'
    });


    await offerList1.setSupplier(supplier1)
    await offerList2.setSupplier(supplier2)
    await offerList3.setSupplier(supplier3)
    await offerList4.setSupplier(supplier2)
    await offerList5.setSupplier(supplier2)
    await offerList6.setSupplier(supplier3)
    await offerList7.setSupplier(supplier4)
    await offerList8.setSupplier(supplier4)
    await offerList9.setSupplier(supplier4)
    await offerList10.setSupplier(supplier4)
    await offerList11.setSupplier(supplier5)
    await offerList12.setSupplier(supplier5)
    await offerList13.setSupplier(supplier6)
    await offerList14.setSupplier(supplier6)
    await offerList15.setSupplier(supplier6)
    await offerList16.setSupplier(supplier7)
    await offerList17.setSupplier(supplier7)
    await offerList18.setSupplier(supplier7)
    await offerList19.setSupplier(supplier7)

    // await offerList1.setUser(User2)
    // await offerList2.setUser(User3)
    // await offerList3.setUser(User4)
    // await offerList4.setUser(User5)
    // await offerList5.setUser(User5)
    // await offerList6.setUser(User6)
    // await offerList7.setUser(User7)
    // await offerList8.setUser(User8)
    // await offerList9.setUser(User9)
    // await offerList10.setUser(User10)
    // await offerList11.setUser(User11)
    // await offerList12.setUser(User12)
    // await offerList13.setUser(User11)
    // await offerList14.setUser(User13)
    // await offerList15.setUser(User4)
    // await offerList16.setUser(User5)
    // await offerList17.setUser(User6)
    // await offerList18.setUser(User7)
    // await offerList19.setUser(User8)


    await offerList1.addMaterial(material1,{'quantity': 100, 'batch': '1-2', 'price': 20, 'total_price': 2000})
    await offerList1.addMaterial(material5,{'quantity': 100, 'batch': '1-2', 'price': 20, 'total_price': 2000})
    await offerList2.addMaterial(material1,{'quantity': 100, 'batch': '1-2', 'price': 20, 'total_price': 2000})
    await offerList2.addMaterial(material5,{'quantity': 100, 'batch': '1-2', 'price': 20, 'total_price': 2000})
    await offerList3.addMaterial(material1,{'quantity': 100, 'batch': '1-2', 'price': 20, 'total_price': 2000})
    await offerList3.addMaterial(material5,{'quantity': 100, 'batch': '1-2', 'price': 20, 'total_price': 2000})
    await offerList4.addMaterial(material1,{'quantity': 100, 'batch': '1-2', 'price': 20, 'total_price': 2000})
    await offerList4.addMaterial(material6,{'quantity': 100, 'batch': '1-2', 'price': 20, 'total_price': 2000})
    await offerList5.addMaterial(material1,{'quantity': 100, 'batch': '1-2', 'price': 20, 'total_price': 2000})
    await offerList6.addMaterial(material5,{'quantity': 100, 'batch': '1-2', 'price': 20, 'total_price': 2000})
    await offerList7.addMaterial(material2,{'quantity': 100, 'batch': '1-2', 'price': 20, 'total_price': 2000})
    await offerList8.addMaterial(material3,{'quantity': 100, 'batch': '1-2', 'price': 20, 'total_price': 2000})
    await offerList9.addMaterial(material4,{'quantity': 100, 'batch': '1-2', 'price': 20, 'total_price': 2000})
    await offerList10.addMaterial(material2,{'quantity': 100, 'batch': '1-2', 'price': 20, 'total_price': 2000})
    await offerList11.addMaterial(material2,{'quantity': 100, 'batch': '1-2', 'price': 20, 'total_price': 2000})
    await offerList12.addMaterial(material5,{'quantity': 100, 'batch': '1-2', 'price': 20, 'total_price': 2000})
    await offerList13.addMaterial(material2,{'quantity': 100, 'batch': '1-2', 'price': 20, 'total_price': 2000})
    await offerList13.addMaterial(material2,{'quantity': 100, 'batch': '1-2', 'price': 20, 'total_price': 2000})
    await offerList14.addMaterial(material6,{'quantity': 100, 'batch': '1-2', 'price': 20, 'total_price': 2000})
    await offerList15.addMaterial(material6,{'quantity': 100, 'batch': '1-2', 'price': 20, 'total_price': 2000})
    await offerList16.addMaterial(material3,{'quantity': 100, 'batch': '1-2', 'price': 20, 'total_price': 2000})
    await offerList17.addMaterial(material4,{'quantity': 100, 'batch': '1-2', 'price': 20, 'total_price': 2000})
    await offerList18.addMaterial(material3,{'quantity': 100, 'batch': '1-2', 'price': 20, 'total_price': 2000})
    await offerList19.addMaterial(material4,{'quantity': 100, 'batch': '1-2', 'price': 20, 'total_price': 2000})





}

addSupplier();