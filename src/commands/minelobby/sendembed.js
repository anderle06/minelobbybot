const { SlashCommandBuilder } = require('discord.js');
const information = require('../../features/information_channel');
const { permission, discord } = require('../../../config.json');
const ErrorEmbed = require('../../util/ErrorEmbed');

module.exports = {
	data: new SlashCommandBuilder()
        .setName('sendembed')
        .setDescription('Send an embed of your choice to a specific channel.')
        .addStringOption(option => option
            .setName('embed')
            .setDescription('The embed that you want to be sent. Choose from the list.')
            .setChoices(
                { name: "Information", value: "information" }
            ).setRequired(true))
        .addChannelOption(option => option
            .setName('channel')
            .setDescription('The Channel you want to send this embed to.')
            .setRequired(true)),
	async execute(interaction) {
        if(!permission.sendembed.find(role => interaction.member.roles.cache.has(role))) {
            return await interaction.reply({ embeds: [new ErrorEmbed(`Only the following roles are allowed to use this: ${permission.sendembed.map(role => `<@&${role}>`).join(', ')}`)] });
        }
        const channel = interaction.options.getChannel('channel', true);
        const embed = interaction.options.getString('embed', true);
        switch(embed) {
            case 'information': await information.send(channel); break;
            default: break;
        }
        await interaction.reply(`Successfully sent Embed '${embed}' to channel ${channel}`);
	}
};