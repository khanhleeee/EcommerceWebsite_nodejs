const homeRouter = require('./home');
const productRouter = require('./product');
const registerRouter = require('./register');
const loginRouter = require('./login');
const loginFBRouter = require('./loginFB');
const logoutRouter = require('./logout');
const forgotPassRouter = require('./forgotPass');
const paymentRouter = require('./payment');

const customerRouter = require('./customer');

const adminRouter = require('./admin');
const adminProductRouter = require('./adminProduct');
const adminPromotionRouter = require('./adminPromotion');
const adminOrderRouter = require('./adminOrder');
const adminStaffRouter = require('./adminStaff');

const staffRouter = require('./staff');

function route(app) {

    app.use('/staff', staffRouter);

    app.use('/adminStaff', adminStaffRouter);
    app.use('/adminOrder', adminOrderRouter);
    app.use('/adminPromotion', adminPromotionRouter);
    app.use('/adminProduct', adminProductRouter);
    app.use('/admin', adminRouter);

    app.use('/customer', customerRouter);

    app.use('/payment', paymentRouter);
    app.use('/forgotPass', forgotPassRouter);
    app.use('/logout', logoutRouter);
    app.use('/loginFB', loginFBRouter);
    app.use('/login', loginRouter);
    app.use('/register', registerRouter);
    app.use('/product', productRouter);
    app.use('/', homeRouter);
}

module.exports = route;