// const path = require('path')
// process.env['NODE_CONFIG_DIR'] = path.join(__dirname,'./../../config/github')
// const config = require('config')

const repo = require('./repo')
const authorize = require('./authorize')

module.exports = {
    repo,
    authorize
}