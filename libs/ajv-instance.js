const Ajv = require('ajv')
const addFormats = require('ajv-formats')

const ajvInstance = new Ajv({ allErrors: true, $data: true })
addFormats(ajvInstance)

module.exports = ajvInstance