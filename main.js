const Discord = require('discord.js');
// const mysql = require('mysql');
const Token = require('./config.json');
const fs = require('fs')
// var db = require('./database');
// const dir = './commands'
// const files = fs.readdirSync(dir)

// const start = require('./commands/start')
// const pick = require('./commands/pick')
// const pokemon = require('./commands/pokemon')
// const pokeball = require('./commands/pokeball')



const client = new Discord.Client();

const prefix = '$';

var check = false;
let random = 0;

client.once('ready', () => {
  console.log('Pocatch is online :D');
})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  switch (command) {
    case 'start':
      const embed = {
        "title": "Welcome to the world of pokemon ",
        "description": "To be able to travel you will need a buddy, to help you on your quest. You can choose between :",
        "url": "",
        "color": 8530108,
        "image": {
          "url": "https://media.discordapp.net/attachments/827173164067848217/838855388748578836/20130731-100343.png"
        },
        "fields": [{
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
      message.channel.send({
        embed
      });
      break;
    case 'ping':
      message.channel.send(`Pong`);
      break;
    case 'time':
      const currentDate = new Date();
      message.channel.send("het is nu: " + currentDate);

      //start command
      // switch (command) {
      //   case 'start':
      //     start.start(message)
      //     break;
      //   case 'pick':
      //     pick.pick(message, args)
      //     break;
      //   case 'pokemon':
      //     pokemon.pokemon(message)
      //     break;
      //   case 'pokeball':
      //     pokeball.pokeball(message)
      //     break;
      // case 'pokedex'

      // case 'greatball'
      // case 'ultraball'
  }

  // if (command === 'pokemon') {

  // } else if (command === 'pokeball') {

  // if (check) {
  //   check = false;

  //   const broken = ["0", "You didnt even have a wiggle", "You almost had it but it broke free :(", "it fled"];

  //   const randomBroken = broken[Math.floor(Math.random() * broken.length)];
  //   if (randomBroken === "0") {

  //     message.channel.send(`you caught a ${pokemon}`);
  //     console.log(pokemon);


  //   } else if (randomBroken === "it fled") {
  //     message.channel.send(randomBroken);
  //     console.log(randomBroken);

  //   } else {
  //     message.channel.send(randomBroken);
  //     console.log(randomBroken);
  //   }

  // } else {
  //   message.channel.send("There is no pokemon to be found. try $pokemon");
  // }

  //pick your starter command
  // } else if (command === 'pick') {



  //pokedex command
  // } else if (command === 'pokedex') {}
});

client.login(Token.token);