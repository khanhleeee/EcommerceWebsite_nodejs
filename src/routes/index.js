const homeRouter = require('./home');
const productRouter = require('./product');
const registerRouter = require('./register');
const loginRouter = require('./login');
const logoutRouter = require('./logout');
const forgotPassRouter = require('./forgotPass');

const loginFBRouter = require('./loginFB');

const customerRouter = require('./customer');

const adminRouter = require('./admin');
const adminProductRouter = require('./adminProduct');
const adminPromotionRouter = require('./adminPromotion');


function route(app) {

    app.use('/adminPromotion', adminPromotionRouter);
    app.use('/adminProduct', adminProductRouter);
    app.use('/admin', adminRouter);

    app.use('/customer', customerRouter);

    app.use('/loginFB', loginFBRouter);

    app.use('/forgotPass', forgotPassRouter);
    app.use('/logout', logoutRouter);
    app.use('/login', loginRouter);
    app.use('/register', registerRouter);
    app.use('/product', productRouter);
    app.use('/', homeRouter);
}

module.exports = route;