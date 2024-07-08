const fs = require('fs');
const csv = require('csv-parser');

/**
 * @param { string } table
 * @returns { Promise<void> } 
 */
exports.getSeedData = function (table) {
  const seedData = [];

  return new Promise((resolve, reject) => {
    // https://docs.google.com/spreadsheets/d/1Z9VqSLCQ3qUESSnCY0DJ_MOcISOIftqlfBDyFJSzcSs/export?format=csv
    // const url = 'https://docs.google.com/spreadsheets/d/1Z9VqSLCQ3qUESSnCY0DJ_MOcISOIftqlfBDyFJSzcSs/gviz/tq?tqx=out:csv&sheet=cities'
    // fetch(url).then(resp => resp.text()).then(data => {
    //   console.log(data)
    //   console.log(csv(data))
    //   resolve(true)
    // })
    
    const filePath = `./data/${table}.csv`
    if (!fs.existsSync(filePath)) {
      reject(`cvs file does not exists: ${table}`);
    }

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', data => seedData.push(data))
      .on('end', () => resolve(seedData));
    })
};