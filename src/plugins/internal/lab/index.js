/**
 * plugin to serve lab test coverage info page. Should be disabled in production.
 * @module plugins/internal/lab
 */

/** Configuration object for health endpoints */
exports.plugin = {
	register: (server) => {
		server.route([
			{
				method: 'GET',
				path: '/info/lab/{file*}',
				options: {
					handler: {
						file: {
							path: 'test/coverage.html',
						},
					},
				},
			},
		])
	},
	name: 'lab',
	dependencies: ['inert'],
}
