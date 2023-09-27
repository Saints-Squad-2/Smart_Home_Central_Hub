const bleno = require('bleno');

const serviceUuid = 'service_uuid'; 
const characteristicUuid = 'characteristic_uuid';

const primaryService = new bleno.PrimaryService({
  uuid: serviceUuid,
  characteristics: [
    new bleno.Characteristic({
      uuid: characteristicUuid,
      properties: ['read', 'write'],
      onReadRequest: (offset, callback) => {
        callback(bleno.Characteristic.RESULT_SUCCESS, Buffer.from('Data from hub'));
      },
      onWriteRequest: (data, offset, withoutResponse, callback) => {
        console.log('Received data from appliance:', data.toString());
        callback(bleno.Characteristic.RESULT_SUCCESS);
      },
    }),
  ],
});

bleno.on('stateChange', (state) => {
  if (state === 'poweredOn') {
    bleno.startAdvertising('SmartHomeHub', [serviceUuid]);
  } else {
    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', (error) => {
  if (!error) {
    bleno.setServices([primaryService]);
  }
});
