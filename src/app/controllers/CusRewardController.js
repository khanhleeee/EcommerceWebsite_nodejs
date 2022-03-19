//[GET] /
const showCusReward = async(req, res, next) => {
    res.render('TabCustomer/customerReward', { layout: 'mainClient.hbs' });
}

module.exports = { showCusReward }