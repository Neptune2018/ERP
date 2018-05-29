var config = require('../config');
var fs = require('fs');
var path = require('path');
//关注proxy
var CostModuleonloadmtr = require('../proxy').CostModuleonloadmtr;

exports.onloadapi = function(req, res) {
	console.log(req.session.sess)
	req.session.sess = 'yes';
	CostModuleonloadmtr.findAll(function(data) {
		res.send(JSON.stringify(data))
	})
}