module.exports = {
    name: 'loop',
    aliases: ['repeat'],
    description: "loops a song and queue",

    execute(client, message, arguments, distube, Discord) {
        const bot = message.guild.members.cache.get(client.user.id);
        if (!message.member.voice.channel) return message.channel.send("You aren't in a voice channel");
        if (bot.voice.channel !== message.member.voice.channel) return message.channel.send("You aren't in the same voice channel as the bot");
        let mode = distube.setRepeatMode(message, parseInt(arguments[0]));
        mode = mode ? mode == 2 ? "Repeat queue" : "Repeat song" : "Off";
        message.channel.send("Set repeat mode to `" + mode + "`");
    }  
}