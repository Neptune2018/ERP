var db = require('../models').DB;
// var UserSQL = {starving_warning :'select repertoryId, materialId, name,  remain, place, unit, batch from stocks, materials where style = 0 and materialId = materials.id and remain < materials.safe_quantity;'};
// 展示出入库信息
var query = 'select  (@i:=@i+1) as num, IF(iostyle, \'出库\', \'入库\') as style, updatedAt, name, quantity, ioListId, goodsId, fromName, toName from ((select \'产品\'as style, name, quantity,  ioListId, productId as goodsId from products, io_items where productId=products.id and io_items.style=true) union (select \'原材料\'as style, name, quantity,  ioListId, materialId as goodsId from materials, io_items where materialId=materials.id and io_items.style=false))ioitem, (select io_lists.style as iostyle, io_lists.id as ioid, io_lists.updatedAt, user1.name as fromName, user2.name as toName from io_lists,users as user1, users as user2 where io_lists.fromPersonId=user1.id and io_lists.toPersonId=user2.id) iolist,(select @i:=0) as it where ioid=ioListId order by updatedAt desc;'

exports.ShowIORecord = function(dosomething) {
    db.query(query).then(function(rows){
    dosomething(rows);
    })
};
