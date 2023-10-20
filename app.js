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

async function main() {
    Base.knex(knex);
    await knex.migrate.latest();

    let smartHomeApp = await SmartHomeApp.loadOrNew(1);

    const app = express();
    const port = 3000;

    app.get('/', (req, res) => {
        return res.send('Hello from the Smart Home Central Hub! Try navigating to /app!');
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

    app.get('/app/reload', async (req, res) => {
        smartHomeApp = await SmartHomeApp.loadOrNew(1);
        return res.redirect('/app');
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
        
        res.status(404);
        return res.send(`Invalid SmartAppliance Type: ${type}`);
    });

    app.get('/app/remove/:id', async (req, res) => {
        const id = Number(req.params.id);
        const itemToRemove = smartHomeApp.getApplianceById(id);

        if (itemToRemove) {
            smartHomeApp.removeAppliance(itemToRemove);
            await itemToRemove.deleteFromDB(SmartAppliance);    
        }
       
        return res.redirect('/app');
    });

    app.get('/app/removeAll', async (req, res) => {
        for (itemToRemove of smartHomeApp.available) {
            await itemToRemove.deleteFromDB(SmartAppliance);    
        }

        smartHomeApp.available = [];

        return res.redirect('/app');
    });

    app.get('/app/:id', (req, res) => {
        const id = Number(req.params.id);
        const appliance = smartHomeApp.getApplianceById(id);

        if (appliance) return res.json(appliance);

        res.status(404);
        return res.send(`No appliance of specified id (${id}) found`);
    })

    app.listen(port, () => {
        console.log(`Smart Home server is listening on port ${port}`);
    });
}

main();

