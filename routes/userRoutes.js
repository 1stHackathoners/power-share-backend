var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/userController');

router.post('/info', user_controller.user_info);
router.post('/sessionChange', user_controller.session_controller);
router.post('/create', user_controller.create_user);

module.exports = router;