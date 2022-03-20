const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const Color = new Schema({
   color_title: {type:String, maxlength: 100},
})

module.exports = mongoose.model('Colors', Color);