var config = require('../config');
var fs = require('fs');
var path = require('path');
var modifyUserInfo = require('../proxy').modifyUserInfo;
var UserInfor = require('../proxy').UserInfor;

exports.showUserapi = function(req, res) {
	UserInfor.showUser(req.session.user.id, function(data) {
		res.send(data)
	});
}

exports.updateUserapi = function(req, res) {
    console.log(req.body.modify_data);
    
    modifyUserInfo.updateUser(req.body.modify_data);
    if(req.body.modify_data[5]!=''){modifyUserInfo.changePass(req.body.modify_data);}
   
   
	res.send(req.query);
}

