module.exports = {
    name: 'move',
    aliases: ['m'],
    description: "This command moves a song from one position to another in the queue.",

    execute(client, message, arguments, distube, Discord) {
        const bot = message.guild.members.cache.get(client.user.id);
        if (!message.member.voice.channel) return message.channel.send("You aren't in a voice channel");
        if (bot.voice.channel !== message.member.voice.channel) return message.channel.send("You aren't in the same voice channel as the bot");
        if (!arguments[0] || !arguments[1]) return message.channel.send("Please provide the song numbers");
        if (isNaN(arguments[0]) || isNaN(arguments[1])) return message.channel.send("Arguments must be integers");
        if (arguments[0] == 1 || arguments[1] == 1) return message.channel.send("You cant move the currently playing song");

        if (arguments[0] && arguments[1]) {
            queue = distube.getQueue(message);
            var move = queue.songs.splice(Number(arguments[0]) - 1, 1)[0];
            queue.songs.splice(arguments[1] - 1, 0, move);
            
            message.channel.send(`moved song ${arguments[0]} to position ${arguments[1]}`);
            // queue.songs.splice(Number(args[0]), Number(args[0]) + 1);
            // (1, 2, newtrack) moves track between 1 and 2
        }

            // old_index = arguments[0];
            // new_index = arguments[1];
            // let queue = distube.getQueue(message);
            // message.channel.send(queue.songs.map((song, id) =>
            // `**${id+1}**. [${song.name}] - \`${song.formattedDuration}\``
            // ).join("\n"));

            
            // if (new_index >= arguments.length) {
            //     var x = new_index - arguments.length + 1;
            //     while (x--) {
            //         arguments.push(undefined);
            //     }
            // }

            // arguments.splice(new_index, 0, arguments.splice(old_index, 1)[0]);
            // message.channel.send(`moved ${old_index} to ${new_index}`);
            // return arguments;
        
    }  
}