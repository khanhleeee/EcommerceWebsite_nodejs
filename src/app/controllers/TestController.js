const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const { mongooseToObject } = require('../../config/utility/mongoose')
const { multipleToObject } = require('../../config/utility/mongoose');

// [GET] /test
const test = async(req, res, next) => {

    res.send('da vo page test')
}

module.exports = { test }