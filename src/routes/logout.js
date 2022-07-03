const express = require('express');
const router = express.Router();
const passport = require('passport');

const user = require('../app/models/User')

const logoutController = require('../app/controllers/LogoutController');

// router.post('/loginStore', passport.authenticate('custom', {
//         failureRedirect: '/login',
//     }),
//     (req, res) => {
//         if (req.user.role == 'admin') {
//             res.redirect('/admin');
//         } else {
//             res.redirect('/');
//         }
//     });

// router.post('/loginStore', loginController.loginStore);
router.get('/', logoutController.showLogout);


module.exports = router;