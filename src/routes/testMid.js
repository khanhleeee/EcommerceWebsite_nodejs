const express = require('express');
const router = express.Router();

const verifyToken = require('../middlewares/auth');

const testController = require('../app/controllers/TestController');

router.get('/', verifyToken, testController.test);


module.exports = router;