/**
 * plugin to serve jsdoc html generated documentation. Should be disabled in production.
 * @module plugins/internal/jsdoc
 */

/** Configuration object for health endpoints */
exports.plugin = {
	register: (server) => {
		server.route([
			{
				method: 'GET',
				path: '/info/jsdoc/{file*}',
				options: {
					handler: {
						directory: {
							path: 'docs',
						},
					},
				},
			},
		])
	},
	name: 'jsdoc',
	dependencies: ['inert'],
}
