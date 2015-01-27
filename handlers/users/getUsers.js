module.exports = function(request, reply) {
	var db = request.server.plugins['hapi-mongodb'].db;
	db.collection('users').find().toArray(function(err, users) {
		reply(err, users);
	});
};
