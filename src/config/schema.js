const schema = {
	env: {
		doc: 'The API environment.',
		format: ['production', 'staging', 'test', 'development'],
		default: 'development',
		env: 'OBCMANAGER_API_NODE_ENV',
	},
	server: {
		host: {
			doc: 'The IP address to bind.',
			format: 'ipaddress',
			default: '0.0.0.0',
			env: 'OBCMANAGER_API_IP_ADDRESS',
		},
		port: {
			doc: 'The port to bind.',
			format: 'port',
			default: 3000,
			env: 'OBCMANAGER_API_PORT',
		},
		routes: {
			cors: {
				origin: {
					doc: 'Server default CORS origin',
					format: Array,
					env: 'OBCMANAGER_API_DEFAULT_CORS_ORIGINS',
					default: [],
				},
				additionalHeaders: {
					doc: 'Server default CORS headers',
					format: Array,
					env: 'OBCMANAGER_API_DEFAULT_CORS_HEADERS',
					default: [],
				},
			},
		},
	},
	swagger: {
		schemes: {
			doc: 'The transfer protocol of the API',
			format: ['http', 'https'],
			default: ['http'],
			env: 'OBCMANAGER_API_SWAGGER_SCHEME',
		},
		host: {
			doc: 'The host (name or IP) serving the API including port if any',
			format: String,
			default: 'localhost:3000',
			env: 'OBCMANAGER_API_SWAGGER_HOST',
		},
	},
	plugins: {
		doc: 'Plugins to load',
		format: Array,
		env: 'OBCMANAGER_API_ENABLED_PLUGINS',
		default: [
			'inert',
			'vision',
			'./plugins/internal/swagger',
			'./plugins/internal/good',
			'./plugins/internal/jsdoc',
			'./plugins/internal/lab',
			'./plugins/health',
			'./plugins/container',
		],
	},
	pino: {
		config: {
			name: {
				doc: 'API logger name',
				format: String,
				default: 'obcmanager',
			},
			level: {
				doc: 'Logger level',
				format: ['trace', 'debug', 'info', 'warn', 'error', 'fatal'],
				env: 'OBCMANAGER_API_LOG_LEVEL',
				default: 'trace',
			},
		},
		pretty: false,
	},
	dockerhub: {
		username: {
			doc: 'Dockerhub username',
			format: String,
			env: 'OBCMANAGER_DH_USERNAME',
		},
		password: {
			doc: 'Dockerhub pasword',
			format: String,
			env: 'OBCMANAGER_DH_PASSWORD',
		},
	},
}

module.exports = schema
