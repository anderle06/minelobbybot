require('dotenv').config();
const { REST, Routes } = require('discord.js');
const { client_id, discord } = require('../../config.json');
const fs = require('node:fs');

const guildCommands = []; const globalCommands = [];
const guildCommandFiles = fs.readdirSync('./src/commands/minelobby').filter(file => file.endsWith('.js'));
const globalCommandFiles = fs.readdirSync('./src/commands/global').filter(file => file.endsWith('.js'));
for (const file of guildCommandFiles) {
	const command = require(`./minelobby/${file}`);
	guildCommands.push(command.data.toJSON());
}
for (const file of globalCommandFiles) {
	const command = require(`./global/${file}`);
	globalCommands.push(command.data.toJSON());
}
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

// Deploy Commands
(async () => {
	try {
		console.log(`[LOG] Started refreshing ${guildCommands.length} guild commands and ${globalCommands.length} global commands.`);

		const d1 = await rest.put(
			Routes.applicationGuildCommands(client_id, discord.minelobby_server),
			{ body: guildCommands }
		);
		const d2 = await rest.put(
			Routes.applicationCommands(client_id),
			{ body: globalCommands },
		);
		
		console.log(`[LOG] Successfully reloaded ${d1.length} guild commands and ${d2.length} global commands.`);
	} catch (error) {
		console.error(`[ERROR] ${error}`);
	}
})();