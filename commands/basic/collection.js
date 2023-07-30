const { EmbedBuilder } = require('discord.js');

function formatCards(cardsList) {
    let formattedString = "";

    for (let i = 0; i < cardsList.length; i++) {
        const card = cardsList[i];
        const cardString =
            `\`${card.print}\` <:rightsquarearrow:1135093919948996648> \`${card.code}\` <:leftsquarearrow:1135094087108808716> _**${card.characterName}** : ${card.seriesName}_`;

        formattedString += `${i + 1}. ${cardString}\n`;
    }

    return formattedString;
}

exports.run = (client, message, args) => {
    const cardsList = [
        {
            code: "myanime",
            characterName: "Gojo Satoru",
            seriesName: "Jujutsu Kaisen",
            print: 6969,
            version: 1,
        },
        {
            code: "cardfr",
            characterName: "Hatsune Miku",
            seriesName: "Vocaloid",
            print: 69,
            version: 1,
        },

    ];

    const embed = new EmbedBuilder()
        .setTitle(`${message.author.username}'s Cards`)
        .setDescription(formatCards(cardsList))
        .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
        .setTimestamp()

    message.reply({ embeds: [embed] });
}

exports.name = 'collection';
exports.aliases = ['c'];