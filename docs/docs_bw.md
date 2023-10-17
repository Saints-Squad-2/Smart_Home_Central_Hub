# Classes

## Smart Appliance Classes

### SmartAppliance

Base class that holds a notifications array, name, power status, and connected status.

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