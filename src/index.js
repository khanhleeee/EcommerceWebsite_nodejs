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

// Handlebars Helper
var prev = '';
hbs.handlebars.registerHelper('ifCond', function (v1, options) {
   // if (v1 === v2) {
   //     return options.fn(this);
   // }
   // return options.inverse(this);
   var i = 0;
   if(v1 != prev)
   {
      return v1;
   }

   // don't forget the next row!
   prev = v1;
   
});

hbs.handlebars.registerHelper("inc", function(value, options)
{
   //  return parseInt(value) + 1;
   var array = [];
   for(i = 0; i < value.length; i ++) {
      array[i] = value[i].vari_color;
      console.log(array[i])
   }

   return array;
});

// hbs.handlebars.registerHelper('ifCond', function (array, element, options) {
//    if (array.some(element)) {
//        return options.fn(this);
//    }
//    return options.inverse(this);
// });





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

