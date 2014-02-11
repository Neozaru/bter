# bter
Simple BTER library for the BTER.com API

## Installation
    $ npm install bter

## Tests
    $ grunt test

## Examples

```javascript
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
```

## API
### .getAllPairs(callback)
This function returns all ticker pairs supported by the BTER API

### .getTicker(options, callback)
This function returns ticker information for the given pair. It 
requires two options, CURR_A and CURR_B. See above for an example.

### .getDepth(options, callback)
This function returns the market depth for the given pair including
buy/sell orders. It requires two options, CURR_A and CURR_B. 
See above for an example.

### .getHistory(options, callback)
This function returns the last 80 recent trade orders for the given pair. It 
requires two options, CURR_A and CURR_B. TID is optional. See above for an example.

### .getFunds(options, callback)
This function returns the current funds available on the account. It 
requires two options, API_KEY and SECRET_KEY. See above for an example.

### .placeOrder(options, callback)
This function places a new buy/sell order for the account. It 
requires six options, API_KEY, SECRET_KEY, PAIR, TYPE, RATE, AMOUNT. See above for an example.

### .cancelOrder(options, callback)
This function cancels an open order. It requires three options, 
API_KEY, SECRET_KEY, and ORDER_ID. See above for an example.

### .getOrderStatus(options, callback)
This function queries the status on an open order. It requires three options, 
API_KEY, SECRET_KEY, and ORDER_ID. See above for an example.

### .getOrderList(options, callback)
This function returns all open orders on the account. It requires two options, 
API_KEY, and SECRET_KEY. See above for an example.

For more detailed information, refer to https://bter.com/api

## TODO
- Finish tests that require API/SECRET key

## License
Copyright (c) 2014 OPFL

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

## Donations 
BTC: 16x2x5wWveFwwYDtZ1V5jxjssu51uVbH1U
DOGE: DAc7HLRpVhLTQ4qHrNDYAFKEUs1LKsFu4N
