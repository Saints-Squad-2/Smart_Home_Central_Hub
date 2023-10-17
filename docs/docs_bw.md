# Classes

## Smart Appliance Classes

### SmartAppliance

Base class that holds a notifications array, name, power status, and connected status.

Extends Base ORM class.

#### Properties

connected: Whether the device is connected or not

poweredOn: Whether the device is powered on or not
 
name: A custom name for the appliance

notifications: A NotificationArray for adding/removing Notification instances

smartHomeAppId: Database id for associated SmartHomeApp instance

#### Methods

constructor(notifications: NotificationArray, name='': String)

connect(): Set connected to true

disconnect(): Set connected to false

powerOn(): Set poweredOn to true

powerOff(): Set poweredOn to false

setIds(): Set ids for proper database saving

async saveNotificationArray(): Save notifications to the database

async loadNotificationArray(): Load notification from the database

async fullSave(): Fully save the instance and assoiciated notifications to the database

static async fullLoadById(id: Number): Fully load an instance based on its id in the database

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

#### Properties

units: Celsius or Fahrenheit 

preferredTemp: A preffered temperature

minTemp: A minimum temperature

maxTemp: A maximum temperature

validTemps: Whether the temperature configuration is valid or not

#### Methods

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

## Notification Classes

### Notification

Notification class that holds info and whether it is active or not.

Extends Base ORM class.

#### Properties

info: Information message for the notification

active: Whether the notification is active or not 

notArrId: Database id for associated NotificationArray

#### Methods

constructor(info: String, notArrId=null: Number)

makeActive(): set active to true

makeInactive(): set active to false

#### Examples: 

```javascript
const { Notification } = require('./classes/notifications');

const notification = new Notification('This is a test!');
```

### NotificationArray

Notification array class for holding Notification instances.

Extends Base ORM class.

#### Properties

data: Array of Notiication instances

show: Whether notifications should be shown or not (hidden)

applianceId: Database id for associated SmartAppliance instance

#### Methods

constructor(data=[]: Array, applianceId=null: Number)

add(notif: Notification): Add notif to data array

remove(notif: Notification): Remove notif from data array

showNotifications(): Set show to true

hideNotifications(): Set show to false

async fullSave(): Save instance and all Notification instances in data array

async loadNotifications(): Load related Notification instances from database 

static async fullLoadById(id: Number): Load and return instance from database by instance's id

static async fullLoadByApplianceId(appId: Number): Load and return instance from database by id of related SmartAppliance instance  

#### Examples: 

```javascript
const { Notification, NotificationArray } = require('./classes/notifications');

const notification = new Notification('This is a test!');
const notifArray = new NotificationArray();

notifArray.add(notification);
```
