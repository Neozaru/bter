var bter = require('../lib/bter');

exports['get all ticket pairs'] = function(test) {
	test.throws(function() { bter.getAllPairs(); }, Error, 'No callback defined');
	test.expect(1);
    test.done();
};

exports['get ticker for btc/doge'] = function(test) {
	test.throws(function() { bter.getTicker(); }, Error, 'No callback defined');
	test.throws(function() { bter.getTicker({}); }, Error, 'No options defined');
	test.throws(function() { bter.getTicker({ CURR_A: 'btc' }); }, Error, 'You must define two currencies');
	test.throws(function() { bter.getTicker({ CURR_B: 'doge' }); }, Error, 'You must define two currencies');
	test.expect(4);
    test.done();
};

exports['get market depth for btc/doge'] = function(test) {
	test.throws(function() { bter.getDepth(); }, Error, 'No callback defined');
	test.throws(function() { bter.getDepth({}); }, Error, 'No options defined');
	test.throws(function() { bter.getDepth({ CURR_A: 'btc' }); }, Error, 'You must define two currencies');
	test.throws(function() { bter.getDepth({ CURR_B: 'doge' }); }, Error, 'You must define two currencies');
	test.expect(4);
    test.done();
};

exports['get trade history for btc/doge'] = function(test) {
	test.throws(function() { bter.getHistory(); }, Error, 'No callback defined');
	test.throws(function() { bter.getHistory({}); }, Error, 'No options defined');
	test.throws(function() { bter.getHistory({ CURR_A: 'btc' }); }, Error, 'You must define two currencies');
	test.throws(function() { bter.getHistory({ CURR_B: 'doge' }); }, Error, 'You must define two currencies');
	test.expect(4);
    test.done();
};