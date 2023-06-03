const { EmbedBuilder } = require('discord.js');
const { misc, discord } = require('../../config.json');

class Logger {
    constructor(mod_log, server_log) {
        this.mod_log_id = mod_log;
        this.server_log_id = server_log;
    }
    initLogChannels(client) {
        this.mod_log = client.channels.cache.get(this.mod_log_id);
        this.server_log = client.channels.cache.get(this.server_log_id);
    }
    // Type should be something like 'User banned', 'User unbanned', 'User warned', ...
    modlog(moderator, message, type) {
        this.mod_log?.send({ embeds: [new EmbedBuilder()
        .setColor(Number(misc.color.main))
        .setDescription(`${message}\n\nModerator: <@${moderator}>`)
        .setTitle(type)]})
    }
    debug(message) {
        if(misc.debug) console.log(`[DEBUG] ${message}`);
    }
    log(message) {
        console.log(`[LOG] ${message}`);
        this.server_log?.send({ embeds: [new EmbedBuilder()
        .setColor(Number(misc.color.log))
        .setDescription(`${message}`)]});
    }
    error(title, message) {
        console.log(`[ERROR] ${title} | ${message}`);
        this.server_log?.send({ embeds: [new EmbedBuilder()
        .setColor(Number(misc.color.error))
        .setDescription(`${message}`)
        .setTitle(`[ERROR] ${title}`)]});
    }
    fatal(title, message, stacktrace) {
        console.log(`[FATAL] ${title} | ${message} || ${stacktrace}`);
        this.server_log?.send({ embeds: [new EmbedBuilder()
        .setColor(Number(misc.color.fatal))
        .setDescription(`**${message}**${stacktrace ? '\n\n**Stacktrace:**\n' + stacktrace : ''}`)
        .setTitle(`[FATAL] ${title}`)],
        content: misc.ping_for_fatal_error ? `<@${discord.fatal_error_alert_user}>` : ``});
    }
    async eval(code) {
        await eval(`this.${code}`);
    }
}

module.exports = Logger;