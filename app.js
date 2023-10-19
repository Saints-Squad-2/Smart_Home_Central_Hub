// Express server for Smart Home Central Hub app

const express = require('express');
const path = require('path');

const knex = require('./database/knex/knex');
const Base = require('./database/base');
const SmartHomeApp = require('./classes/homeApp');

const { Notification, NotificationArray } = require('./classes/notifications');
const { SmartAppliance } = require('./classes/appliance');
const { Thermostat } = require('./classes/thermostat');
const { Camera } = require('./classes/camera');
const { Light } = require('./classes/light/light');

async function loadApp(id) {
    let smartHomeApp;
    
    try {
        smartHomeApp = await SmartHomeApp.fullLoadById(id);
    } catch {
        smartHomeApp = new SmartHomeApp();
    }

    return smartHomeApp;
}

async function main() {
    Base.knex(knex);
    knex.migrate.latest();

    const smartHomeApp = await loadApp(1);

    const app = express();
    const port = 3000;

    app.get('/', (req, res) => {
        return res.send('Hello from the Smart Home Central Hub!');
    });

    app.get('/speechToText', (req, res) => {
        return res.sendFile(path.join(__dirname, '/speechToText/speech-to-txt.html'));
    });

    app.get('/speechToText.js', (req, res) => {
        return res.sendFile(path.join(__dirname, '/speechToText/speechToText.js'));
    })

    app.get('/app', (req, res) => {
        return res.json(smartHomeApp);
    });

    app.get('/app/add/:type', async (req, res) => {
        const type = req.params.type.toLowerCase();
        let newItemClass;
        
        switch (type) {
            case 'thermostat':
                newItemClass = Thermostat;
                break;
            case 'camera':
                newItemClass = Camera;
                break;
            case 'light':
                newItemClass = Light;
                break;
        }

        if (newItemClass) {
            smartHomeApp.addAppliance(new newItemClass(new NotificationArray()));
            await smartHomeApp.fullSave();

            return res.redirect('/app');
        }
        
        return res.send('Invalid SmartAppliance Type');
    });

    app.listen(port, () => {
        console.log(`Smart Home server is listening on port ${port}`);
    });
}

main();