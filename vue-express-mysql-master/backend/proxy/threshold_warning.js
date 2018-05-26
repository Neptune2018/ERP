var Stock = require('../models').Stock;
var Material = require('../models').Material;
var db = require('../models').DB;

exports.Warning = function(dosomething) {
    var result = [];
    db.query('select repertoryId, materialId, name,  remain, place, unit, batch from stocks, materials where style = 0 and materialId = materials.id and remain < materials.safe_quantity;').then(function(rows){
    dosomething(rows);
    })
};
