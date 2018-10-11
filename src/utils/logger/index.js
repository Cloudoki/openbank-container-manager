const pino = require('pino')

const config = require('../../config')

const pinoConfig = config.get('pino')

/**
 * Logger module that uses bunyan npm pacage as logger
 * @module utils/logger
 */

/** Provides a logger for the API */
if (pinoConfig.pretty) {
	const pretty = pino.pretty()
	pretty.pipe(process.stdout)
	exports = module.exports = pino(pinoConfig.config, pretty)
} else {
	exports = module.exports = pino(pinoConfig.config)
}


