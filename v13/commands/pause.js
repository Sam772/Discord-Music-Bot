module.exports = {
name: 'pause',
description: "pauses bot",

execute(client, message, arguments, distube, Discord) {
    const bot = message.guild.members.cache.get(client.user.id);
    if (!message.member.voice.channel) return message.channel.send("You aren't in a voice channel");
    if (bot.voice.channel !== message.member.voice.channel) return message.channel.send("You aren't in the same voice channel as the bot");
    distube.pause(message);
    message.channel.send("Paused");
    }
}