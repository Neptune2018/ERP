var Test = require('../models').Test;

// 添加新用户
exports.addTest = function() {
    // 向 user 表中插入数据
    console.log(Test)
    return Test.create({
        name: 'okok',
        email: '@qq.com'
    });
};

// 通过用户名查找用户
exports.findAll = function(dosomething) {
    Test.findAll().then(function(tests){
    	dosomething(tests);
    });
};