# HomeAutomation

![Demo Image](https://res.cloudinary.com/techcop/image/upload/v1587208495/hudha6cunsjde9yeues6.png)
![Demo Image](https://res.cloudinary.com/techcop/image/upload/v1587208519/vaq2rihobj0f7yt2i7ce.png)

# Application Stack

React
MongoDB
Node
Express

## Note: Authentication is not added, only API Endpoints are there
API EntryPoint
* dev  http://localhost:3001/ 


## UI Pages
Devices

Add Device Page

## To run Project locally
Run the project --> npm start


### API Endpoints

```
Add new device
method:post 'api/add'  body: {"appName":"LED","appRoom":"Xyz","watt":100}


Get All Devices
method:get 'api/get'

Change Device Status
method:post 'api/operate' body: {"_id": "5e993230a8f7c43c7c20cfe0","status":0}

Uninstall/Remove Device
method:post 'api/delete' body: {"_id":id}

```

### Using MQTT Protocol

Message Queue Telemetry Transport, aka, MQTT is one of the most widely used lightweight protocol to carry minimal data overhead.

```
const mqtt = require ('mqtt');
var client  = mqtt.connect('mqtt://iot.eclipse.org');

```
In the code above, I have required the MQTT API in an object called mqtt. Using the mqtt object, I have called the connect function and passed the brokers’s URL as argument.

Using subscribe and publish functions.

```
client.on('connect', function () {
  client.subscribe('Topic07');
  console.log('client has subscribed successfully');
});

```
We created a client object which invokes the on() method. The on method took two parameters, one is the connect event and another is a callback function to subscribe to a Topic.

```
client.on('connect', function(){
  setInterval(function(){client.publish('Topic','message');},3000); 
});

```

The code above publishes a message, i.e. “message” to the topic “Topic” at a 3 seconds time interval.We can use it without the setInterval method, but that would have stopped just after sending a single message for once.

### MQTT Protocol testing screenshots using MQTTlens
![MQTTLENS](https://res.cloudinary.com/techcop/image/upload/v1587208403/gjbhamvurg1jrbwhdxud.png)
![MQTTLENS](https://res.cloudinary.com/techcop/image/upload/v1587208430/qfxgqylj3e7svqwnqz0z.png)

### Database Schema

## Device schema
```
    _id:mongoose.Schema.Types.ObjectId,
    device: { type:String, required:true },
    room: { type:String, required:true },
    status: { type:Number, default:0 },
    watt:{ type:Number, default:0 },
    lastPowerOn:{type:Date, default: Date.now},
    lastPowerOff:{type:Date, default: Date.now},
    powerConsumption:{type:Number,default:0},
    created_at: {type: Date, default: Date.now}

```

