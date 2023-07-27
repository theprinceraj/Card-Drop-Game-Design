const {
    Client,
    IntentsBitField,
    Collection,
    ActivityType,
    GatewayIntentBits,
    Events,
    Activity,
} = require('discord.js');


const fs = require('fs')
const path = require('node:path');
const config = require('./config.json');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const errorLogStream = fs.createWriteStream(path.join(__dirname, 'error.log'), { flags: 'a' });
const originalStderrWrite = process.stderr.write;
process.stderr.write = function (error) {
    const timestamp = new Date().toISOString();
    errorLogStream.write(`\n\n\n[${timestamp}] Error: ${error}`);
    originalStderrWrite.call(process.stderr, `\n\n\n[${timestamp}] Error: ${error}`);
}

client.on('ready', () => {
    console.log(`${client.user.tag} is serving in ${client.guilds.cache.size} servers! 🚀`)
    client.user.setPresence({
        activities: [{
            name: '0',
            type: ActivityType.Competing,
        }]
    })
});

client.config = config;
client.commands = new Collection();

try {
    const events = fs.readdirSync(`./events`).filter(file => file.endsWith('.js'));
    for (const file of events) {
        const eventName = file.split('.')[0];
        const event = require(`./events/${eventName}`);
        client.on(eventName, event.bind(null, client));
    }

    const commandsFolder = fs.readdirSync('./commands');
    for (const folder of commandsFolder) {
        const commands = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
        for (const file of commands) {
            const commandName = file.split('.')[0];
            const command = require(`./commands/${folder}/${file}`);
            if (command.aliases) {
                command.aliases.forEach(alias => {
                    client.commands.set(alias, command);
                });
                console.log(`Loaded ${commandName} with aliases: ${command.aliases}`);
            }
            client.commands.set(commandName, command);
            if (!command.aliases) console.log(`Loaded ${commandName} with no aliases`)
        }
    }
} catch (error) {
    process.stderr.write(error);
}

client.login(config.token);