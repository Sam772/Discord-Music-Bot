const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('botinfo')
        .setDescription('This command contains information about the bot.'),

        async execute(interaction) {
            const BotImage = new MessageAttachment('./images/bot-image.png', 'bot-image.png');
            const Embed = new MessageEmbed()
                .setColor('#4363ff')
                .setThumbnail('attachment://bot-image.png')
                
                .addFields(
                    {name: 'Question Mark', value: 'A bot that can play music through YouTube and has other commands.'},
                    {name: 'Programming Language', value: 'JavaScript'},
                    {name: 'Prefix', value: '`-`'}
                )

                await interaction.reply({embeds: [Embed], files: [BotImage]});
        }
}