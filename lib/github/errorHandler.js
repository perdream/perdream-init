const chalk = require('chalk')

function errorHandler(status, message) {
    switch (status) {
        case -1:
            console.log(chalk.red('Couldn\'t log you in. Please provide correct github credentials/token/username'));
            process.exit()
            break;
        case -2:
            console.log(chalk.red(message));
            process.exit()
            break;
        case -3:
            console.log(chalk.red(message));
            process.exit()
            break;
        case 401:
            console.log(chalk.red('Couldn\'t log you in. Please provide correct credentials/token.'));
            process.exit()
            break;
        case 422:
            console.log(chalk.red('There is already a remote repository or token with the same name'));
            process.exit()
            break;
        default:
            console.log(chalk.red('Please try again later'))
            process.exit()
            break;
    }
}

module.exports = errorHandler