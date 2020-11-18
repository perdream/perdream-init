// const path = require('path')
// process.env['NODE_CONFIG_DIR'] = path.join(__dirname,'./../../config/github')
// const config = require('config')
const conf = require('../store')
const inquirer = require('./inquirer')
const Spinner = require('clui').Spinner
const errorHandler = require('./errorHandler')

const {getOctokitInstance} = require('./util')

async function checkAccessToken(baseUrl,authorize_url){
    const credentials = await inquirer.askGithubCredentials()
    //get octokit instance
    const octokit = getOctokitInstance(baseUrl,credentials.accesstoken)
    const status= new Spinner('Authenticating now please wait ...')
    status.start()

    try{
        const checkResult = await octokit.request(`${authorize_url}`)

        if( checkResult.data.login !== credentials.username )errorHandler(-1)
        conf.set('github.accesstoken',credentials.accesstoken)
        
    }catch(error){
        errorHandler(error.status)

    }finally{
        status.stop()
    }

}

module.exports = {
    checkAccessToken
}


