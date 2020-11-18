#!/usr/bin/env node
const pkg = require('./package.json')
const { Command } = require('commander');
const program = new Command();
const conf = require('./lib/store')
const {initGithub,pushLocalFileToGithub} = require('./lib/github/actions/github')
// const clear = require('clear')
// const chalk = require('chalk')
// const figlet = require('figlet')
// const {directoryExist} = require('./lib/files')
// const {askGithubCredentials} = require('./lib/github/inquirer')


// clear()

// console.log(chalk.yellow(figlet.textSync('YUN',{horizontalLayout:'full'})))
// if(directoryExist('.git')){
//     console.log('hello')
//     console.log(chalk.red('Already a Git repository'))
// }else{
//     process.exit()
// }


// const run = async function(){
//     let credentials = await askGithubCredentials()
//     console.log(credentials)
// }

// run()

// const tmp = require('./lib/server')
// delete require.cache[require.resolve('config')]
// const tmp2 = require('./lib/github')
// try{
//     tmp2.checkAccessToken()
// }catch(error){
//     console.log(error)
// }



// const path = require('path')
// process.env['NODE_CONFIG_DIR'] = path.join(__dirname,'./config/github')
// const config = require('config')
// const {authorize:{checkAccessToken},repo:{createRemoteRepositry}} =  require('./lib/github')
// // console.log(checkAccessToken(config.get('baseUrl'),config.get('authorize_path')))
// createRemoteRepositry('test_rop_name2','discription',config.get('baseUrl'),config.get('create_repo_url'))


// const {repo:{createGitIgnoreFile,setupRepository}} =  require('./lib/github')
// // createGitIgnoreFile()
// async function t(){
//     await setupRepository('git@github.com:perdream/test_rop_name2.git')
// }
// t()


//test commander

//.option('-n, --name <p1> [p2]', '描述', '默认值')

// 如果在选项前面加上 no- ，含义正好与之前相反

//options的第三个参数还可以是函数（此时第四个值就是默认值），此函数接受两个参数：命令行输入的值和选项默认值，函数处理后的返回结果为最终的解析结果

// function fn(inputValue,defaultValue){
//     console.log(inputValue,defaultValue)
//     return inputValue + defaultValue
// }
// program.option('-d, --debug <p>','my debug',123).option('-n, --nest','my nest').option('-t,--type <p>','test default value',fn,789)


//.command('add <num> [params]')
// .description('描述')
// .alias('简称')
// .action(function(){ }) //命令处理函数
// program.command('init <source> [destination] [other...]').description('a command').alias('i').option('-d,--debug <h>','my debug',789).option('-n,--nest [g]','my nest',456).action(function(source,destination,other,optObj){
//     console.log(source)
//     console.log(destination)
//     console.log(other)
//     console.log(optObj.debug)
//     console.log(optObj.nest)
// })

// console.log('debug: ',program.debug)
// console.log('debug: ',program.opts())




//正式编写

program.version(pkg.version)

//选择初始化类型
program.command('init <type> [other...]')
    .description('init type server|github')
    .alias('i')
    .option('-o,--operate <p>','Operations performed')
    .option('-r,--reponame <r>','Repository name')
    .option('-d,--describe <d>','Repository discription')
    .option('-n,--noun <n>','Remote name')
    .action(async function(type,other,optObj){
        switch(type){
            case 'server':
                break;
            case 'github':
                const accessToken = conf.get('github.accesstoken')
                if(!accessToken)await initGithub();
    
                if(optObj.operate === 'push'){
                    try{
                        await pushLocalFileToGithub(optObj.reponame,optObj.describe,optObj.noun)
                    }catch(error){
                        console.log(error)
                    }
                    
                }
                break;
            default:return;
        }
})




program.parse(process.argv)









