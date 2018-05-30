var Stocks = require('../proxy').Stocks;

exports.Stocks = function(req, res) {
	Stocks.ShowStocks(function(data){
		console.log(data[0]);
		res.send(data[0]);
	})
};
