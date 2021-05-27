const Discord = require('discord.js');
const mysql = require('mysql');
const Token = require('./config.json');

const pkdx = require('./pokedexentry/gen1dx.js')
var db = require('./database')

const client = new Discord.Client();

const prefix ='$';

var check = false;
let random = 0;
let pokemon = '';

client.once('ready', () => {
    console.log('Pocatch is online :D');
})

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'test')
    {
        const test = db.gettest()

        // console.log(test);

        message.channel.send('it worked')
    }

    if(command === 'start'){

      db.getUser(message.author.username).then((discord_name) => {
        console.log(discord_name)
      })

        async function returnPromises() {
            var newPromise = new Promise((resolve) => {
              setTimeout(() => {
                console.log("Promise Executed...");
                resolve(db.getUser(message.author.username));
              }, 3000);
            });
          } 
          
        async function ExecuteFunction() {
            const testdata = "hi"
            var getPromise = await returnPromises();
            console.log(testdata)

            if (getPromise == 1)
            {
            console.log('data to database :DDDDD')
            // db.addUser(message.author.username)
            console.log('users added');

            const embed = {
            "title": "Welcome to the world of pokemon ",
            "description": "To be able to travel you will need a buddy, to help you on your quest. You can choose between :",
            "url": "",
            "color": 8530108,
            "image": {
              "url": "https://media.discordapp.net/attachments/827173164067848217/838855388748578836/20130731-100343.png"
            },
            "fields": [
              {
                "name": "Charmander",
                "value": "The lizard pokemon",
                "inline": true
              },
              {
                "name": "Squirtle",
                "value": "The tiny turtle pokemon",
                "inline": true
              },
              {
                "name": "Bulbasaur",
                "value": "The seed pokemon",
                "inline": true
              },
              {
                "name": "Choose",
                "value": "To pick your buddy do $pick 'starter'"
              }
            ]
          };
          message.channel.send({ embed });
    
            } else {
            message.channel.send('You have already started your journey do $buddy')
            
            }

        }
          
        ExecuteFunction()
        
    } else if(command === 'pokemon'){

        check = true;

        message.channel.send('you see a pokemon in the distance, but what is it. use $pokeball to try and catch it ');

        random = Math.ceil(Math.random() * (151));

        pokemon = db.getPokemon(random)

        return check && random

    } else if(command === 'pokeball'){

        if(check){
            check = false;
        
            const broken = ["0", "You didnt even have a wiggle", "You almost had it but it broke free :(", "it fled"];
        
            const randomBroken = broken[Math.floor(Math.random() * broken.length)];
            if (randomBroken === "0"){

                message.channel.send(`you caught a ${pokemon}`);
                console.log(pokemon);
                

            } else if (randomBroken === "it fled") {
                message.channel.send(randomBroken);
                console.log(randomBroken);

            } else {
                message.channel.send(randomBroken);
                console.log(randomBroken);
            }

        }else {
            message.channel.send("There is no pokemon to be found. try $pokemon");
        }

    } else if(command === 'pokedex'){

        if(check) {
            // if(npkdx = True)

            db.con.query("SELECT * FROM pokedex WHERE pokemon_id = 1", (err, results) => {
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