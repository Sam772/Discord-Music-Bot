module.exports = {
    name: 'help',
    description: "all the commands if you wanna see them for some reason",

    execute(client, message, arguments, distube, Discord) {

        const Embed = new Discord.MessageEmbed()
        .setColor('#4363ff')
        .setThumbnail('https://i.imgur.com/qtt8pSe.png')
        .setTitle('Commands')

        .addFields(
            {name: '__Botinfo__', value: 'Displays botinfo'},
            {name: '__Cosmicban__', value: 'Very epic ban'},
            {name: '__Copypasta__', value: 'Sends random copypasta'},
            {name: '__Loop__', value: 'Loops song or queue'},
            {name: '__Move__', value: 'Moves song to another position in queue'},
            {name: '__Np__', value: 'Shows timestamp for current song'},
            {name: '__Pause__', value: 'Pauses the song'},
            {name: '__Play__', value: 'Plays a song'},
            {name: '__Queue__', value: 'Displays the queue'},
            {name: '__Remove__', value: 'Removes a song'},
            {name: '__Resume__', value: 'Resumes the song'},
            {name: '__Shuffle__', value: 'Shuffles queue'},
            {name: '__Stop__', value: 'Bot leaves voice channel'},
            {name: '__Skip__', value: 'Skips current song'}
        )

        message.channel.send({embeds: [Embed]});
    }
}