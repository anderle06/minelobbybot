const express = require('express');
function init(port) {
    global.server = express();
    server.listen(port);
    registerEndpoints();
    console.log(`Started listening on port ${port}.`);
}

function registerEndpoints() {
    server.get('/', (req, res) => res.status(200).send('OK'));
}

module.exports = { init };