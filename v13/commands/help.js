const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Gives a list of all the commands on the bot'),

        async execute(interaction) {
            const Embed = new MessageEmbed()
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

                await interaction.reply({embeds: [Embed]});
        }
}