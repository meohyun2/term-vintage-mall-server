var express = require('express');
var router = express.Router();

router.use('/', require('./shop'));

module.exports = router;