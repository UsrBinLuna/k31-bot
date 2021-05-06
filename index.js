const Discord = require('discord.js');
const { prefix, token, serverid } = require('./config.json');

const client = new Discord.Client({
    disableMentions: 'everyone',
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
guild = new Discord.Guild(serverid)


client.once('ready', () => {
    console.log('Ready!');
    client.user.setActivity('you, I know what you did', { type: 'WATCHING' });
});


client.on('message', message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!commandName) return;
    if (commandName.guildOnly && message.channel.type === 'dm') {
        return;
    }

    //commands
    if (commandName === 'stop') {
        message.channel.send("Shutting down...")
        setTimeout(function(){
            client.destroy();
        },5000)
    }
    //in testing stage
    if (commandName === 'cr') {
        const rName = args.slice().join(' ');
        message.guild.roles.create({
            data: {
              name: rName,
              permissions: 'KICK_MEMBERS'
            },
            reason: 'we needed a role for Super Cool People',
          })
            .then(console.log)
            .catch(console.error);
        message.channel.send('Created role "' + rName + '"'); 
    }

    if (commandName === 'cc') {
        message.guild.channels.create('Text', { //Create a channel
            type: 'text', //Make sure the channel is a text channel
            permissionOverwrites: [{ //Set permission overwrites
                id: message.guild.id,
                allow: ['VIEW_CHANNEL'],
            }]
        }) 
        message.channel.send("Channel Created!"); //Let the user know that the channel was created
    }

    //help
    if (commandName === 'help') {
        const hEmbed = new Discord.MessageEmbed()
            .setColor('#f7ff00')
            .setTitle('Help')
            .setDescription('Prefix is !')
            .setTimestamp()
            .addFields({ name: '**moderation**', value: 'kick - its ovbious\nban - same as kick'})
            .addFields({ name: '**misc**', value: 'yellow - yellow.\nsmh - smh my head\nyes - no\nroger - that weird guy\nroomba - random roomba gif\naxolotl - those cuties lmao\ncc - creates a channel (doesnt work cause k2 removed my perms :<\ncr - creates a role\nsay - says the text you want it to say\nomegamart - o-o-o-omega mart you have no idea whats in-store for you'})
            .setFooter(':yellow_square:');
        
        message.channel.send(hEmbed);
    }


    if (commandName === 'kick') {
        if (!message.member.permissions.has('KICK_MEMBERS')) return message.reply("You don't have permission to kick members");
        if (message.mentions.users.size) {
            const taggedUser = message.mentions.users.first();
            const reason = args.slice(1).join(' ');
            const member = message.guild.member(taggedUser);
            member.kick();
            message.channel.send(`Successfully kicked ${taggedUser}`);
        } else {
            const bvEmbed = new Discord.MessageEmbed().setTitle('PLease tag a valid user');
            message.reply(bvEmbed);
        } 
    }
    if (commandName === 'ban') {
        if (!message.member.permissions.has('BAN_MEMBERS')) return message.reply("You don't have permission to ban members");
        if (message.mentions.users.size) {
            const taggedUser = message.mentions.users.first();
            const reason = args.slice(1).join(' ');
            const member = message.guild.member(taggedUser);
            member.ban();
            message.channel.send(`Successfully banned ${taggedUser}`);
        } else {
            const bvEmbed = new Discord.MessageEmbed().setTitle('PLease tag a valid user');
            message.reply(bvEmbed);
        } 
    }

    //say
    if (commandName === 'say') {
        const text = args.slice().join(' ');
        message.delete();
        message.channel.send(text);
    }

    if (commandName === 'kill') {
        const taggedUser = message.mentions.users.first();
        client.users.cache.get('id').send('Blabla')
    }

    if (commandName === 'yellow') {
        message.channel.send(':yellow_square:');
    }

    if (commandName === 'smh') {
        message.channel.send('<:AngryStabbySirius:839699760637280256>');
    }
    if (commandName === 'yes') {
        message.channel.send('https://tenor.com/view/k20-gif-20249801');
    }
    if (commandName === 'roger') {
        message.channel.send('https://tenor.com/view/worm-weird-purple-purple-worm-dance-gif-17090715');
    }
    if (commandName === 'roomba') {
        roombagif = ['https://tenor.com/view/roomba-roombas-roomba-party-gif-18291345', 'https://tenor.com/view/opossum-cute-roomba-eat-eating-out-gif-16016450', 'https://tenor.com/view/roomba-cat-on-my-way-ride-the-pet-collective-gif-14273605', 'https://tenor.com/view/roomba-riding-spinning-cat-kitty-gif-17826121', 'https://tenor.com/view/gato-bisho-cat-michi-dog-gif-17576965', 'https://tenor.com/view/dog-cute-roomba-bulldog-riding-gif-17497992', 'https://tenor.com/view/lol-dogs-dog-roll-up-ride-gif-5528492'];
        var randomItem = roombagif[Math.floor(Math.random()*roombagif.length)];
        message.channel.send(randomItem);
    }
    if (commandName === 'axolotl') {
        rAxolotl = ['https://tenor.com/view/axolotl-smile-happy-cute-animal-smiling-gif-12642274', 'https://tenor.com/view/axolotl-gif-5505339', 'https://tenor.com/view/axolotl-smile-cute-gif-5239765', 'https://tenor.com/view/axolotl-swim-cute-excited-gif-9348060']
        var randomItem = rAxolotl[Math.floor(Math.random()*rAxolotl.length)];
        message.channel.send(randomItem);
    }
    if (commandName === 'omegamart') {
        message.delete();
        message.channel.send("This is an important message for customers who have recently purchased Omega Mart Lemons. Some customers have confused Omega Mart Lemons with lemons. Please return this product to Omega Mart immediately. Or for assistance, please call the number on your screen. For your safety, this product has been removed from our shelves and will be carefully disposed of. Omega Mart thanks you for your continued trust. O O O Omega Mart - you have no idea what's in-store for you!");
    }
});



client.login(token);