const path = require('path')
process.env['NODE_CONFIG_DIR'] = path.join(__dirname,'./../../../config/github')
const config = require('config')
const {authorize:{checkAccessToken},repo:{createRemoteRepositry,setupRepository,createGitIgnoreFile}} =  require('../index')

async function initGithub(){
    await checkAccessToken(config.get('baseUrl'),config.get('authorize_path'))
}

async function pushLocalFileToGithub(repo_name,repo_description,repo_noun){
    await createGitIgnoreFile()
    await createRemoteRepositry(repo_name,repo_description,config.get('baseUrl'),config.get('create_repo_url'))
    await setupRepository(repo_noun)
}

module.exports = {
    initGithub,
    pushLocalFileToGithub
}