var express = require('express');
var sensor = express.Router();
var DB = require('../appdb.js');

sensor.use(function (req, res, next) {
    next();
});

sensor.get('/', function(req, res) {
    var message = "Viewing sensor status";
    res.render('sensor', { title: 'Sensor Status', message: message, year: new Date().getFullYear() });
});

sensor.get('/data', function (req, res, next) {
    DB.all("SELECT * FROM SENSOR_STATUS ORDER BY datetime DESC LIMIT 20", function (error, rows) {
        if (error !== null) {
            next(err);
        } else {
            res.json(rows);
        }
    }); 
});

module.exports.sensor = sensor;