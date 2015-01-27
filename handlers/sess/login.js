var boom = require('boom');
var jwt = require('jwt-simple');

module.exports = function(request, reply) {
	var db = request.server.plugins['hapi-mongodb'].db;
	db.collection('users').findOne({email: request.payload.email}, function(err, user) {
		if(err) return reply(err);
		if(!user) return reply(boom.forbidden('no user matching that email exists'));
		
		db.collection('sess').insert({user: user}, function(err, docs) {
			if(err) return reply(err);
			
			request.log(['info', 'login'], reply.lodash.extend({message: "user logged in", user: user, doc: docs}));
			
			// create a jwt
			var token = jwt.encode({id: docs[0]._id.toString()}, request.server.CONFIG.jwtSecret);
			reply({
				access_token: token,
				user: user
			});
		});
	});
};

