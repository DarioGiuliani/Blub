const discord = require('discord.js');
const client = new discord.Client();
const auth = require('./auth.json');
const ytdl = require('ytdl-core');

client.login(auth.token);

client.on('ready', () => {
    console.log(`Ingelogd als ${client.user.tag}!`);
})

client.on('message', async message => {
    if (!message.guild) return;

    if (message.content === '!join') {
        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();
            const dispatcher = connection.play(ytdl('https://www.youtube.com/watch?v=wAPlzt2L7wE', {filter: 'audioonly'}));
            dispatcher.setVolume(1.0);
        } else {
            message.reply('Join a channel first you dummy!');
        }
    }

    if (message.content === 'hi'){
        message.reply('bye');
    }
});

