const yargs = require('yargs');
const spyOnCompanies = require('./companies/spyOnCompanies');

// Did you start correctly?
console.log('EspionageX reporting for duty.');

// Commands
const argv = yargs
    .options({
        u: {
            demand: false,
            alias: 'update',
            describe: 'Grab data on competitors',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;


// Deploy espionage
if (argv.update) {
    console.log('Hold tight. Spies deploying...');
    // Update companies...
    spyOnCompanies();
}