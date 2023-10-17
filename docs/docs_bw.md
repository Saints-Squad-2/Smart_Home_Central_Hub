# Classes

### Base (Base ORM Class)

ORM Base class for saving instances to / loading instances from a database.

Extends [Model](https://vincit.github.io/objection.js/api/model/) class from objection.js.

#### Properties

id: Database id for instance

*static tableName: Must be set up to return the name of the table

*static relationMappings: Used to set up database relationships (see [here](https://vincit.github.io/objection.js/guide/relations.html#examples))

#### Methods

*cls refers to the class of the instance. This is necessary for child classes to correctly save / load.*

constructor()
 
async insert(cls): Inserts instance into database 

async update(cls): Updates instance in database

async save(cls): Dynamically inserts or updates instance based on whether it exists in the database

async deleteFromDB(cls): Deletes instance from the database

static async loadById(cls, id: Number): Loads and returns instance from the database based on the instance's id

#### Examples: 

```javascript
const Base = require('./database/base');

class Example extends Base {
    static get tableName() {
        return 'examples';
    }

    ...
}

const example = new Example();
await example.save(Example);
```

### SmartHomeApp

Smart Home Application class for holding information about available SmartAppliance instances.

Extends Base ORM class.

#### Properties

available: array of associated SmartAppliance instances

#### Methods

constructor()

addAppliance(apl: SmartAppliance):

removeAppliance(apl: SmartAppliance):

numberOfAppliances(): Returns the number of SmartAppliance instances in available array

async saveAvailable(): Saves the state of each SmartAppliance instance in available

async loadAvailable(): Loads available SmartAppliance instances from the database

async fullSave(): Fully saves the instance and SmartAppliance instances in available

static async fullLoadById(id: Number): Loads and returns an instance from the database based on its id

#### Examples: 

```javascript
const SmartHomeApp = require('./classes/homeApp');

const smartHomeApp = new SmartHomeApp();
```

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
