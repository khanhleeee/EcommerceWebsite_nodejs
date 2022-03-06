const express = require('express');
var handlebars = require('express-handlebars');
const app = express();
const route = require('./routes');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const port = 5000;
const connect = require('./config/database/connection');

connect.connect();

var hbs = handlebars.create({
   extname: 'hbs'
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set("views", path.join(__dirname,'resources', 'views'));

app.use(express.static(__dirname + '/public'))
app.use('/static', express.static(path.join(__dirname,'public')))

// app.use(bodyParser.urlencoded( { extended: true}))
// app.use(methodOverride('_method'))

route(app)
app.listen(port, () => {
   console.log(`app listen at http://localhost:${port}`)
})