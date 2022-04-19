const homeRouter = require('./home');
const productRouter = require('./product');
const registerRouter = require('./register');
const loginRouter = require('./login');
const loginFBRouter = require('./loginFB');
const logoutRouter = require('./logout');
const forgotPassRouter = require('./forgotPass');

const customerRouter = require('./customer');

const paymentRouter = require('./payment');

const adminRouter = require('./admin');
const adminProductRouter = require('./adminProduct');
const adminPromotionRouter = require('./adminPromotion');
const adminOrderRouter = require('./adminOrder');


function route(app) {
    app.use('/adminOrder', adminOrderRouter);
    app.use('/adminPromotion', adminPromotionRouter);
    app.use('/adminProduct', adminProductRouter);
    app.use('/admin', adminRouter);

    app.use('/payment', paymentRouter);

    app.use('/customer', customerRouter);

    app.use('/forgotPass', forgotPassRouter);
    app.use('/logout', logoutRouter);
    app.use('/loginFB', loginFBRouter);
    app.use('/login', loginRouter);
    app.use('/register', registerRouter);
    app.use('/product', productRouter);
    app.use('/', homeRouter);
}

module.exports = route;