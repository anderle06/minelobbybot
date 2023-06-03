require('dotenv').config();
const { discord, bot_url } = require('./config.json');
const Logger = require('./src/util/Logger.js');
const webServer = require('./src/server.js');

global.logger = new Logger(discord.channel.staff.modlog, discord.channel.staff.log);
webServer.init(process.env.PORT || 3000);

require('./src/bot.js').init(process.env.DISCORD_TOKEN);
process.on('uncaughtException', error => logger.fatal(`Uncaught Exception`, `${error.name} | ${error.message}`, error.stack));

// ping the app to keep it alive, can be removed if we stop using glitch
const { fetch } = require('undici');
setInterval(() => {
    fetch(bot_url)
    .then(result => {
        if(result.status != 200) console.log('Minelobby Bot returned status ' + result.status);
    }).catch(error => console.log('Failed to ping Minelobby Bot: ' + error));
}, 60000);