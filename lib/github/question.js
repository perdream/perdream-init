const files = require('../files')

const askCredentials = [
    {
        name:'username',
        type:'input',
        message:'Enter your github username',
        validate:function(value){
            return value.length?true:'Please enter your github username'
        }
    },
    {
        name:'accesstoken',
        type:'input',
        message:'Enter your github access token',
        validate:function(value){
            return value.length?true:'Please enter your github access token'
        }
    }
]

function askRepoDetails(repo_name,repo_describe){
    const qs = [
        {
            type:'list',
            name:'repo_visibility',
            message:'Public or private: ',
            choices:[ 'public','private'],
            default:'public'
        }
    ]
    if(!repo_describe){
        qs.unshift( {
            type:'input',
            name:'repo_describe',
            message:'Optionally enter a description of the repository',
            default: repo_describe || null
        })
    }
    if(!repo_name){
        qs.unshift({
            type:'input',
            name:'repo_name',
            message:'Enter a name for the repository',
            default: repo_name || files.getCurrentDirectoryBase(),
            validate: function( value ){
                if(value.length){
                    return true
                }else{
                    return 'Please enter a name for the repository'
                }
            }
        })
    }
    return qs
}

function askIgnoreFiles(fileList){
    return [
        {
            type:'checkbox',
            name:'repo_ignore',
            message: 'SELECT the files ang/or folders you wish to ignore',
            choices:fileList,
            default:['node_nodules','bower_components']
        }
    ]
}

module.exports = {
    askCredentials,
    askRepoDetails,
    askIgnoreFiles
}