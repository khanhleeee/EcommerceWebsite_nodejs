//[GET] /
const showIndex = async(req, res, next) => {
    res.render('TabHome/home', { layout: 'mainClient.hbs' });
}

module.exports = { showIndex }