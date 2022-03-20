const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const Size = new Schema({
   size_title: {type:String, maxlength: 100},
})

module.exports = mongoose.model('Sizes', Size);