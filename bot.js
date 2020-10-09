"use strict";

const discord = require('discord.js');
const client = new discord.Client();
const {prefix, tag} = require('./config.json');
const auth = require('./auth.json');
const champions = require('./champion.json');
const Util = require('./util');

client.on('ready', () => {
    console.log(`Ingelogd als ${client.user.tag}!`);
})

client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    switch(command) {
        case "recruit":
            message.channel.send(recruitChampion());
            break;
        default:
            message.reply("Not a valid command! Use !help for all commands.");
    }
});

client.login(auth.token);

function recruitChampion() {
    let randomChamp = champions[Math.floor(Math.random() * champions.length)];
    return new discord.MessageEmbed()
                .setColor(tag.find(x => x.id === randomChamp.tags[0]).colour)
                .setTitle(Util.capitalize(randomChamp.id))
                .setThumbnail(randomChamp.icon)
                .setDescription(randomChamp.description);
}