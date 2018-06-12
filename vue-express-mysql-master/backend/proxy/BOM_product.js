var BOM_product = require('../models').Product;
var Product = require('../models').Product;
var Consist = require('../models').Consist;
var db = require('../models/index').DB;

//插入consists
exports.insertConsist= function(productId, materId, quantity, callback) {
  Consist.create({
    productId: productId,
    materialId: materId,
    quantity: quantity
  }).then(function(data){
    callback(data)
  })
}

//添加函数,函数:
exports.addBOM_product = function (id,name,price,remark,productCateId,callback) {
  if (!price){price = null}
  if (!remark){remark = null}
  Product.create({
    id: id,
    name: name,
    status: 0,
    price: price,
    remark: remark,
    productCateId: productCateId
  }).then(function(data){
    callback(data)
  })
};


// 查找没有父类的物料分类,也就是最高层分类
exports.listallBOM_product = function(callback) {
    BOM_product.findAll({
}).then(
        function(result){
            callback(result);
        }
    );
};

exports.listallBOM_productbyIdname = function (Id,name,callback) {
  BOM_product.findAll({
    'where': {
        'Id': Id,
        'name': {'$like': '%'+name+'%'}
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
        'id': Id
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
        'name': {'$like': '%'+name+'%'}
    }
  }).then(function(result){
    console.log(result)
    callback(result)
  });
};


exports.updateBOM_productById = function (id,status,name,price,remark,productCateId,callback) {
  if (status){
    BOM_product.update({
      status: status
    }, {
      where: {
        id: id
      }
    })
  };
  if (price){
    BOM_product.update({
      price: price
    }, {
      where: {
        id: id
      }
    })
  };
  if (name){
    BOM_product.update({
      name: name
    }, {
      where: {
        id: id
      }
    })
  };
  if (remark){
    BOM_product.update({
      remark: remark
    }, {
      where: {
        id: id
      }
    })
  };
  if (productCateId){
    BOM_product.update({
      productCateId: productCateId
    }, {
      where: {
        id: id
      }
    })
  };
  BOM_product.findAll({
  }).then(
        function(result){
            callback(result);
        }
    );
}
exports.deleteBOM_productById = function (id,callback) {
  BOM_product.destroy({
    where: {
      id: id
    }
  }).then(function(result){
    callback(result)
  });
};


exports.findmaterials = function(id,dosomething) {
    var sqlquery1="SELECT * FROM consists left join materials on consists.materialId = materials.id where productId =" + id;
    db.query(sqlquery1).then(function(tests){ 
            //console.log(tests)       
          dosomething(tests)
        });
};

