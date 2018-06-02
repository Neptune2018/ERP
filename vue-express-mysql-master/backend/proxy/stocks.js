var db = require('../models').DB;
// 添加库存信息
var query = 'select stocks.id, materialId as \'goodsId\', name, remain, unit, \'原料\' as style, batch, repertoryId from stocks, materials where style = 0 and materialId = materials.id union select stocks.id, productId as \'goodsId\', name, remain, unit, \'商品\' as style, batch, repertoryId from stocks, products where style = 1 and productId = products.id;'
exports.ShowStocks = function(dosomething) {
    db.query(query).then(function(rows){
    dosomething(rows);
    })
};
