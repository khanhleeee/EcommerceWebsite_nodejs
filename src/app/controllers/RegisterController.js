const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidator } = require('../../validations/regex.js');
const User = require('../models/User');

// [GET] /register
const showRegister = async(req, res, next) => {
    res.render('TabLogin/register', { layout: 'mainClient.hbs' });
}

// [POST] /resgister/registerStore
const registerStore = async(req, res, next) => {
    const { email, password, passwordConf, name, address } = req.body;
    const checkEmailExist = await User.findOne({ email: req.body.email });
    if (checkEmailExist) {
        req.session.message = {
            type: 'danger',
            intro: 'Email đã tồn tại !',
        }
        return res.redirect('/register');
    }

    if (password.length < 6) {
        req.session.message = {
            type: 'danger',
            intro: 'Mật khẩu ít nhất 6 kí tự',
        }
        return res.redirect('/register');
    }

    if (password != passwordConf) {
        req.session.message = {
            type: 'danger',
            intro: 'Mật khẩu không trùng khớp',
        }
        return res.redirect('/register');
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        email: req.body.email,
        password: hashPassword,
        name: req.body.name,
        address: req.body.address,
    });
    try {
        const newUser = await user.save();
        await res.redirect('/login');
    } catch (err) {
        res.status(400).send(err);
    }
}

module.exports = { showRegister, registerStore }