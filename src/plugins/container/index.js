const handlers = require('./handlers')

exports = module.exports = {}

/**
 * hapi plugin with build endpoint.
 * @module plugins/container
 */

/** Configuration object for build endpoint */
exports.plugin = {
	register: (server) => {
		server.route([
			{
				method: 'POST',
				path: '/build',
				options: handlers.build,
			},
			{
				method: 'POST',
				path: '/start/{image}',
				options: handlers.start,
			},
		])
	},
	name: 'obcmanager-contaniner',
}
