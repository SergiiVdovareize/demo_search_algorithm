const fs = require('fs');
const csv = require('csv-parser');

exports.getSeedData = function (table) {
  const seedData = [];

  return new Promise((resolve, reject) => {    
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