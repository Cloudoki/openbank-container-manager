const joi = require('joi')

const containerSrvc = require('../../services/container')

exports = module.exports = {}

/** handler for /build endpoint */
exports.build = {
	validate: {
		query: {
			name: joi.string().required(),
		},
	},
	handler: async (request, h) => {

		await containerSrvc.buildImage(request.query.name, request.payload, `${__dirname}/../../../output/`)

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

exports.start = {
	validate: {
		params: {
			image: joi.string().required(),
		},
		payload: {
			name: joi.string().required(),
		},
	},
	handler: async (request, h) => {

		await containerSrvc.start(request.params.image, request.payload.name)

		return h.response().code(200)

	},
	id: 'obcmanager-start',
	description: 'start endpoint',
	notes: ['start endpoint'],
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
