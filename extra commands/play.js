module.exports = {
    name: 'play',
    description: "finally making a music bot???",

    execute(message, arguments, distube) {
        if (!message.member.voice.channel) return message.channel.send("You aren't in a voice channel");
        if (!arguments[0]) return message.channel.send("Provide a link smh");
        distube.play(message, arguments.join(" "));
    }  
}