module.exports = function(request, reply) {
	var db = request.server.plugins['hapi-mongodb'].db;
	db.collection('users').insert(request.payload, function(err) {
		if(err) return reply(err);
		
		request.log(['info'], reply.lodash.extend({message: "created new user", payload: request.payload}));
		reply({});
	});
};
