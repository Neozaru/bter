(function() {
	'use strict';

	var bter = require('bter');

	var API_KEY = 'YOUR_API_KEY', SECRET_KEY = 'YOUR_SECRET_KEY';

	// Gets all pairs available
	bter.getAllPairs(function(err, result) {
		if(err) throw err;
		console.log(result);
	});
	
	// Gets all ticker information for the given pair
	bter.getTicker({ CURR_A: 'doge', CURR_B: 'btc' }, function(err, result) {
		if(err) throw err;
		console.log(result);
	});
	
	// Gets all market depth including buy/ask orders
	bter.getDepth({ CURR_A: 'doge', CURR_B: 'btc' }, function(err, result) {
		if(err) throw err;
		console.log(result);
	});
	
	// Gets the 80 most recent trade orders
	bter.getHistory({ CURR_A: 'doge', CURR_B: 'btc' }, function(err, result) {
		if(err) throw err;
		console.log(result);
	});
	
	// Gets the current balance of the account
	bter.getFunds({ API_KEY: API_KEY, SECRET_KEY: SECRET_KEY }, function(err, result) {
		if(err) throw err;
		console.log(result);
	});
	
	// Places a new order (buy or sell)
	bter.placeOrder({ API_KEY: API_KEY, SECRET_KEY: SECRET_KEY, PAIR: 'doge_btc', TYPE: 'SELL', RATE: '0.00000225', AMOUNT: '300000' },
		function(err, result) {
			if(err) throw err;
			console.log(result);
		});

	// Cancels an open order
	bter.cancelOrder({ API_KEY: API_KEY, SECRET_KEY: SECRET_KEY, ORDER_ID: 9395299 }, function(err, result) {
		if(err) throw err;
		console.log(result);
	});
	
	// Gets the status of the given order
	bter.getOrderStatus({ API_KEY: API_KEY, SECRET_KEY: SECRET_KEY, ORDER_ID: 9395299 }, function(err, result) {
		if(err) throw err;
		console.log(result);
	});

	// Gets the entire open order list
	bter.getOrderList({ API_KEY: API_KEY, SECRET_KEY: SECRET_KEY }, function(err, result) {
		if(err) throw err;
		console.log(result);
	});

})();
