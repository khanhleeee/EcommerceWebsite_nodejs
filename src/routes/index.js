const homeRouter = require('./home');
const productRouter = require('./product');

function route(app) {
   app.use('/', homeRouter);
   app.use('/product', productRouter);
}

module.exports = route;