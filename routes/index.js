var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('index', {title: 'Welcome', message: '', year: new Date().getFullYear() });
});

module.exports = router;