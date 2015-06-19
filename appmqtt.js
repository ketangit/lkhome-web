var mqtt = require('mqtt');
var DB = require('./appdb.js');

var MqttModule = function () { };

MqttModule.prototype.init = function (host) {
    console.log("Connecting to MQTT broker " + host);
    var client = mqtt.connect(host);

    client.on('connect', function () {
        client.subscribe('SENSOR/+/STATUS');
        console.log("connected to mqtt broker");
    });
    
    client.on('error', function (error) {
        console.log("Error: " + error.toString());
    });

    client.on('message', function (topic, message) {
        console.log(topic + " = " + message.toString());
        if (topic !== null && typeof (topic) !== "undefined") {
            var topics = topic.split('/');
            if (topics.length == 3) {
                var now = new Date();
                var insertStmt = "INSERT INTO SENSOR_STATUS (type, status, datetime) VALUES('" 
                + topics[1] + "', '" 
                + message.toString() + "', '" 
                + now.getTime() + "')";
                //console.log(insertStmt);
                DB.run(insertStmt, function (error) {
                    if (error !== null) {
                        next(error);
                    }
                });
            }
        }
    });
};

module.exports = new MqttModule();
