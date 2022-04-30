module.exports = {
    name: 'botinfo',
    description: "This command contains information about the bot.",

    execute(client, message, arguments, distube, Discord) {
        
        const BotImage = new Discord.MessageAttachment('./images/bot-image.png', 'bot-image.png');
        const Embed = new Discord.MessageEmbed()
        .setColor('#4363ff')
        .attachFiles(BotImage)
        .setThumbnail('attachment://bot-image.png')

        .addFields(
            {name: 'Question Mark', value: 'A bot that can play music through YouTube and has other commands.'},
            {name: 'Programming Language', value: 'JavaScript'},
            {name: 'Prefix', value: '`-`'}
        )

        message.channel.send(Embed);
    }
}