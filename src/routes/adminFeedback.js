const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require('../middlewares/authorize');

const adminFeedBack = require('../app/controllers/AdminFeedBack');

// router.get('/:id/adminProfile', ensureAuthenticated, adminFeedBack.showAdminProfile);
// router.put('/:id', ensureAuthenticated, adminFeedBack.updateProfile);
router.get('/', ensureAuthenticated, adminFeedBack.showListFB);

module.exports = router;