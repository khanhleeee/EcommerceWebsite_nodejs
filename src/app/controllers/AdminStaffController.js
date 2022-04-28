const { mongooseToObject } = require('../../config/utility/mongoose')
const { multipleToObject } = require('../../config/utility/mongoose');

const bcrypt = require('bcryptjs');

const User = require('../models/User');

//[GET] /adminStaff
const showAdminStaff = async(req, res, next) => {
    const user = await User.findOne({ role: 'admin' });
    const userStaff = await User.find({ role: 'staff' });
    res.render('TabAdStaff/admin-staff-list', { layout: 'mainAdmin.hbs', userStaff: multipleToObject(userStaff), user: mongooseToObject(user) });
}

//[GET] /adminStaff/createStaff
const showCreateStaff = async(req, res, next) => {
    const user = await User.findOne({ role: 'admin' });
    res.render('TabAdStaff/admin-staff-form', { layout: 'mainAdmin.hbs', user: mongooseToObject(user) });
}

//[POST] /adminStaff/createStaff/create
const createStaff = async(req, res, next) => {
    const { name, password, phonenumber, email, address } = req.body;
    const checkEmailExist = await User.findOne({ email: email });
    if (checkEmailExist) {
        req.session.message = {
            type: 'danger',
            intro: 'Email đã tồn tại !',
        }
        return res.redirect('/adminStaff/createStaff');
    } else {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            name,
            phonenumber,
            email,
            password: hashPassword,
            address,
            role: 'staff',
        });
        await newUser.save();
        return res.redirect('/adminStaff');
    }
}

//[GET] /adminStaff/:id/editStaff
const showEditStaff = async(req, res, next) => {
    const user = await User.findOne({ role: 'admin' });
    const userStaff = await User.findById(req.params.id);
    res.render('TabAdStaff/admin-staff-edit', { layout: 'mainAdmin.hbs', userStaff: mongooseToObject(userStaff), user: mongooseToObject(user) });
}

//[PUT] /adminStaff/:id/
const updateStaff = async(req, res, next) => {
    await User.updateOne({ _id: req.params.id }, {
        name: req.body.name,
        phonenumber: req.body.phonenumber,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
    });
    res.redirect('/adminPromotion')
}

//[DELETE] /adminStaff/deleteStaff/:id
const deleteStaff = async(req, res, next) => {
    User.deleteOne({ _id: req.params.id })
        .then(() => res.redirect('/adminStaff'))
        .catch(next);
}

module.exports = { showAdminStaff, showCreateStaff, createStaff, showEditStaff, updateStaff, deleteStaff }