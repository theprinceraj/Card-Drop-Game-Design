const config = require('../../config.json');

exports.run = async (client, message, args) => {
    const searchTerm = args.join(' ');
    const characterName = args.join(' ');
    const seriesName = ''; // to be fetched from database
    const characterImageURL = 'https://i.ibb.co/K6gbTnn/card-example-1.png'; // to be fetched from database
    const wishlistCount = 696969; // to be fetched from database
    const cardsInCirculation = 69; // to be fetched from database
    const embed = {
        color: '000001',
        title: `${client.user.username} Character Lookup`,
        description: `**__Character__** : ${characterName}
        __**Series**__ : ${seriesName}`,
        thumbnail: {
            url: characterImageURL,
        },
        fields: [
            {
                name: 'Wishlist',
                value: wishlistCount,
                inline: true,
            },
            {
                name: 'Cards in Circulation',
                value: cardsInCirculation,
                inline: true,
            },
        ],
        timestamp: new Date().toISOString(),
        footer: {
            text: 'Anime Bot',
            icon_url: client.user.displayAvatarURL(),
        },
    };

    message.channel.send({ embeds: [embed] });
}

exports.name = 'lookup'
exports.aliases = ['lu', 'cl'];