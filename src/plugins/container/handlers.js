const joi = require('joi')

const ciSrvc = require('../../services/container-image')

exports = module.exports = {}

/** handler for /build endpoint */
exports.build = {
	validate: {
		query: {
			name: joi.string().required(),
		},
	},
	handler: async (request, h) => {

		await ciSrvc.build(request.query.name, request.payload, `${__dirname}/../../../output/`)

		return h.response().code(200)

	},
	payload: {
		maxBytes: 1000 * 1000 * 5,
		output: 'data',
		allow: 'application/x-www-form-urlencoded',
		parse: false,
	},
	id: 'obcmanager-build',
	description: 'build endpoint',
	notes: ['build endpoint'],
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'200': { 'description': 'OK' },
				'503': { 'description': 'Service Unavailable' },
			},
		},
	},
}
