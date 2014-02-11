var bter = require('../lib/bter');

exports['get all ticket pairs'] = function(test) {
	test.throws(function() { bter.getAllPairs(); });
	test.throws(function() { bter.getAllPairs('all'); });
	test.expect(2);
    test.done();
};

exports['get ticker for btc/doge'] = function(test) {
	test.throws(function() { bter.getTicker(); });
	test.throws(function() { bter.getTicker('btc/doge'); });
	test.throws(function() { bter.getTicker({ CURR_A: 'btc' }); });
	test.throws(function() { bter.getTicker({ CURR_B: 'doge' }); });
	test.throws(function() { bter.getTicker({ CURR_A: 'btc', CURR_B: 'doge' }); });
	test.expect(5);
    test.done();
};

exports['get market depth for btc/doge'] = function(test) {
	test.throws(function() { bter.getDepth(); });
	test.throws(function() { bter.getDepth('btc/doge'); });
	test.throws(function() { bter.getDepth({ CURR_A: 'btc' }); });
	test.throws(function() { bter.getDepth({ CURR_B: 'doge' }); });
	test.throws(function() { bter.getDepth({ CURR_A: 'btc', CURR_B: 'doge' }); });
	test.expect(5);
    test.done();
};

exports['get trade history for btc/doge'] = function(test) {
	test.throws(function() { bter.getHistory(); });
	test.throws(function() { bter.getHistory('btc/doge'); });
	test.throws(function() { bter.getHistory({ CURR_A: 'btc' }); });
	test.throws(function() { bter.getHistory({ CURR_B: 'doge' }); });
	test.throws(function() { bter.getHistory({ CURR_A: 'btc', CURR_B: 'doge' }); });
	test.expect(5);
    test.done();
};