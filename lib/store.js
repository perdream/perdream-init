const configStore = require('configstore')
const pkg = require('./../package.json')

const conf = new configStore(pkg.name)

module.exports = conf