var addUser = require('./add_users');
var addPurchase = require('./purchase_moudle')
var productControl = require('./product_control')
var addUserforIOList = require('./add_users_for_iolist')
var addProducts = require('./add_products')
var addStocks = require('./add_stocks')
var addIOList = require('./add_iolist')
var addIOItem = require('./add_ioitems')

const insertData = async function() {
    await addUser.addUser();    // 添加功能、角色、用户，测试管理员账号（电话）：11111111111，密码：123456
    await addUserforIOList.addUserforIOList();
    await addPurchase.addPurchase();
    await productControl.productControl();
    await addProducts.addProducts();
    await addStocks.addStocks();
    await addIOList.addIOList();
    await addIOItem.addIOItem();
}

insertData();