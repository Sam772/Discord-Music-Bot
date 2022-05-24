module.exports = {
    name: 'stop',
    aliases: ['leave', 'fuckoff'],
    description: "stop playing music and bot leaves channel",

    execute(client, message, arguments, distube, Discord) {
        const queue = distube.getQueue(message);
        const bot = message.guild.members.cache.get(client.user.id);
        if (!bot.voice.channel) return;
        if (!queue) return message.channel.send("Bot disconnected") && message.member.voice.channel.leave();
        if (!message.member.voice.channel) return message.channel.send("You aren't in a voice channel");
        if (bot.voice.channel !== message.member.voice.channel) return message.channel.send("You aren't in the same voice channel as the bot");
        distube.stop(message);
        message.channel.send("Music stopped");
    }  
}