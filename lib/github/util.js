const {Octokit} = require('@octokit/rest');

function getOctokitInstance(baseUrl,accessToken){
    const octokit = new Octokit({
        baseUrl: baseUrl,
        auth: accessToken
    })

    return octokit
}

module.exports = {
    getOctokitInstance
}