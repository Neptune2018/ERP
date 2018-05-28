var BOM_product = require('../models').Product;
var Product = require('../models').Product;


//添加函数,函数:
exports.addBOM_product = function (id,name,price,remark,materCateId,callback) {
  Supplier.create({
    id: id,
    name: name,
    status: 0,
    price: price,
    remark: remark,
    materCateId: materCateId
  }).then(function(data){
    callback(data)
  })
};


// 查找没有父类的物料分类,也就是最高层分类
exports.listallBOM_product = function(callback) {
    BOM_product.findAll({
    'attributes': ['id', 'name','price','remark'],
    'where': {
        'status': 0
    }
}).then(
        function(result){
            callback(result);
        }
    );
};

exports.listallBOM_productbyIdname = function (Id,name,callback) {
  BOM_product.findAll({
    'attributes': ['id', 'name','price','remark'],
    'where': {
        'Id': Id,
        'name': name,
        'status': 0
    }
  }).then(function(result){
    console.log(result)
    callback(result)
  });
};
// 列出指定父分类下的所有子分类
exports.listallBOM_productbyId = function (Id,callback) {
  BOM_product.findAll({
    'where': {
        'id': Id,
        'status': 0
    }
  }).then(function(result){
    console.log(result)
    callback(result)
  });
};

// 列出指定父分类下的所有子分类
exports.listallBOM_productbyname = function (name,callback) {
  BOM_product.findAll({
    'where': {
        'name': name,
        'status': 0
    }
  }).then(function(result){
    console.log(result)
    callback(result)
  });
};


exports.updateBOM_productById = function (id,name,price,remark,productCateId,callback) {
  Supplier.update({
    id: id,
    name: name,
    price: price,
    remark: remark,
    productCateId: productCateId,
  }, {
    where: {
      id: id
    }
  }).then(function(result){
    console.log(result)
    callback(result)
  });
};



