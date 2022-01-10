var db = require('../database');

async function start(message) {
  db.con.query(`SELECT * FROM users WHERE discord_name = '${message.author.username}'`, (err, results) => {
    if (err) throw err;

    if (results.length == 0) {
      db.addUser(message.author.username)
      console.log('users added');

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

    } else if (results[0].buddy_id == null) {
      const embed = {
        "title": "Welcome to the world of pokemon ",
        "description": "You have already used start, but not chosen a buddy. You can choose between :",
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

    } else {
      message.channel.send('You have already started your journey do $buddy')

    }
  });
}

module.exports = {
  start
}