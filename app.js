var hapi = require('hapi');
var plugins = require('./setup/plugins');
var routes = require('./setup/routes');
var auth = require('./setup/auth');
var _ = require('lodash');

// create the server, set default behavior of connections and routes
var server = new hapi.Server({ // this default object is deep extended at the time routes/policies are declared
	connections: {
		routes: {
			cors: true
		}
	}
});
// can modify the defaults later using server.connections[].settings

// create connections
server.connection({port: 9090});
// TODO: demonstrate multiple connections

// decorate hapi server object with config
server.decorate('server', 'CONFIG', {
	jwtSecret: '8y7sdh7287hd8has78hd7h127hda,mncv',
	mongodb: {
		"url": "mongodb://localhost:27017/hapi-demo",
		"settings": {
			"db": {
				"native_parser": false
			}
		}
	}
});
// demonstrating decoration of reply variable
server.decorate('reply', 'lodash', _);

// register plugins (auth, logging, etc)
server.register(plugins(server.CONFIG), function (err) {
	if(err) throw err;

	// set up auth strategies
	auth.configureToken(server);

	// register routes
	server.route(routes);

	// start the server
	server.start(function(err) {
		if(err) throw err;
		server.log(['status'], 'Server running at: ' + server.info.uri);
	});
});

module.exports = server;