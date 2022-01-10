var db = require('../database');
async function pokemon(message) {
    db.con.query(`SELECT pokemon FROM users WHERE discord_name = '${message.author.username}'`, (err, results) => {
        if (err) throw err;

        if (results[0] == undefined) {
            return start.start(message)

        } else {
            check = results[0].pokemon
            if (check) {
                random = Math.ceil(Math.random() * 151);
                db.con.query(`SELECT * FROM pokemon WHERE pokemon_id = ${random}`, (err, results) => {
                    if (err) throw err;

                    pokemonname = results[0].pokemon_name

                    db.addCheck(message.author.username, pokemonname)
                    message.channel.send('you see a pokemon in the distance, but what is it. use $pokeball to try and catch it ');
                });

            } else {
                message.channel.send('There is already a pokemon in the distance. Try $pokeball');
            }

        }
    });
}

module.exports = {
    pokemon
}