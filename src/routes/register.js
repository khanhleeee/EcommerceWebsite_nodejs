const express = require('express');
const router = express.Router();

const registerController = require('../app/controllers/RegisterController');

router.post('/registerStore', registerController.registerStore); 
router.get('/', registerController.showRegister);


module.exports = router;