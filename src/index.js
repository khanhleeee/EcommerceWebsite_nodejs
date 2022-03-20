const express = require('express');
var handlebars = require('express-handlebars');
const app = express();
const path = require('path');
const port = 5000;
const bodyParser = require('body-parser');
const route = require('./routes');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

//Connect database
const connect = require('./config/database/connection');
connect.connect();

//Middlewares
app.use(express.static(__dirname + '/public'));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookieParser('secret'));
app.use(session({ cookie: { maxAge: null } }));

//Flash messages middleware
app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
})

//Template handlebars
var hbs = handlebars.create({
    extname: 'hbs'
});

hbs.handlebars.registerHelper('ifCond', function(v1, v2, options) {
    if (v1 === v2) {
        return options.fn(this);
    }
    return options.inverse(this);
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set("views", path.join(__dirname, 'resources', 'views'));

route(app)

app.listen(port, () => {
    console.log(`app listen at http://localhost:${port}`)
})