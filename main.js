const Discord = require('discord.js');
const mysql = require('mysql');
const Token = require('./config.json');

const pk = require(`./pokemon/gen1.js`)
const pkdx = require('./pokedexentry/gen1dx.js')

const client = new Discord.Client();

const prefix ='$';

var check = false;
let random = 0;


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pocatch"
})

con.connect(err => {
    if(err) throw err;
    console.log("Connected to the database");
})

client.once('ready', () => {
    console.log('Pocatch is online :D');
})

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'pokemon'){

        check = true;

        message.channel.send('you see a pokemon in the distance, but what is it. use $pokeball to try and catch it ');

        random = Math.ceil(Math.random() * (151));
        console.log(pk.gen1[random])

        return check && random

    } else if(command === 'pokeball'){

        if(check){
            check = false;
        
            const broken = ["0", "You didnt even have a wiggle", "You almost had it but it broke free :("];
        
            const randomBroken = broken[Math.floor(Math.random() * broken.length)];
            if (randomBroken === "0"){

                const messages = pk.gen1[random];

                message.channel.send(messages);
                console.log(messages);
                random = 0;

            } else {
                message.channel.send(randomBroken);
                console.log(randomBroken);
                random = 0;
        }

        }else {
            message.channel.send("There is no pokemon to be found. try $pokemon");
        }

    } else if(command === 'pokedex'){

        if(check) {
            // if(npkdx = True)

            con.query("SELECT * FROM pokedex WHERE pokemon_id = 1", (err, results) => {
                if(err) throw err;

                let randomdex = Math.ceil(Math.random() * (results.length))

                let entry = results[randomdex].entry

                console.log(entry)

                message.channel.send(entry); 
                
            });

        } else {
            message.channel.send('There is no pokemon. try $pokemon');
        }
    }
});

client.login(Token.token);