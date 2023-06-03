const { Client, GatewayIntentBits, Collection } = require('discord.js');
const path = require('node:path');
const fs = require('node:fs');
const { showRulesEmbed, showRolesEmbed } = require('./features/information_channel');

async function login(token, client) { await client.login(token); }

async function init(token) {
    const client = new Client({
        intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences]
    });
    registerCommands(client);
    registerEvents(client);
    await login(token, client);
}

function registerCommands(client) {
    client.commands = new Collection();
    const guildCmmandsPath = path.join(__dirname, './commands/minelobby');
    const globalCommandsPath = path.join(__dirname, './commands/global');
    const guildCommandFiles = fs.readdirSync(guildCmmandsPath).filter(file => file.endsWith('.js'));
    const globalCommandFiles = fs.readdirSync(globalCommandsPath).filter(file => file.endsWith('.js'));
    for (const file of guildCommandFiles) {
        const filePath = path.join(guildCmmandsPath, file);
        const command = require(filePath);
        if('data' in command && 'execute' in command) client.commands.set(command.data.name, command);
        else logger.error(`Unfinished Command`, `The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
    for (const file of globalCommandFiles) {
        const filePath = path.join(globalCommandsPath, file);
        const command = require(filePath);
        if('data' in command && 'execute' in command) client.commands.set(command.data.name, command);
        else logger.error(`Unfinished Command`, `The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

function registerEvents(client) {
    client.once('ready', () => {
        logger.initLogChannels(client);
        logger.log('Bot is online and ready!');
    });
    client.on('interactionCreate', async interaction => {
        if(interaction.isCommand()) {
            try {
                const command = client.commands.get(interaction.commandName);
                await command.execute(interaction);
            } catch (error) { logger.error(`Failed to execute a command.`, `\`/${interaction.commandName}\` failed: ${error}`); }
        } else if(interaction.isButton()) {
            try { switch(interaction.customId) {
                case 'information:rules': await showRulesEmbed(interaction); break;
                case 'information:roles': await showRolesEmbed(interaction); break;
                default: break
            }} catch (error) { logger.error(`Failed to respond to button click.`, `\`${interaction.customId}\` failed: ${error}`); }
        }
    });
}

module.exports = { init };