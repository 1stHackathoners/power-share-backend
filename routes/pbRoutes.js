var express = require('express');
var router = express.Router();

var ps_controller = require('../controllers/powerstationController');

router.post('/powerbank', ps_controller.find_near_pb);
router.post('/chargeport', ps_controller.find_near_cp);

module.exports = router;