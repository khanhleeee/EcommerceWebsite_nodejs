const express = require('express');
const router = express.Router();

const verifyToken = require('../middlewares/auth');


const adminController = require('../app/controllers/AdminController');

router.get('/', verifyToken, adminController.showAdmin)

module.exports = router;