var BOM_mater = require('../models').BOM_mater;
var Material = require('../models').Material;
var db = require('../models/index').DB;

//添加函数
exports.addBOM_mater = function (id,name,property,materCateId,callback) {
  if (!property){property = null}
  Material.create({
    id: id,
    name: name,
    status: 0,
    property: property,
    materCateId: materCateId
  }).then(function(data){
    callback(data)
  })
};


// 查找没有父类的物料分类,也就是最高层分类
exports.listallBOM_mater = function(callback) {
  Material.findAll({
}).then(
        function(result){
            callback(result);
        }
    );
};


// 列出指定父分类下的所有子分类
exports.listallBOM_materbyID = function (Id,callback) {
  Material.findAll({
    'where': {
        'id': Id
    }
  }).then(function(result){
    console.log(result)
    callback(result)
  });
};

// 列出指定父分类下的所有子分类
exports.listallBOM_materbyname = function (name,callback) {
  Material.findAll({
    'where': {
        'name': {'$like': '%'+name+'%'}
    }
  }).then(function(result){
    console.log(result)
    callback(result)
  });
};

exports.deleteBOM_materById = function (id,callback) {
  Material.destroy({
    where: {
      id: id
    }
  }).then(function(result){
    callback(result)
  });
};

exports.updateBOM_materById = function (id,status,name,property,materCateId,callback) {

  if (status){
    Material.update({
    status: status
    }, {
      where: {
        id: id
      }
    })
  }
  if (name){
    Material.update({
    name: name
    }, {
      where: {
        id: id
      }
    })
  }
  if (property){
    Material.update({
    property: property
    }, {
      where: {
        id: id
      }
    })
  }
  if (materCateId){
    Material.update({
    materCateId: materCateId
    }, {
      where: {
        id: id
      }
    })
  }
  Material.findAll({
    'where': {
        'id': id
    }
  }).then(function(result){
    console.log(result)
    callback(result)
  });

};
exports.listallBOM_materbyIdname = function (Id,name,callback) {
  Material.findAll({
    'where': {
        'Id': Id,
        'name': {'$like': '%'+name+'%'}
    }
  }).then(function(result){
    console.log(result)
    callback(result)
  });
};


exports.findproducts = function(id,dosomething) {
    var sqlquery1="SELECT * FROM consists inner join products on consists.productId = products.id where materialId =" + id;
    db.query(sqlquery1).then(function(tests){   
          dosomething(tests)
        });
};

