const homeRouter = require('./home');
const productRouter = require('./product');
const registerRouter = require('./register');
const loginRouter = require('./login');
const logoutRouter = require('./logout');
const forgotPassRouter = require('./forgotPass');

const loginFBRouter = require('./loginFB');

const cusRewardRouter = require('./cusReward');

const adminRouter = require('./admin');
const adminListRouter = require('./adminList');
const adminCreateListRouter = require('./adminCreateList');


function route(app) {

    app.use('/adminCreateSkus', adminCreateListRouter); //route này check lại
    app.use('/adminCreateList', adminCreateListRouter);
    app.use('/adminList', adminListRouter);
    app.use('/admin', adminRouter);

    app.use('/cusReward', cusRewardRouter);

    app.use('/loginFB', loginFBRouter);

    app.use('/admin', adminRouter);
    app.use('/forgotPass', forgotPassRouter);
    app.use('/logout', logoutRouter);
    app.use('/login', loginRouter);
    app.use('/register', registerRouter);
    app.use('/product', productRouter);
    app.use('/', homeRouter);
}

module.exports = route;