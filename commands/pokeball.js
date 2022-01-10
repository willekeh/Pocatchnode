var db = require('../database');

async function pokeball(message) {
    db.con.query(`SELECT * FROM users WHERE discord_name = '${message.author.username}'`, (err, isCheck) => {

        if (isCheck[0].pokemon != null) {
            const broken = ["0", "You didnt even have a wiggle", "You almost had it but it broke free :(", "it fled"];

            const randomBroken = broken[Math.floor(Math.random() * broken.length)];
            if (randomBroken === "0") {
                db.addPokemon(message.author.username, isCheck[0].pokemon)
                message.channel.send(`you caught a ${isCheck[0].pokemon}`);
                console.log(isCheck[0].pokemon);

                db.updateCheck(message.author.username)


            } else if (randomBroken === "it fled") {
                message.channel.send(randomBroken);
                console.log(randomBroken);

                db.updatePokemoncheck() //wip

            } else {
                message.channel.send(randomBroken);
                console.log(randomBroken);

                db.updatePokemoncheck()
            }
        } else {
            message.channel.send("There is no pokemon to be found. try $pokemon");
        }

    })
}



module.exports = {
    pokeball
}