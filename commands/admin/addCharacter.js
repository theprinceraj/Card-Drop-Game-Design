const axios = require('axios');


exports.run = async (client, message, args) => {
    try {
    console.log(args[0])
    const {config:{PROJECT_ID,PROJECT_KEY}} = client;
    const url =  `https://database.deta.sh/v1/${PROJECT_ID}/chars/items`
    const dbKey = PROJECT_KEY;
    const data = {
        "item":{
            "key":args[0],
            "series": args[1],
            "imageUrl":'https://c4.wallpaperflare.com/wallpaper/203/244/848/evangelion-neon-genesis-evangelion-rei-ayanami-wallpaper-preview.jpg',
            "wl":0,
            "version":args[2]
        }
    }//this for testing omly
    //real thing would be different
        const res = await axios.post(url,data,
           { 
            headers:{
                'Content-Type': 'application/json',
                "X-API-Key":dbKey
            }}
        )
        console.log(res.data)
        return await message.channel.send('new character  added')
} catch (error) {
    console.log(error)
}

}

exports.name = 'addCharacter';
exports.aliases = ['ac', 'addchar'];