const req = require('express/lib/request');
const Joi = require('joi');

const registerValidator = (data) => {
    const rule = Joi.object({
        phonenumber: Joi.string().pattern(new RegExp('^[0-9]{10,12}$')).min(10).max(12).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,20}$')).required(),
        passwordConf: req.body.password.required(),
        name: Joi.string().min(6).max(225).required(),
        address: Joi.string().min(6).required(),
    })

    return rule.validate(data);
}

module.exports.registerValidator = registerValidator;