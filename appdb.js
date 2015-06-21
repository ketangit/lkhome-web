// sqllite3
var fs = require("fs");
var folder = "./data";
var file = folder + "/sensor.db";
var exists = fs.existsSync(file);
if (!exists) {
    console.log("Creating DB file - " + file);
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
    }
    fs.openSync(file, "w");
} else {
	console.log("Reading DB file - " + file);
}
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);
db.serialize(function () {
	db.run("CREATE TABLE IF NOT EXISTS SENSOR_STATUS (type TEXT, status TEXT, datetime LONG)");
});

module.exports = db;