var IO = require('../proxy/io_events')

exports.getRepertory = function(req,res){
    IO.searchRepertory(function(data) {
        //console.log(data[0][0])
		res.send(data)
    })
}

exports.stockAvail = function(req,res){
    IO.searchMax(function(data) {
        //console.log(info)
        if(data[0].length>0){   
            if(data[0][0]['max']<req.body.quantity){
                res.send({'quant':0})
            } else {
                res.send({'quant':1})
            }
        } else {
            res.send({'quant':0})
        }
    },req.body.id)
}
exports.placeAvail = function(req,res){
    IO.placeAvailable(function(data) {  
        //console.log(info)
        if(data[0].length>0){
            res.send({'place':0})
        } else {
            res.send({'place':1})
        }
    },req.body.place,req.body.id)
}
exports.wareAvail = function(req,res){
    IO.repertoryExist(function(data) {  
        //console.log(info)
        if(data[0].length == 0){
            res.send({'ware':0})
        } else {
            res.send({'ware':1})
        }
    },req.body.id,req.body.name)
}
exports.insertIO = function(req,res){
    IO.insertIO(res.body)
}