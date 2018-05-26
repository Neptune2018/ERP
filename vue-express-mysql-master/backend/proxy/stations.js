var db = require('../models').DB;
// var UserSQL = {starving_warning :'select repertoryId, materialId, name,  remain, place, unit, batch from stocks, materials where style = 0 and materialId = materials.id and remain < materials.safe_quantity;'};
// 展示仓库信息
var query = 'select stations.id, stations.name, remark, user1.name as user1name, user2.name as user2name from stations, users as user1, users as user2 where user1.id = userId and user2.id = managerId;'

exports.ShowStations = function(dosomething) {
    db.query(query).then(function(rows){
    dosomething(rows);
    })
};
