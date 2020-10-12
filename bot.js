const {prefix, tag} = require('./json/config.json');
const auth = require('./json/auth.json');
const serviceAccount = require('./json/blub-bot-df6fd-firebase-adminsdk-yajnd-c804938585.json');
const admin = require('firebase-admin');
const Router = require('./routing/router');
const discord = require('discord.js');
const client = new discord.Client();

client.on('ready', () => {
    console.log(`Ingelogd als ${client.user.tag}!`);
});

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://blub-bot-df6fd.firebaseio.com'
});

client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    let args = message.content.slice(prefix.length).trim().split(/ +/);
    let command = args.shift().toLowerCase();
    const database = admin.firestore();

    Router.route(command, message, database);    
});

client.login(auth.token);