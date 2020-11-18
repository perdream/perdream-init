const path = require('path')
process.env['NODE_CONFIG_DIR'] = path.join(__dirname,'./../../config/server')
const config = require('config')

console.log(config.get('host'))