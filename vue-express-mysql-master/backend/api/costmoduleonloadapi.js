var config = require('../config');
var fs = require('fs');
var path = require('path');
//关注proxy
var CostModuleonload = require('../proxy').CostModuleonload;

exports.onloadapi = function(req, res) {
	console.log(req.session.sess)
	req.session.sess = 'yes';
	CostModuleonload.findAll(function(data) {
		res.send(JSON.stringify(data))
	})
}