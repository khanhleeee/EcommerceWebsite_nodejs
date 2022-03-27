const express = require('express');
const router = express.Router();
const passport = require('passport');

const loginFBController = require('../app/controllers/LoginFBController');


router.get('/successFB', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/loginFB'
}));


router.get('/', passport.authenticate('facebook', { scope: ['email'] }));

// router.get('/', loginFBController.showLoginFB);

module.exports = router;