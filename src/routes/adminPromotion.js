const express = require('express');
const router = express.Router();

const verifyToken = require('../middlewares/auth');

const adminPromotionController = require('../app/controllers/AdminPromotionController');

router.get('/deletePromotion/:id', adminPromotionController.deletePromotion);

router.get('/:id/editPromotion', adminPromotionController.showEditPromotion);
router.put('/:id', adminPromotionController.updatePromotion);

router.post('/createPromotion/save', adminPromotionController.createPromotion);
router.get('/createPromotion', adminPromotionController.showCreatePromotion);

router.get('/', adminPromotionController.showPromotionList);


module.exports = router;