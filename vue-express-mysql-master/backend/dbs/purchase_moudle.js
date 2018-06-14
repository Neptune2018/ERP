var models = require('../models')

//使用方法
//在当前文件夹中 采用命令 node purchase_moudle.js就能把采购管理的数据插入到数据表中

//采购管理部分主要修改8个表
//缺料浏览涉及Material、MaterCate、Stock
//安全库存涉及Material、MaterCate
//供应商管理涉及Material、MaterCate、User、Supplier、MinOrder
//报价单管理涉及Material、Supplier、Offer、OfferList、Supplier


// 必须设置的属性有：  Material--name、status、property、safe_quantity
//                    MaterCate--name
//                    Stock--style、remain
//                    User--name
//                    Supplier--name、phone、person、remark
//                    MinOrder--quantity
//                    OfferList--time
//                    Offer--quantity、batch、price、total_price

//OfferList中所有offer中的物料必须是Supplier提供的物料,细节请看413行

const addPurchase = async function () {
    // await models.User.destroy({where:{}});
    // await models.MinOrder.destroy({where:{}});
    // await models.MaterCate.destroy({where:{}});
    // await models.Stock.destroy({where:{}});
    // await models.Offer.destroy({where:{}});
    // await models.Material.destroy({where:{}});
    // await models.Supplier.destroy({where:{}});
    // await models.OfferList.destroy({where:{}});

    var buyer = await models.Role.findOne({
        where: {
            name: 'Buyer'
        }
    })

    var User2 = await models.User.create({
		'name': '采购员2',
		'phone': '15822004822',
		'email': 'guo97HBK@outlook.com',
		'job': '采购员'
    });
    await User2.createAdmin({'password': '123456'});
	await User2.setRole(buyer);

    var User3 = await models.User.create({
		'name': '采购员3',
		'phone': '13002338533',
		'email': '730040709@qq.com',
		'job': '采购员'
    });
    await User3.createAdmin({'password': '123456'});
	await User3.setRole(buyer);

	var User4 = await models.User.create({
		'name': '采购员4',
		'phone': '18343405644',
		'email': 'iloveHB@126.com',
		'job': '采购员'
    });
    await User4.createAdmin({'password': '123456'});
	await User4.setRole(buyer);

	var User13 = await models.User.create({
		'name': '采购员13',
		'phone': '18885023113',
		'email': '10407307@qq.com',
		'job': '采购员'
    });
    await User13.createAdmin({'password': '123456'});
	await User13.setRole(buyer);
	
	var User5 = await models.User.create({
		'name': '采购员5',
		'phone': '18297345655',
		'email': 'Neptune2018@outlook.com',
		'job': '采购员'
    });
    await User5.createAdmin({'password': '123456'});
	await User5.setRole(buyer);

	var User12 = await models.User.create({
		'name': '采购员12',
		'phone': '17290233612',
		'email': 'freeme12@163.com',
		'job': '采购员'
    });
    await User12.createAdmin({'password': '123456'});
	await User12.setRole(buyer);
	
	var User6 = await models.User.create({
		'name': '采购员6',
		'phone': '13046557866',
		'email': 'haohaoYY@163.com',
		'job': '采购总管'
    });
    await User6.createAdmin({'password': '123456'});
	await User6.setRole(buyer);
	
	var User7 = await models.User.create({
		'name': '采购员7',
		'phone': '13183834577',
		'email': 'allenzh@qq.com',
		'job': '采购顾问'
    });
    await User7.createAdmin({'password': '123456'});
	await User7.setRole(buyer);

	var User8 = await models.User.create({
		'name': '采购员8',
		'phone': '18923024888',
		'email': 'Lisa0109@gmail.com',
		'job': '采购员'
    });
    await User8.createAdmin({'password': '123456'});
	await User8.setRole(buyer);
	
	var User9 = await models.User.create({
		'name': '采购员9',
		'phone': '15502034599',
		'email': 'Jonasen@gmail.com',
		'job': '采购员'
    });
    await User9.createAdmin({'password': '123456'});
	await User9.setRole(buyer);
	
	var User10 = await models.User.create({
		'name': '采购员10',
		'phone': '13043235710',
		'email': '30334617@qq.com',
		'job': '采购员'
    });
    await User10.createAdmin({'password': '123456'});
	await User10.setRole(buyer);
	
	var User11 = await models.User.create({
		'name': '采购员11',
		'phone': '13709872563',
		'email': 'rickC137@gmail.com',
		'job': '采购员'
    });
    await User11.createAdmin({'password': '123456'});
	await User11.setRole(buyer);
	
    var material1 = await models.Material.create({
        'id': 241,
        'name': 'EB38 PCB上线',
        'status': '0',
        'property': '原料',
        'safe_quantity': 500
    });
    var material2 = await models.Material.create({
        'id': 242,
        'name': 'yy弹力绳',
        'status': '0',
        'property': '原料',
        'safe_quantity': 500
    });
    var material3 = await models.Material.create({
        'id': 243,
        'name': '磁保持继电器',
        'status': '0',
        'property': '原料',
        'safe_quantity': 500
    });
    var material4 = await models.Material.create({
        'id': 244,
        'name': 'PBE晶体管',
        'status': '0',
        'property': '原料',
        'safe_quantity': 500
    });
    var material5 = await models.Material.create({
        'id': 245,
        'name': '0603电阻',
        'status': '0',
        'property': '原料',
        'safe_quantity': 500
    });
    var material6 = await models.Material.create({
        'id': 246,
        'name': '伦斯木箱',
        'status': '0',
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
        'place': 241,
        'remain': 50,
        'unit': '千个',
        'batch': 'B1'
    });
    var stock2 = await models.Stock.create({
        'style': false,
        'place': 242,
        'remain': 50,
        'unit': '千个',
        'batch': 'B1'
    });
    var stock3 = await models.Stock.create({
        'style': false,
        'place': 243,
        'remain': 100,
        'unit': '个',
        'batch': 'B1'
    });
    var stock4 = await models.Stock.create({
        'style': false,
        'place': 244,
        'remain': 200,
        'unit': '个',
        'batch': 'B3'
    });
    var stock5 = await models.Stock.create({
        'style': false,
        'place': 245,
        'remain': 100,
        'unit': '千个',
        'batch': 'B4'
    });
    var stock6 = await models.Stock.create({
        'style': false,
        'place': 246,
        'remain': 250,
        'unit': '个',
        'batch': 'B5'
    });
    var stock7 = await models.Stock.create({
        'style': false,
        'place': 247,
        'remain': 50,
        'unit': '千个',
        'batch': 'B6'
    });
    var stock8 = await models.Stock.create({
        'style': false,
        'place': 248,
        'remain': 50,
        'unit': '千个',
        'batch': 'B4'
    });
    var stock9 = await models.Stock.create({
        'style': false,
        'place': 249,
        'remain': 100,
        'unit': '个',
        'batch': 'B5'
    });
    var stock10 = await models.Stock.create({
        'style': false,
        'place': 250,
        'remain': 50,
        'unit': '千个',
        'batch': 'B10'
    });
    var stock11 = await models.Stock.create({
        'style': false,
        'place': 251,
        'remain': 70,
        'unit': '千个',
        'batch': 'B11'
    });
    var stock12 = await models.Stock.create({
        'style': false,
        'place': 252,
        'remain': 50,
        'unit': '千个',
        'batch': 'B12'
    });

    var repertory3 = await models.Repertory.create({
        'name': '仓库3',
        'max': 100,
        'userId': 244,
        'managerId':241
    });

    var repertory4 = await models.Repertory.create({
        'name': '仓库4',
        'max': 100,
        'userId': 244,
        'managerId':241
    });

    await stock1.setRepertory(repertory3);
    await stock2.setRepertory(repertory3);
    await stock3.setRepertory(repertory3);
    await stock4.setRepertory(repertory3);
    await stock5.setRepertory(repertory3);
    await stock6.setRepertory(repertory3);
    await stock7.setRepertory(repertory3);
    await stock8.setRepertory(repertory4);
    await stock9.setRepertory(repertory4);
    await stock10.setRepertory(repertory4);
    await stock11.setRepertory(repertory4);
    await stock12.setRepertory(repertory4);

    //每个物料分类包含多个物料
    await materialcate1.addMaterial(material1)
    await materialcate1.addMaterial(material3)
    await materialcate1.addMaterial(material5)
    await materialcate2.addMaterial(material2)
    await materialcate2.addMaterial(material2)
    await materialcate3.addMaterial(material4)
    await materialcate3.addMaterial(material6)

    //每个物料包含多个Stock
    await material1.addStock(stock1)
    await material1.addStock(stock2)
    await material1.addStock(stock3)
    await material3.addStock(stock4)
    await material4.addStock(stock5)
    await material5.addStock(stock6)
    await material6.addStock(stock7)
    await material4.addStock(stock8)
    await material5.addStock(stock9)

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
    
    //物料和供应商是多对多的关系，每对靠MinOrder连接
    await material1.addSupplier(supplier1, {'quantity' : 100})
    await models.MinOrder.update({'quantity': 100},{where:{materialId:241,supplierId:1}});
    await material1.addSupplier(supplier2, {'quantity' : 400})
    await models.MinOrder.update({'quantity': 100},{where:{materialId:241,supplierId:2}});
    await material1.addSupplier(supplier3, {'quantity' : 500})
    await models.MinOrder.update({'quantity': 100},{where:{materialId:241,supplierId:3}});
    await material2.addSupplier(supplier4, {'quantity' : 400})
    await models.MinOrder.update({'quantity': 100},{where:{materialId:242,supplierId:4}});
    await material2.addSupplier(supplier5, {'quantity' : 400})
    await models.MinOrder.update({'quantity': 100},{where:{materialId:242,supplierId:5}});
    await material2.addSupplier(supplier6, {'quantity' : 700})
    await models.MinOrder.update({'quantity': 100},{where:{materialId:242,supplierId:6}});
    await material3.addSupplier(supplier7, {'quantity' : 400})
    await models.MinOrder.update({'quantity': 100},{where:{materialId:243,supplierId:7}});
    await material3.addSupplier(supplier3, {'quantity' : 500})
    await models.MinOrder.update({'quantity': 100},{where:{materialId:243,supplierId:3}});
    await material3.addSupplier(supplier4, {'quantity' : 300})
    await models.MinOrder.update({'quantity': 100},{where:{materialId:243,supplierId:4}});
    await material4.addSupplier(supplier4, {'quantity' : 200})
    await models.MinOrder.update({'quantity': 100},{where:{materialId:244,supplierId:4}});
    await material4.addSupplier(supplier7, {'quantity' : 600})
    await models.MinOrder.update({'quantity': 100},{where:{materialId:244,supplierId:7}});
    await material5.addSupplier(supplier1, {'quantity' : 200})
    await models.MinOrder.update({'quantity': 100},{where:{materialId:245,supplierId:1}});
    await material5.addSupplier(supplier3, {'quantity' : 400})
    await models.MinOrder.update({'quantity': 100},{where:{materialId:245,supplierId:3}});
    await material5.addSupplier(supplier5, {'quantity' : 300})
    await models.MinOrder.update({'quantity': 100},{where:{materialId:245,supplierId:5}});
    await material6.addSupplier(supplier2, {'quantity' : 100})
    await models.MinOrder.update({'quantity': 100},{where:{materialId:246,supplierId:2}});
    await material6.addSupplier(supplier3, {'quantity' : 600})
    await models.MinOrder.update({'quantity': 100},{where:{materialId:246,supplierId:3}});
    await material6.addSupplier(supplier6, {'quantity' : 300})
    await models.MinOrder.update({'quantity': 100},{where:{materialId:246,supplierId:6}});

    var offerList1 = await models.OfferList.create({
        'id': 241,
        'time': '2018-02-15 12:00:00'
    });
    var offerList2 = await models.OfferList.create({
        'id': 242,
        'time': '2018-02-15 12:00:00'
    });
    var offerList3 = await models.OfferList.create({
        'id': 243,
        'time': '2018-02-15 12:00:00'
    });
    var offerList4 = await models.OfferList.create({
        'id': 244,
        'time': '2018-02-15 12:00:00'
    });
    var offerList5 = await models.OfferList.create({
        'id': 245,
        'time': '2018-02-15 12:00:00'
    });
    var offerList6 = await models.OfferList.create({
        'id': 246,
        'time': '2018-02-15 12:00:00'
    });
    var offerList7 = await models.OfferList.create({
        'id': 247,
        'time': '2018-02-15 12:00:00'
    });
    var offerList8 = await models.OfferList.create({
        'id': 248,
        'time': '2018-02-15 12:00:00'
    });
    var offerList9 = await models.OfferList.create({
        'id': 249,
        'time': '2018-02-15 12:00:00'
    });
    var offerList10 = await models.OfferList.create({
        'id': 250,
        'time': '2018-02-15 12:00:00'
    });
    var offerList11 = await models.OfferList.create({
        'id': 251,
        'time': '2018-02-15 12:00:00'
    });
    var offerList12 = await models.OfferList.create({
        'id': 252,
        'time': '2018-02-15 12:00:00'
    });
    var offerList13 = await models.OfferList.create({
        'id': 253,
        'time': '2018-02-15 12:00:00'
    });
    var offerList14 = await models.OfferList.create({
        'id': 254,
        'time': '2018-02-15 12:00:00'
    });
    var offerList15 = await models.OfferList.create({
        'id': 255,
        'time': '2018-02-15 12:00:00'
    });
    var offerList16 = await models.OfferList.create({
        'id': 256,
        'time': '2018-02-15 12:00:00'
    });
    var offerList17 = await models.OfferList.create({
        'id': 257,
        'time': '2018-02-15 12:00:00'
    });
    var offerList18 = await models.OfferList.create({
        'id': 258,
        'time': '2018-02-15 12:00:00'
    });
    var offerList19 = await models.OfferList.create({
        'id': 259,
        'time': '2018-02-15 12:00:00'
    });

    //每个offerList绑定一个供应商
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

    //每个offerList包含一个负责人
    await offerList1.setUser(User2)
    await offerList2.setUser(User3)
    await offerList3.setUser(User4)
    await offerList4.setUser(User5)
    await offerList5.setUser(User5)
    await offerList6.setUser(User6)
    await offerList7.setUser(User7)
    await offerList8.setUser(User8)
    await offerList9.setUser(User9)
    await offerList10.setUser(User10)
    await offerList11.setUser(User11)
    await offerList12.setUser(User12)
    await offerList13.setUser(User11)
    await offerList14.setUser(User13)
    await offerList15.setUser(User4)
    await offerList16.setUser(User5)
    await offerList17.setUser(User6)
    await offerList18.setUser(User7)
    await offerList19.setUser(User8)

    //Material与OfferList间多对多的关系处理，每一对靠Offer进行连接
    //每个offerList增加的物料必须是供应商与物料存在minorder的关系
    //比如，offerList1绑定的供应商是supplier1，而supplier1提供的物料是material1和material5
    //所以offerList1只能添加material1和material5
    await offerList1.addMaterial(material1,{'quantity': 100, 'batch': 'B6', 'price': 20, 'total_price': 2000})
    await models.Offer.update({'quantity': 100, 'batch': 'B1', 'price': 20, 'total_price': 2000},{where:{offerListId:241,materialId:241}});
    await offerList1.addMaterial(material5,{'quantity': 100, 'batch': 'B6', 'price': 20, 'total_price': 2000})
    await models.Offer.update({'quantity': 100, 'batch': 'B5', 'price': 20, 'total_price': 2000},{where:{offerListId:241,materialId:245}});
    await offerList2.addMaterial(material1,{'quantity': 100, 'batch': 'B6', 'price': 20, 'total_price': 2000})
    await models.Offer.update({'quantity': 100, 'batch': 'B1', 'price': 20, 'total_price': 2000},{where:{offerListId:242,materialId:241}});
    await offerList2.addMaterial(material6,{'quantity': 100, 'batch': 'B6', 'price': 20, 'total_price': 2000})
    await models.Offer.update({'quantity': 100, 'batch': 'B6', 'price': 20, 'total_price': 2000},{where:{offerListId:242,materialId:246}});
    await offerList3.addMaterial(material1,{'quantity': 100, 'batch': 'B6', 'price': 20, 'total_price': 2000})
    await models.Offer.update({'quantity': 100, 'batch': 'B1', 'price': 20, 'total_price': 2000},{where:{offerListId:243,materialId:241}});
    await offerList3.addMaterial(material5,{'quantity': 100, 'batch': 'B6', 'price': 20, 'total_price': 2000})
    await models.Offer.update({'quantity': 100, 'batch': 'B5', 'price': 20, 'total_price': 2000},{where:{offerListId:243,materialId:245}});
    await offerList4.addMaterial(material1,{'quantity': 100, 'batch': 'B6', 'price': 20, 'total_price': 2000})
    await models.Offer.update({'quantity': 100, 'batch': 'B1', 'price': 20, 'total_price': 2000},{where:{offerListId:244,materialId:241}});
    await offerList4.addMaterial(material6,{'quantity': 100, 'batch': 'B6', 'price': 20, 'total_price': 2000})
    await models.Offer.update({'quantity': 100, 'batch': 'B6', 'price': 20, 'total_price': 2000},{where:{offerListId:244,materialId:246}});
    await offerList5.addMaterial(material1,{'quantity': 100, 'batch': 'B1', 'price': 20, 'total_price': 2000})
    await models.Offer.update({'quantity': 100, 'batch': 'B1', 'price': 20, 'total_price': 2000},{where:{offerListId:245,materialId:241}});
    await offerList6.addMaterial(material5,{'quantity': 100, 'batch': 'B5', 'price': 20, 'total_price': 2000})
    await models.Offer.update({'quantity': 100, 'batch': 'B5', 'price': 20, 'total_price': 2000},{where:{offerListId:246,materialId:245}});
    await offerList7.addMaterial(material2,{'quantity': 100, 'batch': '1-2', 'price': 20, 'total_price': 2000})
    await models.Offer.update({'quantity': 100, 'batch': 'B2', 'price': 20, 'total_price': 2000},{where:{offerListId:247,materialId:242}});
    await offerList8.addMaterial(material3,{'quantity': 100, 'batch': '1-2', 'price': 20, 'total_price': 2000})
    await models.Offer.update({'quantity': 100, 'batch': 'B3', 'price': 20, 'total_price': 2000},{where:{offerListId:248,materialId:243}});
    await offerList9.addMaterial(material4,{'quantity': 100, 'batch': '1-2', 'price': 20, 'total_price': 2000})
    await models.Offer.update({'quantity': 100, 'batch': 'B4', 'price': 20, 'total_price': 2000},{where:{offerListId:249,materialId:244}});
    await offerList10.addMaterial(material2,{'quantity': 100, 'batch': '1-2', 'price': 20, 'total_price': 2000})
    await models.Offer.update({'quantity': 100, 'batch': 'B2', 'price': 20, 'total_price': 2000},{where:{offerListId:250,materialId:242}});
    await offerList11.addMaterial(material2,{'quantity': 100, 'batch': '1-2', 'price': 20, 'total_price': 2000})
    await models.Offer.update({'quantity': 100, 'batch': 'B2', 'price': 20, 'total_price': 2000},{where:{offerListId:251,materialId:242}});
    await offerList12.addMaterial(material5,{'quantity': 100, 'batch': '1-2', 'price': 20, 'total_price': 2000})
    await models.Offer.update({'quantity': 100, 'batch': 'B5', 'price': 20, 'total_price': 2000},{where:{offerListId:252,materialId:245}});
    await offerList13.addMaterial(material2,{'quantity': 100, 'batch': '1-2', 'price': 20, 'total_price': 2000})
    await models.Offer.update({'quantity': 100, 'batch': 'B2', 'price': 20, 'total_price': 2000},{where:{offerListId:253,materialId:242}});
    await offerList13.addMaterial(material6,{'quantity': 100, 'batch': '1-2', 'price': 20, 'total_price': 2000})
    await models.Offer.update({'quantity': 100, 'batch': 'B6', 'price': 20, 'total_price': 2000},{where:{offerListId:253,materialId:246}});
    await offerList14.addMaterial(material6,{'quantity': 100, 'batch': '1-2', 'price': 20, 'total_price': 2000})
    await models.Offer.update({'quantity': 100, 'batch': 'B6', 'price': 20, 'total_price': 2000},{where:{offerListId:254,materialId:246}});
    await offerList15.addMaterial(material6,{'quantity': 100, 'batch': '1-2', 'price': 20, 'total_price': 2000})
    await models.Offer.update({'quantity': 100, 'batch': 'B6', 'price': 20, 'total_price': 2000},{where:{offerListId:255,materialId:246}});
    await offerList16.addMaterial(material3,{'quantity': 100, 'batch': '1-2', 'price': 20, 'total_price': 2000})
    await models.Offer.update({'quantity': 100, 'batch': 'B3', 'price': 20, 'total_price': 2000},{where:{offerListId:256,materialId:243}});
    await offerList17.addMaterial(material4,{'quantity': 100, 'batch': '1-2', 'price': 20, 'total_price': 2000})
    await models.Offer.update({'quantity': 100, 'batch': 'B4', 'price': 20, 'total_price': 2000},{where:{offerListId:257,materialId:244}});
    await offerList18.addMaterial(material3,{'quantity': 100, 'batch': '1-2', 'price': 20, 'total_price': 2000})
    await models.Offer.update({'quantity': 100, 'batch': 'B3', 'price': 20, 'total_price': 2000},{where:{offerListId:258,materialId:243}});
    await offerList19.addMaterial(material4,{'quantity': 100, 'batch': '1-2', 'price': 20, 'total_price': 2000})
    await models.Offer.update({'quantity': 100, 'batch': 'B4', 'price': 20, 'total_price': 2000},{where:{offerListId:259,materialId:244}});





}

module.exports = {
	addPurchase: addPurchase
}
