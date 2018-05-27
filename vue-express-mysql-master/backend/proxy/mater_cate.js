var MaterCate = require('../models').MaterCate;
var MaterCate = require('../models').Material;

// 添加新的物料分类
exports.addcate = function() {
    // 插入数据
    console.log(MaterCate)
    return MaterCate.create({
        name: 'okok',
        email: '@qq.com'
    });
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


// 查找指定父类的物料分类.注意：虽然不知道前端怎么显示，物料分类和具体的物料是分开查找的
exports.listallMater_catesbyMaterCateID = function (materCateId,callback) {
  MaterCate.findAll({
    'where': {
        'materCateId': materCateId
    }
  }).then(function(result){
    console.log(result)
    callback(result)
  });
};

// 查找指定分类下的的物料.注意：虽然不知道前端怎么显示，物料分类和具体的物料是分别开查找的
exports.listallMaterbyMaterCateID = function (materCateId,callback) {
  Material.findAll({
    include: [{
      model: MaterCate,
      where: {
        id: materCateId
      }
    }]
  }).then(function(data){
    callback(data);
  });
}
