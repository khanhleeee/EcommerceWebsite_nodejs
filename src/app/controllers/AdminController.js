const { mongooseToObject } = require('../../config/utility/mongoose')
const { multipleToObject } = require('../../config/utility/mongoose');

//[GET] /
const showAdmin = async(req, res, next) => {
    res.render('TabHome/home', { layout: 'mainClient.hbs' });
}

module.exports = { showAdmin }