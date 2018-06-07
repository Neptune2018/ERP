var IORecord = require('../proxy').IORecord;

exports.IORecord = function(req, res) {
	IORecord.ShowIORecord(function(data){
		//console.log(data[0]);
		res.send(data[0]);
	})
};
