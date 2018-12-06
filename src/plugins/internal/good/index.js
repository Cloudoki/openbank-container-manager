/**
 * good hapi plugin that automatic logs API requests.
 * @module plugins/internal/good
 */

/** Plugin with its configurations to be loaded into hapi */
module.exports = {
	plugin: require('good'),
	options: {
		reporters: {
			myConsoleReporter: [{
				module: 'good-squeeze',
				name: 'Squeeze',
				args: [{ log: '*', response: '*' }],
			}, {
				module: 'good-console',
			}, 'stdout'],
		},
	},
}
