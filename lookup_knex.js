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
const arg = process.argv[2];

knex.select('*').table('famous_people')
 .asCallback((err, res) => {
        if (err) {
            console.log(err)
        } else {
            //console.log(res, arg)
           //First line of output
          console.log("Searching ...")

          res.forEach((match, index) => {
              if (match.first_name === arg){
                console.log(`- ${index -1}: ${match.first_name} ${match.last_name}, born '${moment(match.birthdate).format("YYYY-MM-DD")}'`);
              }

        })
        knex.destroy();
        }
  })