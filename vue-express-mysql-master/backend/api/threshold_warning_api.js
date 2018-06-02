var ThresholdWarning = require('../proxy').ThresholdWarningFunc;

exports.ThresholdWarning = function(req, res) {
	ThresholdWarning.Warning(function(data){
		console.log(data[0]);
		// console.log(data);
		var data2 = [
				{
						repertoryId: '1',
						id: 18,
						name: '北京市朝阳区芍药居',
						remain:44,
						place:'仓库1',
						unit:'kg',
						batch:1234
				}
		];
		res.send(data[0]);
	})
};
