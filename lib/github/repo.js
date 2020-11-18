const conf = require('../store')
const simpleGit = require('simple-git');
const git = simpleGit();
const _ = require('lodash')
const fs = require('fs')
const touch = require('touch')
const CLI = require('clui')
const Spinner = CLI.Spinner
const { askGithubRepoDetails, askGithubIngnoreFiles } = require('./inquirer')
const { getOctokitInstance } = require('./util')
const errorHandler = require('./errorHandler')

async function createRemoteRepositry(repo_name, repo_description, baseUrl, create_repo_url) {
    const { repo_name: name, repo_describe, repo_visibility } = await askGithubRepoDetails(repo_name, repo_description)
    const body = {
        name: repo_name || name,
        description: repo_description || repo_describe,
        private: repo_visibility === 'private'
    }
    const accessToken = conf.get('github.accesstoken')
    const octokit = await getOctokitInstance(baseUrl, accessToken)

    const status = new Spinner('Creating remote repository')
    status.start()
    try {
        const createResult = await octokit.request(`POST ${create_repo_url}`, body)
        if (createResult.status != 201) errorHandler(createResult.status)
        console.log(createResult.status, createResult.data.ssh_url)
        conf.set('github.ssh_url', createResult.data.ssh_url)

    } catch (error) {
        console.log(error)
    } finally {
        status.stop()
    }
}

async function createGitIgnoreFile() {
    try {
        const fileList = _.without(fs.readdirSync('.'), '.git', '.gitignore')

        if (fileList.length) {
            const { repo_ignore } = await askGithubIngnoreFiles(fileList)
            if (repo_ignore.length) {
                fs.writeFileSync('.gitignore', repo_ignore.join('\n'))
            } else {
                await touch('.gitignore')
            }
        } else {
            await touch('.gitignore')
        }
    } catch (error) {
        console.log(error)
    }
}

async function setupRepository(repo_noun) {
    let noun = repo_noun || 'origin'
    const repo_url = conf.get('github.ssh_url')
    console.log(noun, repo_url)
    const status = new Spinner('Initializing local repository and pushing to remote ... ')
    status.start()
    try {
        await git.init(onInit)
        await git.add('.gitignore')
        await git.add('./*')
        await git.commit('Initial commit')
        await git.addRemote(noun, repo_url, onRemoteAdd)
        await git.push(noun, 'master')
    } catch (error) {
        console.log(error)
    } finally {
        status.stop()
    }
}

function onInit(err, initResult) {
    //-2 gitinit 失败
    if (err) errorHandler(-2, err.message)
}

function onRemoteAdd(err, addRemoteResult) {
    //-3 git remote 失败
    if (err) errorHandler(-3, err.message)
}

function onAdd(obj) {
    console.log('add:', obj)
}

function onAdd2(obj) {
    console.log('add2:', obj)
}

function onCommit(obj) {
    console.log('commit:', obj)
}

function onPush(obj) {
    console.log('push:', obj)
}


module.exports = {
    createRemoteRepositry,
    createGitIgnoreFile,
    setupRepository
}