const fs = require("fs");
const api = require('webcoach');
const mkdirp = require('mkdirp');


const writeFile = async (path, content) => {
    await mkdirp(path);
    await fs.writeFileSync(path, content);
}

const spyOnCompanies = () => {

	// Define an Array of Symbols
	const compFile = fs.readFileSync("./companylist.txt", "utf-8"); // Company list
	const comps = compFile.split('\n');

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

                // Organise the subfolders:
                    var fullDate = new Date();
                    var currentYear = fullDate.getFullYear();

					var allMonths  = ['January','February','March','April','May','June','July','August','September','October','November','December'];

					var currentMonth = allMonths[fullDate.getMonth()];
					var currentDay = fullDate.getDate();


					fs.mkdir(__dirname + `/results/${currentYear}/${currentMonth}/${currentDay}`, { recursive: true }, (err) => {
						if (err) throw err;
					});


			return new Promise((resolve,reject) => {
console.log(res);


				fs.writeFile(__dirname + `/results/${currentYear}/${currentMonth}/${currentDay}/${companyName}.json`, JSON.stringify(res), function(err) {
					if (err) reject(err);
					else resolve(res);
				});
			});
		})
			.catch( err => console.log(err));
	});

};

module.exports = spyOnCompanies;
