var handlers = require('../handlers');
var joi = require('joi');

// ideally these routes would be organized in separate files instead of one massive file
module.exports = [
	{
		path: '/api/users',
		method: 'POST',
		handler: handlers.users.createUser,
		config: {
			auth: false,
			validate: {
				payload: {
					first: joi.string().max(100).required(),
					last: joi.string().max(100).required(),
					email: joi.string().email().required(),
					role: joi.string().max(20).required()
				}
			},
			// optional, for documentation
			description: "Register a new user.",
			notes: "Use this endpoint when needing to register a new user.",
			tags: ['api', 'registration', 'users']
		}
	},

	{
		path: '/api/users/{id}',
		method: 'GET',
		handler: handlers.users.getUser,
		config: {
			auth: 'token',
			validate: {
				params: {
					id: joi.string().required()
				}
			},
			// optional, for documentation
			description: "Get a specific users information.",
			notes: "Use this endpoint to list a specific user. (Requires valid auth)",
			tags: ['api', 'users']
		}
	},

	{
		path: '/api/users',
		method: 'GET',
		handler: handlers.users.getUsers,
		config: {
			auth: {
				strategies: ['token'],
				scope: ['admin'] // looks for this value in credentials.scope
			},
			// optional, for documentation
			description: "Get a list of all users.",
			notes: "Use this endpoint to list all users in the system. (Requires valid auth with admin level)",
			tags: ['api', 'users', 'admin']
		}
	},
	
	{
		path: '/api/sess',
		method: 'POST',
		handler: handlers.sess.login,
		config: {
			auth: false,
			validate: {
				payload: {
					email: joi.string().email().required(),
					password: joi.string().required()
				}
			},
			// optional, for documentation
			description: "Log in to the system.",
			notes: "Use this endpoint to log into the system.",
			tags: ['api', 'sess', 'login']
		}
	}
	
];
