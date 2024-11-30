const csv = require('csv');
const fs = require('fs');
fs.createReadStream(__dirname + '/CercleList.csv')
  // .pipe(process.stdout);
  .pipe(csv.parse({columns: true}, function (err, data) {
    console.log(JSON.stringify(data));
  }));