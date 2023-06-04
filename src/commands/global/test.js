const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('Use this for any testing :3'),
	async execute(interaction) {
        await interaction.reply(`Meow`);
	}
};