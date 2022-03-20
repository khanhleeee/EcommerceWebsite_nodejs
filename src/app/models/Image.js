const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const Image = new Schema({
   thumbnail_img: {type:String},
   img_1: {type:String},
   img_2: {type:String},
})

module.exports = mongoose.model('Images', Image);