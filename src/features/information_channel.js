const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { misc } = require('../../config.json');
const constants = require('../constants/information_constants');

async function send(channel) {
    const embeds = [
        new EmbedBuilder().setColor(Number(misc.color.main)).setImage(constants.main.banner),
        new EmbedBuilder().setColor(Number(misc.color.main)).setTitle(constants.main.title).setDescription(constants.main.text)
    ];
    const buttons = [
        new ActionRowBuilder().addComponents(
            new ButtonBuilder().setLabel(constants.rules.button_label).setEmoji(constants.rules.button_emoji).setCustomId('information:rules').setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setLabel(constants.roles.button_label).setEmoji(constants.roles.button_emoji).setCustomId('information:roles').setStyle(ButtonStyle.Secondary)
        )
    ];
    await channel.send({ embeds, components: buttons });
}

async function showRulesEmbed(interaction) {
    const embeds = [
        new EmbedBuilder().setColor(Number(misc.color.main)).setImage(constants.rules.banner),
        new EmbedBuilder().setColor(Number(misc.color.main)).setTitle(constants.rules.title).setDescription(constants.rules.text)
    ];
    await interaction.reply({ embeds, ephemeral: true });
}

async function showRolesEmbed(interaction) {
    const embeds = [
        new EmbedBuilder().setColor(Number(misc.color.main)).setImage(constants.roles.banner),
        new EmbedBuilder().setColor(Number(misc.color.main)).setTitle(constants.roles.title).setDescription(constants.roles.text)
    ];
    await interaction.reply({ embeds, ephemeral: true });
}

module.exports = { send, showRulesEmbed, showRolesEmbed };