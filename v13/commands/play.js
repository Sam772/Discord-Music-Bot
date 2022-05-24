module.exports = {
    name: 'play',
    aliases: ['p', 'fuckon'],
    description: "finally making a music bot???",

    execute(client, message, arguments, distube, Discord) {
        if (!message.member.voice.channel) return message.channel.send("You aren't in a voice channel");
        if (!arguments[0]) return message.channel.send("Provide a link smh");
        distube.play(message, arguments.join(""));
    }  
}