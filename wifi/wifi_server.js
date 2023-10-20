const express = require('express');
const app = express();
const port = 3000; 

app.use(express.json());

// Define routes to handle appliance connections
app.post('/connect', (req, res) => {
  // Handle appliance connection here
  const applianceData = req.body;
  console.log('Appliance connected:', applianceData);
  // Save appliance data, control appliances, etc.
  res.send('Connected to the smart home hub');
});

app.listen(port, () => {
  console.log(`Smart Home Hub listening at http://localhost:${port}`);
});
