var config = require('../config');
var fs = require('fs');
var path = require('path');
var UserInfor = require('../proxy').UserInfor;

exports.showUser = function(req, res) {
	UserInfor.showUser(function(data) {
		res.send(data)
	});
}

exports.updateUser = function(req, res) {
	console.log(req.query);
	UserInfor.updateUser(req.query);
	res.send(req.query);
}

exports.changePass = function(req, res) {
	console.log(req.query);
	UserInfor.changePass(req.query, function(data) {
		res.send(data);
	});
}