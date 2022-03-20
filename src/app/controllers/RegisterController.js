const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidator } = require('../../validations/auth.js');
const User = require('../models/User');

const { mongooseToObject } = require('../../config/utility/mongoose')
const { multipleToObject } = require('../../config/utility/mongoose')

// [GET] /register
const showRegister = async(req, res, next) => {
    res.render('TabLogin/register', { layout: 'mainClient.hbs' });
}

// [POST] /resgister/registerStore
const registerStore = async(req, res, next) => {

    //Còn thiếu vụ check cái field mật khẩu vs confirm mật khẩu
    // const { error } = registerValidator(req.body);
    // if (error) return res.status(422).send(error.details[0].message);

    const { phonenumber, password, passwordConf, name, address } = req.body;

    const checkNumberExist = await User.findOne({ phonenumber: req.body.phonenumber });
    const checkPassword = await User.findOne({ password: req.body.password });
    const checkPasswordConf = await User.findOne({ passwordConf: req.body.passwordConf });
    if (checkNumberExist) {
        req.session.message = {
            type: 'danger',
            intro: 'Số điện thoại đã tồn tại !',
        }
        return res.redirect('/register');
    } else if (checkPassword != checkPasswordConf) {
        req.session.message = {
            type: 'danger',
            intro: 'Mật khẩu không đúng',
        }
        return res.redirect('/register');
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        phonenumber: req.body.phonenumber,
        password: hashPassword,
        passwordConf: hashPassword,
        name: req.body.name,
        address: req.body.address,
    });
    try {
        const newUser = await user.save();
        // await res.send(newUser);
        await res.redirect('/login');
    } catch (err) {
        res.status(400).send(err);
    }
}

module.exports = { showRegister, registerStore }