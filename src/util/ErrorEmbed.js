const { EmbedBuilder } = require('discord.js');
const { misc } = require('../../config.json');

class ErrorEmbed {
    constructor(message) {
        return new EmbedBuilder()
            .setTitle('Error')
            .setDescription(message)
            .setFooter(misc.embed_footer)
            .setTimestamp()
            .setColor(Number(misc.color.main));
    }
}
module.exports = ErrorEmbed;