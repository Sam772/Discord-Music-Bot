module.exports = {
    name: 'botinfo',
    description: "just info for the bot",

    execute(client, message, arguments, distube, Discord) {
        
        const Embed = new Discord.MessageEmbed()
        .setColor('#4363ff')
        .setThumbnail('https://i.imgur.com/qtt8pSe.png')

        .addFields(
            {name: 'Question Mark', value: 'A random bot'},
            {name: 'Language', value: 'JavaScript'},
            {name: 'Prefix', value: '`-`'}
        )

        message.channel.send(Embed);
    }
}