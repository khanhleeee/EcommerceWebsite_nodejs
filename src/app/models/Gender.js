const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const Gender = new Schema({
   gender_title: {type:String, maxlength: 100},
})

module.exports = mongoose.model('Genders', Gender);