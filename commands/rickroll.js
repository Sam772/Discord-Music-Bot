module.exports = {
    name: 'rickroll',
    description: "Want to funny epic rickroll someone? Well this is the command for you!",

    execute(client, message, arguments, distube, Discord) {

        const Embed = new Discord.MessageEmbed()
        .setColor('#4363ff')
        .setImage('https://i.imgur.com/BTNIDBR.gif')

        message.channel.send(Embed); 
    }  
}