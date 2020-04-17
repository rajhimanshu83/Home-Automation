var mqtt = require('mqtt');

exports.mqtt_publish = function (room,device,message) {
    /**
     *  MQTT CLIENT PUBLISH MSG
     */
    var topic = 'home/'+ room + '/' + device;
    var client  = mqtt.connect('mqtt://test.mosquitto.org')
    client.on('connect', function (packet) {
        console.log('MQTT: topic: ' + topic + ' publish message: ' + message);
        client.publish(topic, message);
        client.end();

    });
    return true;
}