var jwt = require('jwt-simple');

module.exports.configureToken = function(server) {
	// setup the auth bearer token details (strategy)
	server.auth.strategy('token', 'bearer-access-token', {
		allowQueryToken: true,              // optional, true by default
		allowMultipleHeaders: false,        // optional, false by default
		accessTokenName: 'access_token',    // optional, 'access_token' by default
		validateFunc: function( token, callback ) {
			// For convenience, the request object can be accessed 
			// from `this` within validateFunc.
			var request = this;

			// using simple jwt decode the token to get the user id
			var info = jwt.decode(token, server.CONFIG.jwtSecret);
			// get the sess record from the mongo db
			var db = server.plugins['hapi-mongodb'].db;
			var ObjectID = server.plugins['hapi-mongodb'].ObjectID;
			
			db.collection('sess').findOne({"_id": new ObjectID(info.id)}, function(err, result) {
				if(err) return callback(err);
				
				if(!result) {
					// no sess found
					return callback(null, false); // not authenticated
				}

				var creds = {
					sessId: result._id,
					user: result.user,
					scope: [ result.user.role ]
				};
				callback(null, true, creds)
			});
		}
	});
};
