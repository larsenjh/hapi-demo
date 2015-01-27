

module.exports =  function(config) {
	return [
		// setup good (logging)
		{
			register: require('good'),
			options: {
				opsInterval: 20000,
				reporters: [
					{
						reporter: require('good-console'),
						args: [{log: '*', request: '*', response: '*', error: '*', ops: '*'}]
					},
					{
						reporter: require('good-mongodb'),
						args: [
							config.mongodb.url,
							{
								collection: 'logs',
								events: {
									log: ['*']
								}
							}
						]
					}
				],
				logRequestHeaders: true,
				logRequestPayload: true,
				logResponsePayload: true
			}
		},
		{
			register: require('hapi-mongodb'),
			options: config.mongodb
		},
		// setup bearer token auth
		{
			register: require('hapi-auth-bearer-token')
		}
	];
};
