module.exports = (function() {
	'use strict';

	// Components
	var crypto = require('crypto'),
		request = require('request'),
		nonce = require('nonce')();

	// Constants
	var API_URL = 'http://data.bter.com/api/1/',
		USER_AGENT = 'Mozilla/5.0 (Windows NT 6.3; WOW64; rv:26.0) Gecko/20100101 Firefox/26.0';

	// Quick function for request 
	function throwback(options, result) {
		request(options, function(error, response, body) {
			if(error) result(error);

			try {
				var clean = JSON.parse(body);
				result(null, clean);
			} catch(e) {
				result(e, null);
			}
		});
	}

	// Signs a given message for auth
	function signMessage(private_key, msg) {
		var message = msg || '';
		return crypto.createHmac('sha512', private_key).update(message).digest('hex');
	}

	return {
		// Returns all pairs available for trading
		getAllPairs: function(cb) { // no options
			if(!cb) throw 'No callback defined';
			if(typeof cb != 'function') throw 'Callback must be a function';
			
			throwback({method: 'GET', url: API_URL + 'pairs', headers: { 'User-Agent' : USER_AGENT } }, cb);
		},
		// Returns the current ticker for the selected currency, cached in 10 seconds
		getTicker: function(options, cb) { // options = CURR_A, CURR_B
			if(!cb) throw 'No callback defined';
			if(typeof cb != 'function') throw 'Callback must be a function';
			if(!options) cb('No options defined');
			if(!options.CURR_A || !options.CURR_B) cb('You must define two currencies');
			
			throwback({method: 'GET', url: API_URL + 'ticker' + '/' + options.CURR_A + '_' + options.CURR_B, 
				headers: { 'User-Agent' : USER_AGENT } }, cb);
		},
		// Return the market depth including ask and bid orders.
		getDepth: function(options, cb) { // options = CURR_A, CURR_B
			if(!cb) throw 'No callback defined';
			if(typeof cb != 'function') throw 'Callback must be a function';
			if(!options) cb('No options defined');
			if(!options.CURR_A || !options.CURR_B) cb('You must define two currencies');
			
			throwback({method: 'GET', url: API_URL + 'depth' + '/' + options.CURR_A + '_' + options.CURR_B, 
				headers: { 'User-Agent' : USER_AGENT } }, cb);
		},
		// Returns the most recent trade history records (80)
		getHistory: function(options, cb) { // options = CURR_A, CURR_B, TID (optional)
			if(!cb) throw 'No callback defined';
			if(typeof cb != 'function') throw 'Callback must be a function';
			if(!options) cb('No options defined');
			if(!options.CURR_A || !options.CURR_B) cb('You must define two currencies');

			throwback({method: 'GET', url: API_URL + 'trade' + '/' + options.CURR_A + '_' + options.CURR_B 
				+ (options.TID ? '/' + options.TID : ''), headers: { 'User-Agent' : USER_AGENT } }, cb);
		},
		// Returns the funds of the given trader
		getFunds: function(options, cb) { // options = API_KEY, SECRET_KEY
			if(!cb) throw 'No callback defined';
			if(typeof cb != 'function') throw 'Callback must be a function';
			if(!options) cb('No options defined');
			if(!options.API_KEY || !options.SECRET_KEY) cb('You must defined both the API and SECRET key');

			var n = nonce(), 
				form = { nonce: n },
				signed = signMessage(options.SECRET_KEY, 'nonce=' + n);

			throwback({method: 'POST', url: API_URL + 'private/getfunds', form: form, headers: { 'User-Agent' : USER_AGENT, 'KEY': options.API_KEY, 'SIGN': signed } }, cb);
		},
		// Places a new buy/sell order 
		placeOrder: function(options, cb) { // options = API_KEY, SECRET_KEY, PAIR, TYPE, RATE, AMOUNT
			if(!cb) throw 'No callback defined';
			if(typeof cb != 'function') throw 'Callback must be a function';
			if(!options) cb('No options defined');
			if(!options.API_KEY || !options.SECRET_KEY) cb('You must defined both the API and SECRET key');
			if(!options.PAIR || !options.TYPE || !options.RATE || !options.AMOUNT) cb('You must define all options (pair, type, rate, amount)');

			var n = nonce(), 
				form = { pair: options.PAIR, type: options.TYPE, rate: options.RATE, amount: options.AMOUNT, nonce: n },
				signed = signMessage(options.SECRET_KEY, 'pair=' + options.PAIR + '&type=' + options.TYPE + '&rate=' + options.RATE + '&amount=' 
					+ options.AMOUNT + '&nonce=' + n);

			throwback({method: 'POST', url: API_URL + 'private/placeorder', form: form, headers: { 'User-Agent' : USER_AGENT, 'Key': options.API_KEY, 'Sign': signed } }, cb);
		},
		// Cancels a given order
		cancelOrder: function(options, cb) { // options = API_KEY, SECRET_KEY, ORDER_ID
			if(!cb) throw 'No callback defined';
			if(typeof cb != 'function') throw 'Callback must be a function';
			if(!options) cb('No options defined');
			if(!options.API_KEY || !options.SECRET_KEY) cb('You must defined both the public and private key');
			if(!options.ORDER_ID) cb('You must define the order id');

			var n = nonce(), 
				form = { 'order_id': options.ORDER_ID, nonce: n },
				signed = signMessage(options.SECRET_KEY, 'order_id=' + options.ORDER_ID + '&nonce=' + n);

			throwback({method: 'POST', url: API_URL + 'private/cancelorder', form: form, headers: { 'User-Agent' : USER_AGENT, 'Key': options.API_KEY, 'Sign': signed } }, cb);
		},
		// Returns the status of a given order id
		getOrderStatus: function(options, cb) { // options = API_KEY, SECRET_KEY, ORDER_ID
			if(!cb) throw 'No callback defined';
			if(typeof cb != 'function') throw 'Callback must be a function';
			if(!options) cb('No options defined');
			if(!options.API_KEY || !options.SECRET_KEY) cb('You must defined both the public and private key');
			if(!options.ORDER_ID) cb('You must define the order id');

			var n = nonce(), 
				form = { 'order_id': options.ORDER_ID, nonce: n },
				signed = signMessage(options.SECRET_KEY, 'order_id=' + options.ORDER_ID + '&nonce=' + n);

			throwback({method: 'POST', url: API_URL + 'private/getorder', form: form, headers: { 'User-Agent' : USER_AGENT, 'Key': options.API_KEY, 'Sign': signed } }, cb);
		},
		// Returns an open order list
		getOrderList: function(options, cb) { // options = API_KEY, SECRET_KEY
			if(!cb) throw 'No callback defined';
			if(typeof cb != 'function') throw 'Callback must be a function';
			if(!options) cb('No options defined');
			if(!options.API_KEY || !options.SECRET_KEY) cb('You must defined both the public and private key');

			var n = nonce(), 
				form = { nonce: n },
				signed = signMessage(options.SECRET_KEY, 'nonce=' + n);

			throwback({method: 'POST', url: API_URL + 'private/orderlist', form: form, headers: { 'User-Agent' : USER_AGENT, 'Key': options.API_KEY, 'Sign': signed } }, cb);
		}
	};
})();