const config = require('../config.json');
const { Deta } = require('deta');
const deta = Deta(config.detaBaseKey);
const db = deta.Base('cards');
const cardSchema = {
    version: 1,
    characterName: String,
    seriesName: String,
    wishlistCount: Number,
    imageUrl: String,
    cardsIncirculation: Number,
};

async function addCard(card) {
    const result = await db.put(card);
    console.log('Card added:', result.key);
}


exports.run = (client, message, args) => {
    
}

exports.name = 'addCharacter';
exports.aliases = ['ac', 'addchar'];