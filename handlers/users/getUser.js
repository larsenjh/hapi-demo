module.exports = function(request, reply) {
	var db = request.server.plugins['hapi-mongodb'].db;
	var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;
	// note: ObjectID() will actually throw an exception if not correct format, good
	// chance to test out the hapi error catching feature, try bad values
	db.collection('users').findOne({"_id": new ObjectID(request.params.id)}, function(err, result) {
		return reply(err, result);
	});
};
