const axios = require('axios');

const smartHomeHubIp = 'localhost';

const applianceData = {
  id: 'appliance123',
  type: 'light',
  location: 'living room',
};

axios.post(`http://${smartHomeHubIp}:3000/connect`, applianceData)
  .then(response => {
    console.log(response.data);
    // Handle successful connection
  })
  .catch(error => {
    console.error('Error connecting to the smart home hub:\n\n', error);
  });
