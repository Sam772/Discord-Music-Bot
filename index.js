// Reconfiguration
const { Client, Intents } = require('discord.js');
const { token, clientId, guildId } = require('./config.json');

// Connection to Discord
const Discord = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });

// Using DisTube discord.js module
const DisTube = require('distube');
const distube = new DisTube(client, { searchSongs: false, emitNewSongOnly: true });

// Bot Prefix
const prefix = '-';

// Accessing commands folder
const fs = require('fs');
client.commands = new Discord.Collection();
const files = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

// Accessing files for commands
for (const file of files) {
    const command = require(`./commands/${file}`);
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

client.on('messageCreate', message => {

    // Check if user doesn't use prefix correctly
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // Variables for commands
    const arguments = message.content.slice(prefix.length).split(/ +/);
    const cmd = arguments.shift().toLowerCase();
    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    // Commands for bot
    if (command) command.execute(client, message, arguments, distube, Discord);
});

// Slash command tester
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
    }
});

// Bot login token
client.login(token);