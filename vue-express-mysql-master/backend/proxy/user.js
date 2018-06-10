var Admin = require('../models').Admin;
var User = require('../models').User;
var utils = require('../utils');

exports.signin = function(username, password, suss, fail) {
	console.log(password)
	console.log(username)
	User.findOne({where: {phone: username}}).then(function(user){
		if (!user) {
			fail();
		}else {
			user.getAdmin().then(function(admin){
				console.log("key", utils.makePassword(password))
				if(admin['password'] == utils.makePassword(password)) {

					console.log(user);
					suss(user);
				}
				else {
					fail();
				}
			});
		}
	});
}

exports.getFeatures = function(username, todo) {
	console.log(username)
	User.findOne({where: {phone: username}}).then(function(user){
		if (!user) {
			todo('', []);
		}else {
			user.getRole().then(function(role){
				role.getFeatures().then(function(features){
					returnFeatures = []
					features.forEach(function(value,index,array){
						returnFeatures.push(value.name)
					})
					todo(role, returnFeatures);
				})
			})
		}
	})
}