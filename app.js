// Express server for Smart Home Central Hub app

const express = require('express');
const SmartHomeApp = require('./classes/homeApp');

function main() {
    const app = express();
    const port = 3000;

    app.get('/', (req, res) => {
        res.send('Hello from the Smart Home Central Hub!');
    });

    app.listen(port, () => {
        console.log(`Smart Home server is listening on port ${port}`);
    });
}

main();