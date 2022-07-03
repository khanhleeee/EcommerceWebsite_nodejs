const homeRouter = require('./home');
const productRouter = require('./product');
const registerRouter = require('./register');
const loginRouter = require('./login');
const loginFBRouter = require('./loginFb');
const logoutRouter = require('./logout');
const forgotPassRouter = require('./forgotPass');
const paymentRouter = require('./payment');

const checkOrderRouter = require('./checkOrder');

const customerRouter = require('./customer');

const adminRouter = require('./admin');
const adminProductRouter = require('./adminProduct');
const adminPromotionRouter = require('./adminPromotion');
const adminOrderRouter = require('./adminOrder');
const adminStaffRouter = require('./adminStaff');
const adminFeedbackRouter = require('./adminFeedback');

const staffRouter = require('./staff');
const deliveryStaffRouter = require('./deliveryStaff');
const { required } = require('joi');

function route(app) {
    app.use('/deliveryStaff', deliveryStaffRouter);
    app.use('/staff', staffRouter);

    app.use('/adminFeedback', adminFeedbackRouter);
    app.use('/adminStaff', adminStaffRouter);
    app.use('/adminOrder', adminOrderRouter);
    app.use('/adminPromotion', adminPromotionRouter);
    app.use('/adminProduct', adminProductRouter);
    app.use('/admin', adminRouter);

    app.use('/checkOrder', checkOrderRouter);

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