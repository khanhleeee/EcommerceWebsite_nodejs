const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require('../middlewares/authorize');

const adminStaffController = require('../app/controllers/AdminStaffController');

router.get('/deleteStaff/:id', adminStaffController.deleteStaff);

router.get('/:id/editStaff', adminStaffController.showEditStaff);
router.put('/:id', adminStaffController.updateStaff);

router.post('/createStaff/create', adminStaffController.createStaff);
router.get('/createStaff', adminStaffController.showCreateStaff);

router.get('/', ensureAuthenticated, adminStaffController.showAdminStaff);

module.exports = router;