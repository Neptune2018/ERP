var Stations = require('../proxy').Stations;

exports.Stations = function(req, res) {
	Stations.ShowStations(function(data){
		//console.log(data[0]);
		res.send(data[0]);
	})
};
