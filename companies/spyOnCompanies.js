const fs = require("fs");
const api = require('webcoach');

const spyOnCompanies = () => {

	// Define an Array of Symbols
    const compFile = fs.readFileSync("./companylist.txt", "utf-8"); // Company list
    const comps = compFile.split('\r\n');

    // Send message to console
    console.log('** Spying on companies **');

    // For each company run the request
    comps.forEach((val, index) => {
    	// Let us know what you're working on
    	console.log('Processing: ', val);

    	// Grab the company name from the domain
    	const companyName = val.replace(/(^\w+:|^)\/\//, '');

    	// Investigate companies
    	const result = api.run(val);

    	result.then((res) => {
    		console.log('Completed : ', companyName);

    		// Write results to file
    		return new Promise((resolve,reject) => {
    			fs.writeFile(companyName + '.txt', JSON.stringify(res), function(err) {
    				if (err) reject(err);
    				else resolve(res);
    			});
    		});
    	})
        .catch( err => console.log(err));
    });

};

module.exports = spyOnCompanies;