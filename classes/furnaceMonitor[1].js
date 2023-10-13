const { Board, Thermometer, Relay } = require('johnny-five');
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const app = express();
const board = new Board();

// Configuration for microcontroller
const fanPin = 7;
const humidifierPin = 8;
const dehumidifierPin = 9;
const temperaturePin = 'A0';

// Track system state
let isFanOn = false;
let isHumidifierOn = false;
let isDehumidifierOn = false;

board.on('ready', () => {
    // Connect temperature sensor to analog pin A0
    const thermometer = new Thermometer({
        controller: 'TMP36',
        pin: temperaturePin
    });

    // Initialize relays
    const fanRelay = new Relay(fanPin);
    const humidifierRelay = new Relay(humidifierPin);
    const dehumidifierRelay = new Relay(dehumidifierPin);

    // Read temperature data and send it to central server
    thermometer.on('change', () => {
        const temperature = thermometer.celsius;
        
        // Send temperature data to central server
        sendTemperatureData(temperature);
    });

    // Create an HTTP server for local control
    app.use(bodyParser.json());

    app.post('/control/fan', (req, res) => {
        const { action } = req.body;

        if (action === 'on') {
            fanRelay.on();
            isFanOn = true;
        } else if (action === 'off') {
            fanRelay.off();
            isFanOn = false;
        }

        res.json({ status: 'success', isFanOn });
    });

    app.post('/control/humidifier', (req, res) => {
        const { action } = req.body;

        if (action === 'on') {
            humidifierRelay.on();
            isHumidifierOn = true;
        } else if (action === 'off') {
            humidifierRelay.off();
            isHumidifierOn = false;
        }

        res.json({ status: 'success', isHumidifierOn });
    });

    app.post('/control/dehumidifier', (req, res) => {
        const { action } = req.body;

        if (action === 'on') {
            dehumidifierRelay.on();
            isDehumidifierOn = true;
        } else if (action === 'off') {
            dehumidifierRelay.off();
            isDehumidifierOn = false;
        }

        res.json({ status: 'success', isDehumidifierOn });
    });

    // Start the HTTP server
    const port = 6969;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});

// Send temperature data to central server
function sendTemperatureData(temperature) {
    const url = 'http://localhost:8000'; // Central server URL
    const data = { temperature };

    fetch(`${url}/api/temperature`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(data => {
        console.log('Temperature data sent to central server:', data);
    })
    .catch(error => {
        console.error('Error sending temperature data:', error);
    });
}