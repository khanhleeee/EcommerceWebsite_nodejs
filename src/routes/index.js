const homeRouter = require('./home');
const productRouter = require('./product');
const loginRouter = require('./login');
const registerRouter = require('./register');
const adminRouter = require('./admin');

const cusRewardRouter = require('./cusReward')

const testMid = require('./testMid')

function route(app) {

    app.use('/test', testMid);

    app.use('/cusReward', cusRewardRouter);

    app.use('/admin', adminRouter);
    app.use('/register', registerRouter);
    app.use('/login', loginRouter);
    app.use('/product', productRouter);
    app.use('/', homeRouter);
}

module.exports = route;