module.exports = {
    name: 'queue',
    aliases: ['q'],
    description: "queue for current music",

    execute(client, message, arguments, distube, Discord) {

        let page = Number(arguments[0]);

        if (!page) {
            let queue = distube.getQueue(message);
            duration = distube.getQueue(message).formattedDuration
            if (!queue) return message.channel.send("There is no queue");

            // const Embed = new Discord.MessageEmbed()
            // .setColor('#4363ff')
            // .setThumbnail()

            message.channel.send(queue.songs.map((song, id) =>
            `**${id+1}**. [${song.name}] - \`${song.formattedDuration}\``
            ).slice(0, 10).join("\n") + ("\n\n") + "Queue duration: " + `${duration}`);
            // message.channel.send(Embed);
        }

        if (page) {
            let queue = distube.getQueue(message);
            duration = distube.getQueue(message).formattedDuration
            if (!queue) return message.channel.send("There is no queue");
            message.channel.send(queue.songs.map((song, id) =>
            `**${id+1}**. [${song.name}] - \`${song.formattedDuration}\``
            ).slice((page - 1) * 10, page * 10).join("\n") + ("\n\n") + "Queue duration: " + `${duration}`);
        }
    }  
}