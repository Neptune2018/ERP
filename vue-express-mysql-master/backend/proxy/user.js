var Admin = require('../models').Admin;
var User = require('../models').User;

exports.signin = function(username, password, suss, fail) {
	console.log(password)
	console.log(username)
	User.findOne({where: {phone: username}}).then(function(user){
		user.getAdmin().then(function(admin){
			if(admin['password'] == password) {
				console.log(user);
				suss(user);
			}
			else {
				fail();
			}
		});
	});
}

exports.getFeatures = function(username, todo) {
	console.log(username)
	User.findOne({where: {phone: username}}).then(function(user){
		user.getRole().then(function(role){
			role.getFeatures().then(function(features){
				returnFeatures = []
				features.forEach(function(value,index,array){
					returnFeatures.push(value.name)
				})
				todo(role, returnFeatures);
			})
		})
	})
}