module.exports = {
    name: 'remove',
    description: "removes track",

    execute(client, message, arguments, distube, Discord) {

        const bot = message.guild.members.cache.get(client.user.id);
        if (!message.member.voice.channel) return message.channel.send("You aren't in a voice channel");
        if (bot.voice.channel !== message.member.voice.channel) return message.channel.send("You aren't in the same voice channel as the bot");
        if (!arguments[0]) return message.channel.send("Please provide a number");
        if (isNaN(arguments[0])) return message.channel.send("Argument must be an integer");
        if (arguments[0] == 1) return message.channel.send("You cant remove the currently playing song use -skip");

        if (arguments[0]) {
            queue = distube.getQueue(message);
            queue.songs.splice(Number(arguments[0]) - 1, 1);
            message.channel.send("Song removed");
        }
    }  
}