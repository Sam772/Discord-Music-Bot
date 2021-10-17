// Connection to discord
const Discord = require('discord.js');
const client = new Discord.Client();

const DisTube = require('distube');
const distube = new DisTube(client, { searchSongs: false, emitNewSongOnly: true });

const ytdl = require("ytdl-core");

// Prefix for bot
const prefix = '-';

// Accessing commands folder
const fs = require('fs');
const queue = require('./commands/queue');
const { runMain } = require('module');
client.commands = new Discord.Collection();
// client.aliases = new Discord.Collection();
const files = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

// Accessing files for commands
for (const file of files) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

// Bot online message
client.once('ready', () => {

    // used for checking how many servers the bot is in
    // name: `${serverCheck} servers`,
    // type: "WATCHING"
    
    let serverCheck = client.guilds.cache.size;
    console.log('Question Mark is online!');
    client.user.setPresence({
        activity: {
            name: `Hotel Mario`,
            type: "PLAYING"
    },
    status: `idle`
})
});

// need pages for queue and now playing + next 10 (kind of done but not ideal)
// move song command
// now playing command

// distube.toggleAutoplay()
// Queue status template
const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;
// distube.toggleAutoplay();
// DisTube event listeners, more in the documentation page
distube
    // .on("playSong", (message, queue, song) => message.channel.send(
    //     `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user.tag}\n${status(queue)}`
    // ))
    .on("addSong", (message, queue, song) => message.channel.send(
        `Queued ${song.name} - \`${song.formattedDuration}\` by ${song.user.tag}`
    ))
    .on("playList", (message, queue, playlist, song) => message.channel.send(
        `Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user.tag}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
    ))
    .on("addList", (message, queue, playlist) => message.channel.send(
        `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`
    ))
    // DisTubeOptions.searchSongs = true
    .on("searchResult", (message, result) => {
        let i = 0;
        message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`);
    })
    .on("initQueue", queue => {
        queue.autoplay = false;
        queue.volume = 50;
    })
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", (message) => message.channel.send(`Searching canceled`))
    .on("error", (message, e) => {
        console.error(e)
        message.channel.send("An error encountered: " + e);
    });

// Check if user doesn't use prefix correctly
client.on('message', message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // Variables for commands
    const arguments = message.content.slice(prefix.length).split(/ +/);
    const cmd = arguments.shift().toLowerCase();
    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    // Commands for bot
    if (command) command.execute(client, message, arguments, distube, Discord);
});

// Client login token last line
// This would be a client line
