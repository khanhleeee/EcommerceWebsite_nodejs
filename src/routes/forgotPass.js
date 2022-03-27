const express = require('express');
const router = express.Router();

const forgotPassController = require('../app/controllers/ForgotPassController');

router.post('/resetPass/:id/:token', forgotPassController.reset);
router.get('/resetPass/:id/:token', forgotPassController.resetPass);

router.post('/recoverPass', forgotPassController.recoverPass);
router.get('/', forgotPassController.showForgot);


module.exports = router;