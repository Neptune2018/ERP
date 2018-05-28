var config = require('../config');
var fs = require('fs');
var path = require('path');
var Test = require('../proxy').Test;

exports.testapi = function(req, res) {
	console.log(req.session.sess)
	//console.log(Test);
	req.session.sess = 'yes';
	//Test.addTest();
	Test.deleteTest();
	Test.findAll(function(data) {
		res.send(data)
	})
}