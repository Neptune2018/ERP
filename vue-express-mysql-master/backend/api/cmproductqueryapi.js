var config = require('../config');
var fs = require('fs');
var path = require('path');
//关注proxy
var CMProductQuery = require('../proxy').CMProductQuery;
var CostModuleonload = require('../proxy').CostModuleonload;

exports.searchapi = function(req, res) {

    console.log(req.query.sql)
	console.log(req.session.sess)
	req.session.sess = 'yes';
	CMProductQuery.findAll(function(data) {
		res.send(JSON.stringify(data))
	},req.query.sql)
}