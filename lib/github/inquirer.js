const inquirer = require('inquirer')
const questions = require('./question')

/**
 * return promise
 */
function askGithubCredentials(){
    return inquirer.prompt(questions.askCredentials)
}

function askGithubRepoDetails(repo_name,repo_describe){
    return inquirer.prompt(questions.askRepoDetails(repo_name,repo_describe))
}

function askGithubIngnoreFiles(fileList){
    const qs = questions.askIgnoreFiles(fileList)
    return inquirer.prompt(qs)
}

module.exports = {
    askGithubCredentials,
    askGithubRepoDetails,
    askGithubIngnoreFiles
}