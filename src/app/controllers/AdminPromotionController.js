const Promotion = require('../models/Promotion');
const User = require('../models/User');

const { mongooseToObject } = require('../../config/utility/mongoose')
const { multipleToObject } = require('../../config/utility/mongoose');

//[GET] /adminPromotion
const showPromotionList = async(req, res, next) => {
    const user = await User.findOne({ role: 'admin' });
    const promotion = await Promotion.find({});
    res.render('TabPromotion/admin-promotion-list', { layout: 'mainAdmin.hbs', promotion: multipleToObject(promotion), user: mongooseToObject(user) });
}

//[GET] /adminPromotion/createPromotion
const showCreatePromotion = async(req, res, next) => {
    const user = await User.findOne({ role: 'admin' });
    const promotion = await Promotion.find({});
    res.render('TabPromotion/admin-promotion-form', { layout: 'mainAdmin.hbs', promotion: multipleToObject(promotion), user: mongooseToObject(user) });
}

//[POST] /adminPromotion/createPromotion/save
const createPromotion = async(req, res, next) => {
    const { makm, tenkm, giakm, ngayapdung, ngayhethan, motakm } = req.body;
    const newPromotion = new Promotion({
        makm,
        tenkm,
        giakm,
        ngayapdung,
        ngayhethan,
        motakm
    });
    await newPromotion.save();
    res.redirect('/adminPromotion');
}

//[GET] /adminPromotion/:id/editPromotion
const showEditPromotion = async(req, res, next) => {
    const user = await User.findOne({ role: 'admin' });
    const promotion = await Promotion.findById(req.params.id);
    res.render('TabPromotion/admin-promotion-edit', { layout: 'mainAdmin.hbs', promotion: mongooseToObject(promotion), user: mongooseToObject(user) });
}

//[PUT] /adminProduct/:id
const updatePromotion = async(req, res, next) => {
    await Promotion.updateOne({ _id: req.params.id }, {
        makm: req.body.makm,
        tenkm: req.body.tenkm,
        giakm: req.body.giakm,
        ngayapdung: req.body.ngayapdung,
        ngayhethan: req.body.ngayhethan,
        motakm: req.body.motakm,
    });
    res.redirect('/adminPromotion')
}

//[DELETE] /adminPromotion/deletePromotion/:id
const deletePromotion = async(req, res, next) => {
    Promotion.deleteOne({ _id: req.params.id })
        .then(() => res.redirect('/adminPromotion'))
        .catch(next);
}


module.exports = { showPromotionList, showCreatePromotion, createPromotion, showEditPromotion, updatePromotion, deletePromotion }