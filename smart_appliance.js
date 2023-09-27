const noble = require('noble');

const serviceUuid = 'service_uuid'; 
const characteristicUuid = 'characteristic_uuid';

noble.on('stateChange', (state) => {
  if (state === 'poweredOn') {
    noble.startScanning([serviceUuid], false);
  } else {
    noble.stopScanning();
  }
});

noble.on('discover', (peripheral) => {
  console.log('Found peripheral with UUID: ' + peripheral.uuid);
  peripheral.connect((error) => {
    if (!error) {
      console.log('Connected to peripheral');
      peripheral.discoverServices([serviceUuid], (error, services) => {
        if (!error) {
          services[0].discoverCharacteristics([characteristicUuid], (error, characteristics) => {
            if (!error) {
              const characteristic = characteristics[0];
              // Read from the hub
              characteristic.read((error, data) => {
                if (!error) {
                  console.log('Data from hub:', data.toString());
                }
              });

              // Write to the hub (for sending commands)
              const message = 'Hello from appliance';
              characteristic.write(Buffer.from(message), false, (error) => {
                if (!error) {
                  console.log('Sent data to hub:', message);
                }
              });
            }
          });
        }
      });
    }
  });
});
