module.exports = function(request, reply) {
	var db = request.server.plugins['hapi-mongodb'].db;
	var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;
	db.collection('users').findOne({"_id": new ObjectID(request.params.id)}, function(err, result) {
		return reply(err, result);
	});
};
