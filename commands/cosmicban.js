module.exports = {
    name: 'cosmicban',
    description: "legenary ban",

    execute(client, message, arguments, distube, Discord) {
        
        const Embed = new Discord.MessageEmbed()
        .setColor('#4363ff')
        .setImage('https://c.tenor.com/heCqAK_FUpYAAAAd/cosmic-ban.gif')

        message.channel.send(Embed);
    }
}