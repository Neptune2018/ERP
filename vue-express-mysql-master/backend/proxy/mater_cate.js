var MaterCate = require('../models').MaterCate;
var Material = require('../models').Material;





exports.addMater_cate = function (name,materCateId,callback) {
  MaterCate.create({
    name: name,
    materCateId: materCateId
  }).then(function(data){
    callback(data)
  })
};


// 查找没有父类的物料分类,也就是最高层分类
exports.listallMater_cates = function(callback) {
    MaterCate.findAll({
    'where': {
        'materCateId': null
    }
}).then(
        function(result){
            callback(result);
        }
    );
};


// 列出指定父分类下的所有子分类
exports.listallMater_catesbyMater_Cateid = function (id,callback) {
  MaterCate.findAll({
    'where': {
        'materCateId': id
    }
  }).then(function(result){
    console.log(result)
    callback(result)
  });
};

// 列出指定父分类下的所有物料
exports.listallMaterbyMater_Cateid = function (id,callback) {
  console.log(23432423)
  Material.findAll({
      where: {
        materCateId: id
      }
  }).then(function(data){
    callback(data);
  });
}


exports.deleteMater_cateById = function (id,callback) {
  MaterCate.destroy({
    where: {
      id: id
    }
  }).then(function(result){
    callback(result)
  });
};


exports.updateMater_cateByid = function (id,name,materCateId,callback) {
  MaterCate.update({
    id: id,
    name: name,
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
