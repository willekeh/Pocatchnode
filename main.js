const Discord = require('discord.js');

const client = new Discord.Client();

const prefix ='!';

var check = true;

client.once('ready', () => {
    console.log('Pocatch is online :D');
})

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'pokemon'){

        check = true;

        message.channel.send('you see a pokemon in the distance, but what is it. use !pokeball to try and catch it ');

        return check

    } else if(command === 'pokeball'){

        if(check){
            // check = false;
        
            const broken = ["0", "You didnt even have a wiggle", "You almost had it but it broke free :("];
        
            const randomBroken = broken[Math.floor(Math.random() * broken.length)];
            if (randomBroken === "0"){
                const messages = ["You caught Munchlax", "You caught Pikachu", "You caught Eevee", "You caught Charmander"];

                const randomMessage = messages[Math.floor(Math.random() * messages.length)];

                message.channel.send(randomMessage);
                console.log(randomMessage)

            }else {
                message.channel.send(randomBroken);
        }

        }else {
            message.channel.send("There is no pokemon to be found. try !pokemon");
        }

    }
});

client.login('ODI3MTU5MjAxMTQxODgyOTIw.YGW-CQ.FYKol36CIJqWwD00An-9bDgflig');