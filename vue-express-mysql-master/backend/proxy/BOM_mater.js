var BOM_mater = require('../models').BOM_mater;
var Material = require('../models').Material;


//添加函数
exports.addBOM_mater = function (id,name,property,materCateId,callback) {
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
    'attributes': ['id', 'name','property','materCateId'],
    'where': {
        'status': 0
    }
}).then(
        function(result){
            callback(result);
        }
    );
};


// 列出指定父分类下的所有子分类
exports.listallBOM_materbyID = function (Id,callback) {
  Material.findAll({
    'attributes': ['id', 'name','property','materCateId'],
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
exports.listallBOM_materbyname = function (name,callback) {
  Material.findAll({
    'attributes': ['id', 'name','property','materCateId'],
    'where': {
        'name': name,
        'status': 0
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

exports.updateBOM_materById = function (id,name,property,materCateId,callback) {
  Material.update({
    name: name,
    property: property,
    materCateId: materCateId,
  }, {
    where: {
      id: id
    }
  }).then(function(result){
    console.log(result)
    callback(result)
  });
};
exports.listallBOM_materbyIdname = function (Id,name,callback) {
  Material.findAll({
    'attributes': ['id', 'name','property','materCateId'],
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




