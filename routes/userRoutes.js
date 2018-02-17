var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/userController');

router.get('/:username', user_controller.user_info);

module.exports = router;