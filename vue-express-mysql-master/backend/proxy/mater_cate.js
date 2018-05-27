var MaterCate = require('../models').MaterCate;

// 添加新的物料分类
exports.addcate = function() {
    // 插入数据
    console.log(MaterCate)
    return MaterCate.create({
        name: 'okok',
        email: '@qq.com'
    });
};

// 查找没有父类的物料分类
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


// 查找指定父类的物料分类
exports.listallMater_catesbyfather = function (materCateId,callback) {
  MaterCate.findAll({
    'where': {
        'materCateId': materCateId
    }
  }).then(function(result){
    console.log(result)
    callback(result)
  });
};