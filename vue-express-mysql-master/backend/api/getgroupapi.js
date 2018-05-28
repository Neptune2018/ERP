var config = require('../config');
var fs = require('fs');
var path = require('path');
//关注proxy
var getgroup = require('../proxy').GetGroup;

exports.onloadapi = function(req, res) {
	console.log(req.session.sess)
	req.session.sess = 'yes';
	getgroup.findAl(function(data) {
		res.send(data)
	})
} 

exports.singleonloadapi = function(req, res) {
	console.log(req.session.sess)
	req.session.sess = 'yes';
	getgroup.singleonload(function(data) {
		res.send(data)
	},req.query.group)
} 

exports.searchuserapi = function(req, res) {
	console.log(req.session.sess)
	req.session.sess = 'yes';
	getgroup.searchuser(function(data) {
		res.send(data)
	},req.body.sql)
} 