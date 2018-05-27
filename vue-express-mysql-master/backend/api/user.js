var User = require('../proxy').User;

exports.signin = function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	console.log(req);
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