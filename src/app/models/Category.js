const mongoose= require('mongoose');
const { stringify } = require('nodemon/lib/utils');
const Schema = mongoose.Schema;

const Category = new Schema({
   title: {type:String, maxlength: 100},
})

module.exports = mongoose.model('Categories', Category);