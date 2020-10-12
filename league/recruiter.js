const discord = require('discord.js');
const Util = require('../utils/util');
const champions = require('../json/champion.json');
const {prefix, tag} = require('../json/config.json');

class Recruiter {
    constructor(database, message) {
        this.database = database;
        this.message = message;
    }
    
    //#region Public methods

    async recruitChampion () {
        let randomChamp = champions[Math.floor(Math.random() * champions.length)];
        let embeddedMessage = this.createEmbeddedRecruitedChampionMessage(randomChamp);

        if(await this.checkRecruitmentAllowed()) {
            this.message.channel.send(embeddedMessage);
            this.addRecruitedChamptoDatabase(randomChamp);
        } else {
            this.message.reply('You can\'t recruit a new champ yet!');
        }
    }

    //#endregion

    //#region Private methods

    createEmbeddedRecruitedChampionMessage(randomChamp) {
        return new discord.MessageEmbed()
            .setColor(tag.find(x => x.id === randomChamp.tags[0]).colour)
            .setTitle(`${Util.capitalize(randomChamp.id)} (${randomChamp.tags.length > 1 ? Util.concatArray(randomChamp.tags) : randomChamp.tags[0]})`)
            .setThumbnail(randomChamp.icon)
            .setDescription(randomChamp.description);
    }

    //#endregion

    // refactor to own class

    async checkRecruitmentAllowed() {
        let snapshot = await this.database.collection('recruited_champions')
                                            .where('memberId', '==', this.message.author.id)
                                            .where('acquireDate', '>=', (Date.now() - 10000))
                                            .where('acquireDate', '<=', Date.now())
                                            .get();

        return snapshot.empty;
    }

    async addRecruitedChamptoDatabase(randomChamp) {
        let addedDoc = await this.database.collection('recruited_champions').add({
            memberId: this.message.author.id,
            memberName: this.message.author.username,
            champId: randomChamp.id,
            acquireDate: Date.now()
        });

        console.log(`Recruited champ for ${this.message.author.id} and added to db with Id: ${addedDoc.id}`);
    }
}
module.exports = Recruiter;