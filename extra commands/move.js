const Queue = require("distube/typings/Queue");

module.exports = {
    name: 'move',
    aliases: ['m'],
    description: "move songs in queue",

    execute(client, message, arguments, distube, Discord) {
        if (!message.member.voice.channel) return message.channel.send("You aren't in a voice channel");
        if (!arguments[0]) return message.channel.send("Provide a link smh");
        

        old_index;
        new_index;
            let queue = distube.getQueue(message);
            message.channel.send(queue.songs.map((song, id) =>
            `**${id+1}**. [${song.name}] - \`${song.formattedDuration}\``
            ).slice(0, 10).join("\n"));
            
            if (new_index >= arguments.length) {
                var x = new_index - arguments.length + 1;
                while (x--) {
                    arguments.push(undefined);
                }
            }

            arguments.splice(new_index, id, arguments.splice(old_index, 1)[id]);
            message.channel.send(`moved ${old_index} to ${new_index}`);
            return arguments;
    }  
}