const express = require('express');
const router = express.Router();


const loginController = require('../app/controllers/LoginController');


router.post('/loginStore', loginController.loginStore);
router.get('/', loginController.showLogin);


module.exports = router;