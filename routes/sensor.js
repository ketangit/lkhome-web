var express = require('express');
var router = express.Router();
var DB = require('../appdb.js');

router.get('/', function (req, res) {
    DB.all("SELECT * FROM SENSOR_STATUS ORDER BY datetime DESC LIMIT 10", function (error, rows) {
        if (error !== null) {
            next(err);
        } else {
            var message = rows.length > 0 ? "Viewing sensor status" : "No data found for sensors";
            res.render('sensor', { title: 'Sensor Status', message: message, year: new Date().getFullYear(), rows: rows });
        }
    });
});

module.exports = router;