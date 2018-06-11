var IO = require('../proxy/io_events')
let start = 123
exports.getRepertory = function(req,res){
    IO.searchRepertory(function(data) {
        //console.log(data[0][0])
		res.send(data)
    })
}
exports.findPerson = function(req,res){
    IO.searchPerson(function(data){
        if(data[0].length>0){
            res.send("success")
        }
        else {
            res.send("fail")
        }
    },req.body.id)
}
exports.findStockid = function(req,res){
    IO.searchStockId(function(data){
        if(data[0].length>0){
            res.send("success")
        }
        else {
            res.send("fail")
        }
    },req.body.id)
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
            res.send("fail")
        } else {
            res.send("success")
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
    for(var i = 0;i<req.body.length;i++){
        var tmp = start.toString()   
        //console.log(tmp)    
        IO.insertIO(tmp,req.body[i])
        IO.insertPM(tmp,req.body[i])
        //console.log(req.body[i].style)
        IO.insertStock(req.body[i],tmp,tmp)  
        start = start+1
    }
    res.send("success")
}

exports.exportWare = function(req,res){
    for(var i = 0;i<req.body.data.length;i++){
        
        IO.findRemain(function(data,i){
            if(data[0][0].remain>=req.body.data[i].remain){
                IO.updateRemain(data[0][0].remain-req.body.data[i].remain,req.body.data[i].id)
            } 
        },req.body.data[i].id,i)
        var cur_id = Math.floor(Math.random()*10000)
        IO.exportIO(cur_id,req.body.fromPerson,req.body.toPerson)
        IO.addIOitem(cur_id,req.body.data[i].goodsId,req.body.data[i].style,req.body.data[i].remain,req.body.data[i].unit,req.body.data[i].batch)
        console.log("success~!")  
    }
    res.send("success")
}