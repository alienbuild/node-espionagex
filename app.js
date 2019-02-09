const yargs = require('yargs');
const spyOnCompanies = require('./companies/spyOnCompanies');
const api = require('webcoach');

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
        },
        t: {
            demand: false,
            alias: 'testrun',
            describe: 'Perform a test run using webcoach',
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

// Test that the api is working
if(argv.testrun) {
    console.log('Running test');
    const result = api.run('https://www.sitespeed.io');
    console.log(result);
}
