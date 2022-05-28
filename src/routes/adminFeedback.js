const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require('../middlewares/authorize');

const adminFeedBack = require('../app/controllers/AdminFeedBack');

// router.put('/:id', ensureAuthenticated, adminFeedBack.updateProfile);
router.get('/hideCmt/:id', adminFeedBack.hideCmt);
router.get('/showCmt/:id', adminFeedBack.showCmt);
router.get('/:id/detail', adminFeedBack.watchDetail);
router.get('/', ensureAuthenticated, adminFeedBack.showListFB);

module.exports = router;