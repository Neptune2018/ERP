var Material = require('../models').Material;
var Stock = require('../models').Stock;

exports.findAllMaterial = function () {
    return Material.findAll()
}

exports.setSafeQuantity = function (material_id, quantity) {
    var materialRows = Material.update({
        safe_quantity: quantity
    }, {
        where: {
            id: quantity
        }
    })
    return materialRows;
}
exports.findStarve = function () {
    var materials = Stock.findAll({
        include: [Material],
        where: {
            remain: {
                $lte: material.safe_quantity
            }
        }
    })
    return materials;
}