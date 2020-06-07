var express = require('express');
var router = express.Router();

router.use('/board', require('./board'));
router.use('/mypage', require('./mypage'));
router.use('/shop', require('./shop'));
router.use('/transaction', require('./transaction'));
router.use('/user', require('./user'));

module.exports = router;