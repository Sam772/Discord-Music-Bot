module.exports = {
    name: 'gru',
    description: "Summon the holy god",

    execute(client, message, arguments, distube, Discord) {
        
        const Embed = new Discord.MessageEmbed()
        .setColor('#4363ff')
        // .setTitle('Gru')
        // .setURL('https://imgur.com/a/hxwohZX')
        // .setDescription('Our lord and saviour')
        .setImage('https://i.imgur.com/8Hxqi0X.png')

        message.channel.send(Embed);
    }
}