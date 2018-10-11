const joi = require('joi')
const containerSrvc = require('../../services/container')
const kongConfig = require('../../config').get('kong').instance

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
		headers: joi.object({
			'x-openbank-organization': joi.string().required(),
		}).options({allowUnknown: true}),
	},
	handler: async (request, h) => {

		try {
			const org = request.headers['x-openbank-organization']
			await containerSrvc.start(request.params.image, org)
		} catch (error) {
			return h.response(error.message).code(400)	
		}

		

		return h.response()
			.header('location', `${kongConfig.gateway}${request.query['path']}`)
			.code(302)
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
