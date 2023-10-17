# Classes

## Smart Appliance Classes

### SmartAppliance

Base class that holds a notifications array, name, power status, and connected status.

Extends Base ORM class.

### Properties

connected: Whether the device is connected or not

poweredOn: Whether the device is powered on or not
 
name: A custom name for the appliance

notifications: A NotificationArray for adding/removing Notification instances

### Methods

constructor(notifications: NotificationArray, name='': String)

connect(): Set connected to true

disconnect(): Set connected to false

powerOn(): Set poweredOn to true

powerOff(): Set poweredOn to false

setIds(): Set ids for proper database saving

saveNotificationArray(): Save notifications to the database

loadNotificationArray(): Load notification from the database

fullSave(): Fully save the instance and assoiciated notifications to the database

static fullLoadById(id: Number): Fully load an instance based on its id in the database

#### Examples: 

```javascript
const { NotificationArray } = require('./classes/notifications');
const { SmartAppliance } = require('./classes/appliance');

const notifications = new NotificationArray();
const appliance = new SmartAppliance(notifications);
```

```javascript
const { SmartAppliance } = require('./classes/appliance');

class childAppliance extends SmartAppliance {
    ...
}
```

### Thermostat

Thermostat class that holds preferred, minimum, and maximum temperatures, as well as units (C or F).

Extends SmartAppliance

### Properties

units: Celsius or Fahrenheit 

preferredTemp: A preffered temperature

minTemp: A minimum temperature

maxTemp: A maximum temperature

validTemps: Whether the temperature configuration is valid or not

### Methods

constructor(notifications: NotificationArray, name='': String, units='F: 'C' OR 'F')

resetPreferredTemp(): Set preferredTemp to null

resetMinTemp(): Set minTemp to null

resetMaxTemp(): Set maxTemp to null

resetTemps(): Set all temperature variables to null

#### Examples: 

```javascript
const { NotificationArray } = require('./classes/notifications');
const { Thermostat } = require('./classes/thermostat');

const notifications = new NotificationArray();
const thermostat = new Thermostat(notifications);
```