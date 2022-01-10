var db = require('../database');
async function pick(message, args) {
    if (!args.length) {

        return message.channel.send(`You didn't provide any starter pokemon, ${message.author}!`);

    } else if (args.length >= 2) {

        return message.channel.send(`Please only choose 1 starter, ${message.author}!`);

    } else {

        db.con.query(`SELECT * FROM users WHERE discord_name = '${message.author.username}'`, (err, results) => {
            if (err) throw err;

            if (results[0].buddy_id == null) {
                if (args[0] == 'charmander' || args[0] == 'squirtle' || args[0] == 'bulbasaur') {
                    db.addBuddy(message.author.username, args[0])
                    message.channel.send(`You now have a ${args[0]} as your buddy`);
                } else {
                    message.channel.send(`That isnt a starter try again`);
                }


            } else {
                message.channel.send(`You already have a buddy try $buddy to see him`);
            }
        });
    }
}

module.exports = {
    pick
}