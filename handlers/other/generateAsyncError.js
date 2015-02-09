module.exports = function(request, reply) {
	var db = request.server.plugins['hapi-mongodb'].db;
	db.collection('users').findOne({email: "noop"}, function(err, user) {
		// let's try a seg fault!
		ouch.break();
	});	
};
