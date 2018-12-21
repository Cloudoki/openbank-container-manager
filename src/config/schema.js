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
			default: '',
			env: 'OBCMANAGER_DH_USERNAME',
		},
		password: {
			doc: 'Dockerhub pasword',
			format: String,
			default: '',
			env: 'OBCMANAGER_DH_PASSWORD',
		},
		baseSandboxImage: {
			name: {
				doc: 'The sandbox image name',
				format: String,
				default: 'openbank-sandbox-api',
				env: 'OBCMANAGER_SANDBOX_IMAGE_NAME',
			},
			version: {
				doc: 'The sandbox version name',
				format: String,
				default: '1.4.0.47.develop',
				env: 'OBCMANAGER_SANDBOX_VERSION',
			},
			fullName: {
				doc: 'The fully qualified docker image and tag',
				format : String,
				default: 'cloudokihub/openbank-sandbox-api:1.4.0.47.develop',
				env: 'OBCMANAGER_SANDBOX_FULL_NAME',
			},
		},
	},
	kong: {
		admin_api: {
			url: 'http://kong-admin-api:8001',
		},
		instance: {
			network: {
				doc: 'The kong docker network name',
				format: String,
				default: 'kong-network',
				env: 'OBCMANAGER_KONG_NETWORK',
			},
			gateway: {
				doc: 'The kong api gateway url',
				format: String,
				default: 'http://localhost:8000',
				env: 'OBCMANAGER_KONG_GATEWAY_URL',
			},
		},
	},
	auth: {
		url: {
			doc: 'The auth server url',
			format: String,
			default: 'https://auth.develop.openbankportal.be',
			env: 'OBCMANAGER_AUTH_SERVER_URL',
		},
	},
}

module.exports = schema
