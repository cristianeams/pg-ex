const settings = require("./settings"); // settings.json
const pg = require("pg");
const knex = require('knex')({
    client: 'pg',
    connection: {
      user     : settings.user,
      password : settings.password,
      database : settings.database,
      host     : settings.hostname,
      port     : settings.port,
      ssl      : settings.ssl
    }
});

const moment = require('moment');

let firstName = process.argv[2];
let lastName = process.argv[3];
let dob = process.argv[4];


knex.insert({first_name: `${firstName}`, last_name: `${lastName}`, birthdate: `${dob}`}).into('famous_people')
    .asCallback((err, res) => {
      err ? console.log(err) : console.log(res)
      knex.select('*').from('famous_people')
      .asCallback((err, res) => {
        if (err) {
          console.log("error:", err)
        } else {
          console.log(res)
        }
      })
    knex.destroy();
    })
