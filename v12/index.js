const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

const Discord = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });

const DisTube = require('distube');
const distube = new DisTube(client, { searchSongs: false, emitNewSongOnly: true });

const prefix = '-';

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.name, command);
}

// Bot online message
client.once('ready', () => {
    
    console.log('Question Mark is online!');

    client.api.applications(client.user.id).commands.post({
        data: {
            name: "hi",
            description: "test"
        }
    });

    client.user.setPresence({
        activity: {
            name: `Hotel Mario`,
            type: "PLAYING"
        },
        status: `idle`
    })

    // let serverCheck = client.guilds.cache.size;
    // name: `${serverCheck} servers`,
    // type: "WATCHING"
});

const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;
distube
    .on("addSong", (message, queue, song) => message.channel.send(
        `Queued ${song.name} - \`${song.formattedDuration}\` by ${song.user.tag}`
    ))
    .on("playList", (message, queue, playlist, song) => message.channel.send(
        `Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user.tag}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
    ))
    .on("addList", (message, queue, playlist) => message.channel.send(
        `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`
    ))
    .on("searchResult", (message, result) => {
        let i = 0;
        message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`);
    })
    .on("initQueue", queue => {
        queue.autoplay = false;
        queue.volume = 50;
    })
    .on("searchCancel", (message) => message.channel.send(`Searching canceled`))
    .on("error", (message, e) => {
        console.error(e)
        message.channel.send("An error encountered: " + e);
    });

client.on('messageCreate', async message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const arguments = message.content.slice(prefix.length).split(/ +/);
    const cmd = arguments.shift().toLowerCase();
    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    try {
        await command.execute(client, message, arguments, distube, Discord);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

// Bot login token
client.login(token);