const homeRouter = require('./home');
const productRouter = require('./product');
const registerRouter = require('./register');
const loginRouter = require('./login');
const logoutRouter = require('./logout');
const forgotPassRouter = require('./forgotPass');

const loginFBRouter = require('./loginFB');

const cusRewardRouter = require('./cusReward');

const adminRouter = require('./admin');
const adminProductRouter = require('./adminProduct');
const adminCreateListRouter = require('./adminCreateList');


function route(app) {

    app.use('/adminProduct', adminProductRouter);
    app.use('/admin', adminRouter);

    app.use('/cusReward', cusRewardRouter);

    app.use('/loginFB', loginFBRouter);

    app.use('/forgotPass', forgotPassRouter);
    app.use('/logout', logoutRouter);
    app.use('/login', loginRouter);
    app.use('/register', registerRouter);
    app.use('/product', productRouter);
    app.use('/', homeRouter);
}

module.exports = route;