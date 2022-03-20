const express = require('express');
const router = express.Router();

const cusRewardController = require('../app/controllers/CusRewardController');

router.get('/', cusRewardController.showCusReward);

module.exports = router;