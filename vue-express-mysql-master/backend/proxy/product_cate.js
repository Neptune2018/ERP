var ProductCate = require('../models').ProductCate;
var Product = require('../models').Product;



//添加，需要两个参数，类别名和父类别名
exports.addProduct_cate = function (name,productCateId,callback) {
  ProductCate.create({
    name: name,
    productCateId: productCateId
  }).then(function(data){
    callback(data)
  })
};


// 查找没有父类的物料分类,也就是最高层分类
exports.listallProduct_cates = function(callback) {
    ProductCate.findAll({
    'where': {
        'productCateId': null
    }
}).then(
        function(result){
            callback(result);
        }
    );
};


// 列出指定父分类下的所有子分类
exports.listallProduct_catesbyMaterCateID = function (productCateId,callback) {
  ProductCate.findAll({
    'where': {
        'productCateId': productCateId
    }
  }).then(function(result){
    console.log(result)
    callback(result)
  });
};

// 列出指定父分类下的所有物料
exports.listallProductbyProductCateID = function (productCateId,callback) {
  Product.findAll({
    include: [{
      model: Product,
      where: {
        id: productCateId
      }
    }]
  }).then(function(data){
    callback(data);
  });
}


exports.deleteProduct_cateById = function (id,callback) {
  ProductCate.destroy({
    where: {
      id: id
    }
  }).then(function(result){
    callback(result)
  });
};


exports.updateProduct_cateById = function (id,name,productCateId,callback) {
  ProductCate.update({
    id: id,
    name: name,
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


