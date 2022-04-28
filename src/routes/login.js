const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../app/models/User');

const loginController = require('../app/controllers/LoginController');

router.post('/loginStore', passport.authenticate('custom', { failureRedirect: '/login', }),
    (req, res) => {
        if (req.user.role == 'admin') {
            res.redirect('/admin');
        } else if (req.user.role == 'staff') {
            res.redirect('/staff');
        } else {
            res.redirect('/');
        }
    });

// router.post('/loginStore', loginController.loginStore);
router.get('/', loginController.showLogin);


module.exports = router;