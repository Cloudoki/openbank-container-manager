const convict = require('convict')

/**
 * Uses convict npm package. Accepts JSON config files and environment variables.
 * Can have preset configurations based on enviroment.
 * @module config
 */

// Define a schema
const schema = require('./schema')

const config = convict(schema)

// Load environment dependent configuration
const env = config.get('env')

config.loadFile(`src/config/envs/${env}.json`)

/** Provides a convict configuration object */
module.exports = config
