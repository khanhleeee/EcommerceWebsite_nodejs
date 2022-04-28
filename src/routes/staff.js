const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require('../middlewares/authorize');

const staffController = require('../app/controllers/StaffController');

router.put('/:id', staffController.updateStaffProfile);
router.get('/:id/staffProfile', staffController.showStaffProfile);

router.get('/', ensureAuthenticated, staffController.showStaff);

module.exports = router;