const axios = require('axios');
const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message, args) => {
    const {config:{PROJECT_ID,PROJECT_KEY}} = client;
    const dbKey = PROJECT_KEY;
    const searchTerm = args.join(' ');
    const characterName = args.join(' ');
    const seriesName = ''; // to be fetched from database
    const characterImageURL = 'https://i.ibb.co/K6gbTnn/card-example-1.png'; // to be fetched from database
    const wishlistCount = 696969; // to be fetched from database
    const cardsInCirculation = 69; // to be fetched from database
    const url =  `https://database.deta.sh/v1/d0czvd4r94m/chars/items/${characterName}`
   try {
     const res = await axios.get(url,
         { 
          headers:{
              'Content-Type': 'application/json',
              "X-API-Key":dbKey
          }}
      )
    //   console.log((res.data))
    // u can use this instead of making new  json payload
    const embed = new EmbedBuilder()
    .setColor('000001')
    .setTitle( `${client.user.username} Character Lookup`)
    .setDescription( `**__Character__** : ${characterName}\n__**Series**__ : ${res.data.series}`)
    .setThumbnail( res.data.imageUrl)
	.addFields(
		{ name: 'Wishlist', value: `${res.data.wl}`, inline: true },
		{ name: 'Cards in Circulation', value: `${cardsInCirculation}`, inline: true},
	)
    .setTimestamp()
    .setFooter({
        text: 'Anime Bot',
        iconURL: client.user.displayAvatarURL(),
    })
    
    //  const embed = {
    //      color: '000001',
    //      title: `${client.user.username} Character Lookup`,
    //      description: `**__Character__** : ${characterName}\n__**Series**__ : ${res.data.series}`,
    //      thumbnail: {
    //          url: res.data.imageUrl,
    //      },
    //      fields: [
    //          {
    //              name: 'Wishlist',
    //              value: res.data.wl,
    //              inline: true,
    //          },
    //          {
    //              name: 'Cards in Circulation',
    //              value: cardsInCirculation,
    //              inline: true,
    //          },
    //      ],
    //      timestamp: new Date().toISOString(),
    //      footer: {
    //          text: 'Anime Bot',
    //          icon_url: client.user.displayAvatarURL(),
    //      },
    //  };
     message.channel.send({ embeds: [embed] });
   } catch (error) {
    console.log(error)
   }
}

exports.name = 'lookup'
exports.aliases = ['lu', 'cl'];