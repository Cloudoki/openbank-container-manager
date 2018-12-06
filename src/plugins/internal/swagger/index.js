const hapiswagger = require('hapi-swagger')

const config = require('../../../config')

/**
 * Swagger hapi plugin to auto generate swagger documentation based on code. Should be disabled in production.
 * @module plugins/internal/swagger
 */

const swaggerConfig = config.get('swagger')

/** Plugin with its configurations to be loaded into hapi */
module.exports = {
	plugin: hapiswagger,
	options: {
		schemes: swaggerConfig.schemes,
		host: swaggerConfig.host,
		info: {
			title: 'ApiGen API Documentation',
			version: '1.0.0',
		},
		documentationPath: '/info/swagger',
	},
}
