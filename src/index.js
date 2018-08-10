'use strict'

const hapi = require('hapi')
const config = require('./config')

const log = require('./utils/logger')

const server = new hapi.Server(config.get('server'))

/**
 * Creates hapijs server, loads all plugins and start the server
 * @throws an error if plugin registration fails or server fails to start
 * @returns {Void} This function does not return a value
 */
async function start () {

	log.fatal('##### Starting Openbank Container Manager API #####')

	const plugins = config.get('plugins').map(plugin => require(plugin))

	await server.register(plugins)

	await server.start()

	log.info('All plugins were loaded successfuly')

	log.info('openbank-container-manager-api is up and running on port %s', config.get('server').port)

}

start()

module.exports = server
