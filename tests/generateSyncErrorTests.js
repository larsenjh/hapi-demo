var test = require('tape');
var hapi = require('hapi');

test('error returns 500 response (e2e)', function(t) {
	var server = new hapi.Server();
	server.connection();

	server.route({
		method: 'GET',
		path: '/api/err',
		handler: require('../handlers/other/generateSyncError')
	});

	server.inject('/api/err', function(res) {
		t.ok(res, "should be a response");
		t.equal(res.statusCode, 500, "should be status 500");
		t.end();
	});
});

