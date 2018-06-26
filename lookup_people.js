const pg = require("pg");
const settings = require("./settings"); // settings.json
const moment = require('moment');
const arg = process.argv[2];

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  //First line of output
  console.log("Searching ...")
  client.query("SELECT * FROM famous_people WHERE first_name LIKE $1;", [`${arg}%`], (err, results) => {
    if (err) {
      return console.error("error running query", err);
    }
    //outputs in the given format
    printNames(arg, results);
  });
});

function printNames(arg,results) {
  let arr = results.rows;
    console.log(`Found ${arr.length} person(s) by the name '${arg}':`);
    arr.forEach((match, index) => {
      console.log(`- ${index + 1}: ${match.first_name} ${match.last_name}, born '${moment(match.birthdate).format("YYYY-MM-DD")}'`);
    })
  client.end();
}
