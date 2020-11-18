const fs = require('fs')
const path = require('path')

//get current path basename
function getCurrentDirectoryBase(){
    return path.basename(process.cwd())
}

//whether directory exist
function directoryExist(filePath){
    return fs.existsSync(filePath)
}


module.exports = {
    getCurrentDirectoryBase,
    directoryExist
}