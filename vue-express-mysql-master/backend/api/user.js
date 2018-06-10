var User = require('../proxy').User;
var utils = require('../utils');

exports.signin = function(req, res) {
	var username = req.body.username;
	var key = req.body.key;
	var password = utils.aesDecrypt(req.body.password, key);
	console.log("psd", password);
	User.signin(username, password, function(user){
		data = {};
		req.session.user = user;
		data.user = user;
		User.getFeatures(username, function(role, features) {
			data.features = features;
			req.session.features = features;
			data.role = role.name;
			req.session.role = role.name;
			res.send(data);
		})
	}, function() {
		res.send('fail');
	})
}


exports.signout = function(req, res) {
	req.session.user = {};
	req.session.features = [];
	req.session.role = '';
	res.send('');
}